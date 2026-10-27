"""
=============================================================================
virusescu.github.io — Presentation Voice-Over Generator
Synthesizes per-slide audio narration files directly from slides.js.
Supports:
  1. Kokoro-82M (default high-fidelity local engine, voice: am_michael)
  2. Edge-TTS (fallback neural engine, voice: ro-RO-EmilNeural / en-US)
Generates:
  - Main slide narration (audio/slide-XX.mp3)
  - Interactive main card audio (audio/slide-XX-card-Y.mp3, audio/slide-XX-step-Y.mp3)
=============================================================================
"""

import argparse
import asyncio
import json
import os
import re
import subprocess
import sys

# Ensure UTF-8 output even on Windows command prompt
if sys.stdout.encoding.lower() != 'utf-8':
    try:
        sys.stdout.reconfigure(encoding='utf-8')
    except Exception:
        pass

ENGINE_DIR = os.path.dirname(os.path.abspath(__file__))
MODELS_DIR = os.path.join(ENGINE_DIR, "models")
TUTORIALS_DIR = os.path.dirname(ENGINE_DIR)

def extract_presentation_data(slides_js_path):
    """
    Extracts window.PRESENTATION_DATA object from slides.js using Node.js or regex.
    """
    try:
        cmd = [
            'node', '-e',
            f"const fs = require('fs'); const window = {{}}; eval(fs.readFileSync({json.dumps(slides_js_path)}, 'utf8')); console.log(JSON.stringify(window.PRESENTATION_DATA));"
        ]
        res = subprocess.run(cmd, capture_output=True, encoding='utf-8', check=True)
        return json.loads(res.stdout)
    except Exception:
        pass

    with open(slides_js_path, "r", encoding="utf-8") as f:
        content = f.read()

    slides = []
    match_slides = re.search(r'slides\s*:\s*\[(.*)\]\s*};?\s*$', content, re.DOTALL)
    if not match_slides:
        match_slides = re.search(r'slides\s*:\s*\[(.*)\]', content, re.DOTALL)
    body = match_slides.group(1) if match_slides else content
    slide_chunks = re.split(r'\}\s*,\s*\{', body)
    for chunk in slide_chunks:
        id_m = re.search(r'id\s*:\s*["\']([^"\']+)["\']', chunk)
        audio_m = re.search(r'audio\s*:\s*["\']([^"\']+)["\']', chunk)
        narr_m = re.search(r'narration\s*:\s*(["\'`])(.*?)\1', chunk, re.DOTALL)
        if id_m and narr_m:
            slide_id = id_m.group(1)
            audio_path = audio_m.group(1) if audio_m else f"audio/{slide_id}.mp3"
            narration = re.sub(r'\s+', ' ', narr_m.group(2).strip())
            slides.append({"id": slide_id, "audio": audio_path, "narration": narration})

    return {"slides": slides}

def get_audio_items(presentation_data):
    """
    Collects main slide narrations and primary interactive card soundbites.
    Supports optional 'narrationTts' for custom phonetic respellings without affecting UI text.
    """
    items = []
    slides = presentation_data.get("slides", [])

    for slide in slides:
        s_id = slide["id"]
        # 1. Main slide track (prefers narrationTts over narration if provided)
        slide_text = slide.get("narrationTts") or slide.get("narration", "")
        items.append({
            "id": s_id,
            "audio": slide["audio"],
            "text": slide_text.strip()
        })

        # 2. Main interactive cards ONLY (hero cards, concept cards, mockup callouts, mission steps)
        stype = slide.get("type", "hero")
        content = slide.get("content", {})

        if stype == "hero" and "highlights" in content:
            for idx, h in enumerate(content["highlights"]):
                card_text = h.get("tts") or f"{h.get('title', '')}. {h.get('text', '')}"
                items.append({
                    "id": f"{s_id}-card-{idx+1}",
                    "audio": f"audio/{s_id}-card-{idx+1}.mp3",
                    "text": card_text.strip()
                })

        elif stype == "cards" and "cards" in content:
            for idx, c in enumerate(content["cards"]):
                card_text = c.get("tts") or f"{c.get('title', '')}. {c.get('text', '')}"
                items.append({
                    "id": f"{s_id}-card-{idx+1}",
                    "audio": f"audio/{s_id}-card-{idx+1}.mp3",
                    "text": card_text.strip()
                })

        elif stype == "mockup" and "callouts" in content:
            for idx, cl in enumerate(content["callouts"]):
                card_text = cl.get("tts") or f"{cl.get('title', '')}. {cl.get('text', '')}"
                items.append({
                    "id": f"{s_id}-card-{idx+1}",
                    "audio": f"audio/{s_id}-card-{idx+1}.mp3",
                    "text": card_text.strip()
                })

        elif stype == "mission" and "steps" in content:
            for idx, st in enumerate(content["steps"]):
                card_text = st.get("tts") or f"{st.get('title', '')}. {st.get('text', '')}"
                items.append({
                    "id": f"{s_id}-step-{idx+1}",
                    "audio": f"audio/{s_id}-step-{idx+1}.mp3",
                    "text": card_text.strip()
                })

    return items

