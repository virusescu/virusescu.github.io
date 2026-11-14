// 3D Art 2: the painting as a real 3D scene (Gaussian splat, rendered with Spark).
// The visitor turns freely and can step about a metre in any direction.
import * as THREE from 'three';
import { SparkRenderer, SplatMesh } from '@sparkjsdev/spark';

const params = new URLSearchParams(location.search);
const sceneName = params.get('scene') || 'winter-landscape';
const base = `scenes/${sceneName}/`;
// Test hooks: ?splat=<url> loads another file; ?shot=x,y,z,yawDeg,pitchDeg skips the start
// screen and holds the camera still (used for automated screenshots).
const splatOverride = params.get('splat');
const shot = params.get('shot') ? params.get('shot').split(',').map(Number) : null;

const canvas = document.getElementById('view');
const startEl = document.getElementById('start');
const enterBtn = document.getElementById('enter');
const muteBtn = document.getElementById('mute');
const progressEl = document.getElementById('progress');
const moveHint = document.getElementById('movehint');

const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, preserveDrawingBuffer: !!shot });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xc9c2dc);
const camera = new THREE.PerspectiveCamera(70, 1, 0.05, 2000);
const rig = new THREE.Object3D(); // position = where the visitor stands, rotation = where they look
rig.add(camera);
scene.add(rig);

// ?budget=1000000 imitates a phone's splat budget on desktop (test hook).
const budget = Number(params.get('budget')) || undefined;
const spark = new SparkRenderer({ renderer, ...(budget ? { lodSplatCount: budget } : {}) });
scene.add(spark);

let cfg = null;
let baseFov = 70;
let zoom = 1;
const isTouch = matchMedia('(pointer: coarse)').matches;

function resize() {
  const w = window.innerWidth, h = window.innerHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  baseFov = w < h ? 88 : 68; // portrait phones need a taller view to feel wide enough
  camera.fov = baseFov / zoom;
  camera.updateProjectionMatrix();
}
window.addEventListener('resize', resize);
resize();

// ---------- scene ----------

