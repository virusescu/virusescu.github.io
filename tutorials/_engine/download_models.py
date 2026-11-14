"""
Downloads Kokoro TTS ONNX model and voice weights locally into tutorials/_engine/models/
These binary weights are excluded from Git via .gitignore.
"""
import os
import sys
import urllib.request

MODELS_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "models")

FILES = [
    {
        "name": "kokoro-v0_19.onnx",
        "url": "https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files/kokoro-v0_19.onnx",
        "min_size": 250_000_000, # ~310 MB
    },
    {
        "name": "voices.bin",
        "url": "https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files/voices.bin",
        "min_size": 5_000_000, # ~5.5 MB
    }
]

def report_progress(block_num, block_size, total_size):
    downloaded = block_num * block_size
    if total_size > 0:
        percent = min(100.0, downloaded * 100.0 / total_size)
        mb_down = downloaded / (1024 * 1024)
        mb_total = total_size / (1024 * 1024)
        sys.stdout.write(f"\r   [{percent:5.1f}%] {mb_down:.1f} MB / {mb_total:.1f} MB")
        sys.stdout.flush()

def main():
    os.makedirs(MODELS_DIR, exist_ok=True)
    print(f"[*] Target models directory: {MODELS_DIR}")

    for item in FILES:
        target_path = os.path.join(MODELS_DIR, item["name"])
        if os.path.exists(target_path) and os.path.getsize(target_path) >= item["min_size"]:
            print(f"[+] Found {item['name']} ({os.path.getsize(target_path) / (1024*1024):.1f} MB), skipping download.")
            continue

        print(f"[-] Downloading {item['name']} from {item['url']} ...")
        try:
            urllib.request.urlretrieve(item["url"], target_path, reporthook=report_progress)
            print(f"\n[+] Successfully saved {item['name']} ({os.path.getsize(target_path) / (1024*1024):.1f} MB).")
        except Exception as e:
            print(f"\n[!] Error downloading {item['name']}: {e}")
            if os.path.exists(target_path):
                os.remove(target_path)
            sys.exit(1)

    print("\n[OK] All Kokoro voice models are ready and verified!")

if __name__ == "__main__":
    main()