def ensure_kokoro_models():
    onnx_file = os.path.join(MODELS_DIR, "kokoro-v0_19.onnx")
    voices_file = os.path.join(MODELS_DIR, "voices.bin")

    if not os.path.exists(onnx_file) or not os.path.exists(voices_file):
        print("[!] Kokoro models missing in tutorials/_engine/models/. Running download_models.py...")
        from download_models import main as download_main
        download_main()

    return onnx_file, voices_file

def generate_with_kokoro(items, course_dir, voice="am_michael", speed=1.0, force=False):
    import soundfile as sf
    from kokoro_onnx import Kokoro

    onnx_file, voices_file = ensure_kokoro_models()
    print(f"[*] Loading Kokoro-82M ONNX model from {onnx_file} ...")
    kokoro = Kokoro(onnx_file, voices_file)

    lang = "en-gb" if voice.startswith("b") else "en-us"
    print(f"[*] Engine: Kokoro-82M | Voice: {voice} | Lang: {lang} | Speed: {speed}")

    generated_count = 0
    for it in items:
        target_path = os.path.join(course_dir, it["audio"])
        os.makedirs(os.path.dirname(target_path), exist_ok=True)

        if os.path.exists(target_path) and not force and os.path.getsize(target_path) > 1024:
            continue

        clean_text = it["text"]
        # Strip any leading numbers like "01", "1."
        clean_text = re.sub(r'^[0-9]+[\.\-\:\s]*', '', clean_text).strip()
        if not clean_text:
            continue

        print(f"  [-] [{it['id']}] Synthesizing ({len(clean_text.split())} words): \"{clean_text[:40]}...\"")
        try:
            samples, sample_rate = kokoro.create(clean_text, voice=voice, speed=speed, lang=lang)
            fmt = "WAV" if target_path.lower().endswith(".wav") else "MP3"
            sf.write(target_path, samples, sample_rate, format=fmt)
            generated_count += 1
        except Exception as e:
            print(f"      [!] Error on {it['id']}: {e}")

    return generated_count

async def generate_with_edge(items, course_dir, voice="ro-RO-EmilNeural", rate="+0%", force=False):
    import edge_tts

    print(f"[*] Engine: Edge-TTS | Voice: {voice} | Rate: {rate}")
    generated_count = 0

    for it in items:
        target_path = os.path.join(course_dir, it["audio"])
        os.makedirs(os.path.dirname(target_path), exist_ok=True)

        if os.path.exists(target_path) and not force and os.path.getsize(target_path) > 1024:
            continue

        clean_text = re.sub(r'^[0-9]+[\.\-\:\s]*', '', it["text"]).strip()
        if not clean_text:
            continue

        print(f"  [-] [{it['id']}] Synthesizing via Edge-TTS ({len(clean_text.split())} words)...")
        try:
            communicate = edge_tts.Communicate(clean_text, voice=voice, rate=rate)
            await communicate.save(target_path)
            generated_count += 1
        except Exception as e:
            print(f"      [!] Error on {it['id']}: {e}")

    return generated_count

def main():
    parser = argparse.ArgumentParser(description="Generate voice-over MP3 audio files for tutorials.")
    parser.add_argument("--course", required=True, help="Course directory slug under tutorials/ (e.g. word-crash-course, _template)")
    parser.add_argument("--engine", choices=["kokoro", "edge"], default="kokoro", help="TTS Engine to use (default: kokoro)")
    parser.add_argument("--voice", default=None, help="Voice name (default: am_michael for kokoro, ro-RO-EmilNeural for edge)")
    parser.add_argument("--speed", type=float, default=1.0, help="Speech speed (Kokoro only, default 1.0)")
    parser.add_argument("--rate", default="+0%", help="Edge-TTS speech rate (e.g. +5%%, -5%%)")
    parser.add_argument("--force", action="store_true", help="Force overwrite existing audio files")

    args = parser.parse_args()

    if os.path.isabs(args.course) and os.path.isdir(args.course):
        course_dir = args.course
    else:
        course_dir = os.path.join(TUTORIALS_DIR, args.course)

    if not os.path.isdir(course_dir):
        print(f"[ERROR] Course directory does not exist: {course_dir}")
        sys.exit(1)

    slides_js_path = os.path.join(course_dir, "slides.js")
    if not os.path.exists(slides_js_path):
        print(f"[ERROR] slides.js not found in {course_dir}")
        sys.exit(1)

    data = extract_presentation_data(slides_js_path)
    items = get_audio_items(data)
    if not items:
        print(f"[ERROR] No slides or interactive elements could be extracted from {slides_js_path}")
        sys.exit(1)

    print(f"[+] Found {len(data.get('slides', []))} slides with {len(items)} audio tracks in {args.course}")

    if args.engine == "kokoro":
        voice = args.voice if args.voice else "am_michael"
        count = generate_with_kokoro(items, course_dir, voice=voice, speed=args.speed, force=args.force)
    elif args.engine == "edge":
        voice = args.voice if args.voice else "ro-RO-EmilNeural"
        count = asyncio.run(generate_with_edge(items, course_dir, voice=voice, rate=args.rate, force=args.force))

    print(f"\n[OK] Audio synthesis complete! Generated/verified {count} audio tracks in {course_dir}/audio")

if __name__ == "__main__":
    main()