function makeTextTexture(artist, title) {
  const c = document.createElement('canvas');
  c.width = 2048; c.height = 640;
  const g = c.getContext('2d');
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.shadowColor = 'rgba(40, 30, 70, 0.55)';
  g.shadowBlur = 26;
  g.fillStyle = 'rgba(255, 255, 255, 0.95)';
  g.font = 'italic 230px Georgia, "Times New Roman", serif';
  g.fillText(title, c.width / 2, 250, c.width - 80);
  g.font = '84px Georgia, "Times New Roman", serif';
  const spaced = artist.toUpperCase().split('').join('  ');
  g.fillText(spaced, c.width / 2, 480, c.width - 80);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

function lonLatToDir(lonDeg, latDeg) {
  const lon = THREE.MathUtils.degToRad(lonDeg), lat = THREE.MathUtils.degToRad(latDeg);
  return new THREE.Vector3(Math.sin(lon) * Math.cos(lat), Math.sin(lat), -Math.cos(lon) * Math.cos(lat));
}

async function build() {
  cfg = await (await fetch(base + 'scene.json')).json();
  document.getElementById('s-artist').textContent = cfg.artist;
  document.getElementById('s-title').textContent = cfg.title;
  document.getElementById('credit').textContent = `${cfg.title} · ${cfg.artist}`;
  document.title = `${cfg.title} · ${cfg.artist}`;
  moveHint.textContent = isTouch
    ? 'Trage cu două degete ca să faci un pas'
    : 'W A S D sau săgețile ca să faci un pas';

  const url = splatOverride || base + cfg.splat;
  const prebuilt = /\.rad$/i.test(url); // LoD tree built offline by Spark's build-lod, streamed in chunks
  const world = new SplatMesh({
    url,
    ...(prebuilt ? { paged: true } : { lod: true }),
    onProgress: (e) => {
      if (e.lengthComputable) progressEl.firstChild.style.width = `${(100 * e.loaded / e.total).toFixed(1)}%`;
    },
  });
  scene.add(world);
  await world.initialized;
  progressEl.classList.add('done');

  if (cfg.text) {
    const t = cfg.text;
    const label = new THREE.Mesh(
      new THREE.PlaneGeometry(t.width, t.width * 640 / 2048),
      new THREE.MeshBasicMaterial({ map: makeTextTexture(cfg.artist, cfg.title), transparent: true, depthWrite: false, depthTest: false })
    );
    label.renderOrder = 10;
    label.position.copy(lonLatToDir(t.lon, t.lat).multiplyScalar(t.distance));
    label.lookAt(0, label.position.y, 0);
    scene.add(label);
  }

  yaw = targetYaw = -THREE.MathUtils.degToRad(cfg.startLon || 0);
  moveRadius = cfg.moveRadius ?? 1.0;

  if (shot) {
    const [x, y, z, yd, pd] = shot;
    walkPos.set(x || 0, y || 0, z || 0); walkTarget.copy(walkPos);
    yaw = targetYaw = THREE.MathUtils.degToRad(-(yd || 0));
    pitch = targetPitch = THREE.MathUtils.degToRad(pd || 0);
    startEl.classList.add('gone');
    startEl.style.display = 'none';
    document.getElementById('credit').style.display = 'none';
  }

  enterBtn.textContent = 'Intră';
  enterBtn.disabled = false;
}

// ---------- looking around ----------

let yaw = 0, pitch = 0, targetYaw = 0, targetPitch = 0;
const MAX_PITCH = THREE.MathUtils.degToRad(85);

// Gyroscope state
let gyroOn = false;
let gyroYawOffset = null;   // set on the first reading so the visitor starts facing the painting
const deviceQ = new THREE.Quaternion();
const targetQ = new THREE.Quaternion();
const tmpQ = new THREE.Quaternion();
const tmpE = new THREE.Euler();
const tmpV = new THREE.Vector3();
const Y_AXIS = new THREE.Vector3(0, 1, 0);
const Z_AXIS = new THREE.Vector3(0, 0, 1);
const SCREEN_FIX = new THREE.Quaternion(-Math.SQRT1_2, 0, 0, Math.SQRT1_2); // look out the back of the phone

function screenAngle() {
  const a = (screen.orientation && typeof screen.orientation.angle === 'number') ? screen.orientation.angle : (window.orientation || 0);
  return THREE.MathUtils.degToRad(a);
}

function onDeviceOrientation(e) {
  if (e.alpha === null || e.beta === null || e.gamma === null) return;
  const d2r = THREE.MathUtils.degToRad;
  tmpE.set(d2r(e.beta), d2r(e.alpha), -d2r(e.gamma), 'YXZ');
  deviceQ.setFromEuler(tmpE).multiply(SCREEN_FIX).multiply(tmpQ.setFromAxisAngle(Z_AXIS, -screenAngle()));
  if (gyroYawOffset === null) {
    tmpV.set(0, 0, -1).applyQuaternion(deviceQ);
    const heading = Math.atan2(-tmpV.x, -tmpV.z);
    gyroYawOffset = targetYaw - heading;
    rig.quaternion.copy(tmpQ.setFromAxisAngle(Y_AXIS, gyroYawOffset).multiply(deviceQ));
  }
  gyroOn = true;
}

async function enableGyro() {
  if (typeof DeviceOrientationEvent === 'undefined') return;
  try {
    if (typeof DeviceOrientationEvent.requestPermission === 'function') {
      const res = await DeviceOrientationEvent.requestPermission(); // iOS: must follow a tap
      if (res !== 'granted') return;
    }
    window.addEventListener('deviceorientation', onDeviceOrientation);
  } catch (err) {
    // No gyroscope access: dragging still works.
  }
}

// Drag (mouse and one finger), with inertia: a flick keeps sliding and fades out.
// Two fingers walk instead of turning.
let dragging = false, lastX = 0, lastY = 0, lastMoveT = 0;
let velX = 0, velY = 0;              // radians per second, measured while dragging
const FLICK_DECAY = 1.6;
const MAX_FLICK = THREE.MathUtils.degToRad(260);
const pointers = new Map();          // active touch points, for the two-finger walk
let twoFinger = null;                // {x, y} centroid of the previous two-finger frame

function applyTurn(dx, dy) {
  if (gyroOn) {
    gyroYawOffset += dx; // with the gyroscope on, dragging only turns the world sideways
  } else {
    targetYaw += dx;
    targetPitch = THREE.MathUtils.clamp(targetPitch + dy, -MAX_PITCH, MAX_PITCH);
  }
}

function centroid() {
  let x = 0, y = 0;
  for (const p of pointers.values()) { x += p.x; y += p.y; }
  return { x: x / pointers.size, y: y / pointers.size };
}

canvas.addEventListener('pointerdown', (e) => {
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  canvas.setPointerCapture(e.pointerId);
  if (pointers.size >= 2) { dragging = false; velX = velY = 0; twoFinger = centroid(); return; }
  dragging = true; lastX = e.clientX; lastY = e.clientY;
  lastMoveT = e.timeStamp; velX = velY = 0; // touching the screen stops any glide
});
canvas.addEventListener('pointermove', (e) => {
  if (pointers.has(e.pointerId)) pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (pointers.size >= 2 && twoFinger) {
    const c = centroid();
    const s = 2.2 / Math.min(window.innerWidth, window.innerHeight); // a full-screen swipe is about two metres
    walkBy(-(c.x - twoFinger.x) * s, (c.y - twoFinger.y) * s); // fingers up = forward, like pushing the world away
    twoFinger = c;
    return;
  }
  if (!dragging) return;
  const k = THREE.MathUtils.degToRad(camera.fov) / window.innerHeight; // drag follows the finger
  const dx = (e.clientX - lastX) * k, dy = (e.clientY - lastY) * k;
  const dt = Math.max((e.timeStamp - lastMoveT) / 1000, 0.004);
  lastX = e.clientX; lastY = e.clientY; lastMoveT = e.timeStamp;
  velX = velX * 0.5 + (dx / dt) * 0.5;  // smoothed so one jittery sample does not decide the flick
  velY = velY * 0.5 + (dy / dt) * 0.5;
  applyTurn(dx, dy);
});
const endDrag = (e) => {
  pointers.delete(e.pointerId);
  if (pointers.size < 2) twoFinger = null;
  if (pointers.size === 1) { // one finger left after walking: continue as a fresh turn drag
    const p = pointers.values().next().value;
    dragging = true; lastX = p.x; lastY = p.y; lastMoveT = e.timeStamp; velX = velY = 0;
    return;
  }
  if (!dragging) return;
  dragging = false;
  if (e.timeStamp - lastMoveT > 90) velX = velY = 0; // finger rested before lifting: no flick
  velX = THREE.MathUtils.clamp(velX, -MAX_FLICK, MAX_FLICK);
  velY = THREE.MathUtils.clamp(velY, -MAX_FLICK, MAX_FLICK);
};
canvas.addEventListener('pointerup', endDrag);
canvas.addEventListener('pointercancel', endDrag);

canvas.addEventListener('wheel', (e) => {
  e.preventDefault();
  zoom = THREE.MathUtils.clamp(zoom * (e.deltaY > 0 ? 0.94 : 1.06), 0.8, 1.8);
  camera.fov = baseFov / zoom;
  camera.updateProjectionMatrix();
}, { passive: false });

// ---------- stepping ----------

let moveRadius = 1.0;
const walkPos = new THREE.Vector3();     // smoothed position
const walkTarget = new THREE.Vector3();  // where input wants to be, always inside the bubble
const keys = new Set();
const WALK_SPEED = 0.9;                  // metres per second with the keyboard

function headingYaw() {
  if (!gyroOn) return yaw;
  tmpV.set(0, 0, -1).applyQuaternion(rig.quaternion);
  return Math.atan2(-tmpV.x, -tmpV.z);
}

// Move relative to where the visitor faces: side > 0 is right, fwd > 0 is forward.
function walkBy(side, fwd) {
  const h = headingYaw();
  const sin = Math.sin(h), cos = Math.cos(h);
  walkTarget.x += side * cos - fwd * sin;
  walkTarget.z += -side * sin - fwd * cos;
  // Soft wall: the bubble edge resists instead of stopping dead.
  const d = Math.hypot(walkTarget.x, walkTarget.z);
  if (d > moveRadius) {
    const k = moveRadius / d;
    walkTarget.x *= k; walkTarget.z *= k;
  }
}

const KEYMAP = { KeyW: 'f', ArrowUp: 'f', KeyS: 'b', ArrowDown: 'b', KeyA: 'l', ArrowLeft: 'l', KeyD: 'r', ArrowRight: 'r' };
window.addEventListener('keydown', (e) => { if (KEYMAP[e.code]) { keys.add(KEYMAP[e.code]); e.preventDefault(); } });
window.addEventListener('keyup', (e) => { if (KEYMAP[e.code]) keys.delete(KEYMAP[e.code]); });
window.addEventListener('blur', () => keys.clear());

// ---------- sound ----------

let audio = null;
function startAudio() {
  if (!cfg.audio) return;
  audio = new Audio(base + cfg.audio);
  audio.loop = true;
  audio.volume = 0;
  audio.play().then(() => {
    muteBtn.hidden = false;
    const t0 = performance.now();
    const fade = () => {
      const k = Math.min(1, (performance.now() - t0) / 4000);
      if (!audio.muted) audio.volume = 0.7 * k;
      if (k < 1) requestAnimationFrame(fade);
    };
    fade();
  }).catch(() => {});
}
muteBtn.addEventListener('click', () => {
  if (!audio) return;
  audio.muted = !audio.muted;
  muteBtn.classList.toggle('off', audio.muted);
});

enterBtn.addEventListener('click', async () => {
  await enableGyro();
  startAudio();
  startEl.classList.add('gone');
  setTimeout(() => moveHint.classList.add('show'), 2500);
  setTimeout(() => moveHint.classList.remove('show'), 9000);
});

// ---------- loop ----------

const timer = new THREE.Timer();
let frames = 0;
function frame() {
  timer.update();
  const dt = Math.min(timer.getDelta(), 0.1);
  const t = timer.getElapsed();

  if (!dragging && (velX || velY)) { // glide after a flick
    applyTurn(velX * dt, velY * dt);
    const decay = Math.exp(-dt * FLICK_DECAY);
    velX *= decay; velY *= decay;
    if (Math.abs(velX) < 0.01 && Math.abs(velY) < 0.01) velX = velY = 0;
  }

  if (keys.size) {
    const f = (keys.has('f') ? 1 : 0) - (keys.has('b') ? 1 : 0);
    const s = (keys.has('r') ? 1 : 0) - (keys.has('l') ? 1 : 0);
    const n = Math.hypot(f, s) || 1;
    walkBy((s / n) * WALK_SPEED * dt, (f / n) * WALK_SPEED * dt);
  }
  walkPos.lerp(walkTarget, 1 - Math.exp(-dt * 6));

  if (gyroOn) {
    targetQ.setFromAxisAngle(Y_AXIS, gyroYawOffset).multiply(deviceQ);
    rig.quaternion.slerp(targetQ, 1 - Math.exp(-dt * 18));
  } else {
    const k = 1 - Math.exp(-dt * 12);
    yaw += (targetYaw - yaw) * k;
    pitch += (targetPitch - pitch) * k;
    rig.quaternion.setFromEuler(tmpE.set(pitch, yaw, 0, 'YXZ'));
  }

  rig.position.copy(walkPos);
  if (cfg && !shot) { // slow idle drift so the depth is felt even when nothing is touched
    const s = cfg.sway;
    rig.position.x += Math.sin(t * 0.31) * s;
    rig.position.y += Math.sin(t * 0.23 + 1.3) * s * 0.5;
    rig.position.z += Math.cos(t * 0.27) * s;
  }

  renderer.render(scene, camera);
  if (shot && ++frames === 90) window.__ready = true;
  requestAnimationFrame(frame);
}

build().then(frame).catch((err) => {
  console.error(err);
  enterBtn.textContent = 'Nu s-a putut încărca';
});
