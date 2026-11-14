// 360° painted landscape with depth parallax.
// A sphere around the viewer is displaced by a depth map; the camera sits slightly
// in front of its pivot, so turning the head makes near things slide against far ones.
import * as THREE from './vendor/three.module.min.js';

const params = new URLSearchParams(location.search);
const sceneName = params.get('scene') || 'winter-landscape';
const base = `scenes/${sceneName}/`;

const canvas = document.getElementById('view');
const startEl = document.getElementById('start');
const enterBtn = document.getElementById('enter');
const muteBtn = document.getElementById('mute');

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, 1, 0.05, 500);
const pivot = new THREE.Object3D(); // the "neck"; the camera is the eye in front of it
pivot.add(camera);
scene.add(pivot);

let cfg = null;
let baseFov = 70;
let zoom = 1;

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

const vertexShader = /* glsl */ `
  uniform sampler2D uDepth;
  uniform float uNear;
  uniform float uFar;
  varying vec2 vUv;
  const float PI = 3.141592653589793;
  void main() {
    vUv = uv;
    float lon = (uv.x - 0.5) * 2.0 * PI;   // 0 = centre of the image, straight ahead (-Z)
    float lat = (uv.y - 0.5) * PI;
    vec3 dir = vec3(sin(lon) * cos(lat), sin(lat), -cos(lon) * cos(lat));
    float d = texture2D(uDepth, uv).r;     // inverse depth: 1 = near, 0 = far
    float r = 1.0 / mix(1.0 / uFar, 1.0 / uNear, d);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(dir * r, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uColor;
  varying vec2 vUv;
  void main() {
    gl_FragColor = vec4(texture2D(uColor, vUv).rgb, 1.0);
  }
`;

function loadTexture(url) {
  return new Promise((resolve, reject) => new THREE.TextureLoader().load(url, resolve, undefined, reject));
}

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
  const spaced = artist.toUpperCase().split('').join('  ');
  g.fillText(spaced, c.width / 2, 480, c.width - 80);
  const t = new THREE.CanvasTexture(c);
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

  const [color, depth] = await Promise.all([loadTexture(base + cfg.color), loadTexture(base + cfg.depth)]);
  color.wrapS = THREE.RepeatWrapping;
  color.anisotropy = renderer.capabilities.getMaxAnisotropy();
  depth.wrapS = THREE.RepeatWrapping;
  depth.generateMipmaps = false;
  depth.minFilter = THREE.LinearFilter;

  const world = new THREE.Mesh(
    new THREE.SphereGeometry(1, 512, 256),
    new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: color }, uDepth: { value: depth },
        uNear: { value: cfg.near }, uFar: { value: cfg.far },
      },
      vertexShader, fragmentShader, side: THREE.DoubleSide,
    })
  );
  world.frustumCulled = false; // real positions are computed in the shader
  scene.add(world);

  if (cfg.text) {
    const t = cfg.text;
    const label = new THREE.Mesh(
      new THREE.PlaneGeometry(t.width, t.width * 640 / 2048),
      new THREE.MeshBasicMaterial({ map: makeTextTexture(cfg.artist, cfg.title), transparent: true, depthWrite: false, toneMapped: false })
    );
    label.position.copy(lonLatToDir(t.lon, t.lat).multiplyScalar(t.distance));
    label.lookAt(0, 0, 0);
    scene.add(label);
  }

  camera.position.set(0, 0, -cfg.eyeOffset);
  yaw = targetYaw = -THREE.MathUtils.degToRad(cfg.startLon || 0);

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
    pivot.quaternion.copy(tmpQ.setFromAxisAngle(Y_AXIS, gyroYawOffset).multiply(deviceQ));
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

// Drag (mouse and touch), with inertia: a flick keeps sliding and fades out in about a second
let dragging = false, lastX = 0, lastY = 0, lastMoveT = 0;
let velX = 0, velY = 0;              // radians per second, measured while dragging
const FLICK_DECAY = 1.6;             // higher = stops sooner; 1.6 is roughly a two second glide
const MAX_FLICK = THREE.MathUtils.degToRad(260); // speed cap, degrees per second

function applyTurn(dx, dy) {
  if (gyroOn) {
    gyroYawOffset += dx; // with the gyroscope on, dragging only turns the world sideways
  } else {
    targetYaw += dx;
    targetPitch = THREE.MathUtils.clamp(targetPitch + dy, -MAX_PITCH, MAX_PITCH);
  }
}

canvas.addEventListener('pointerdown', (e) => {
  dragging = true; lastX = e.clientX; lastY = e.clientY;
  lastMoveT = e.timeStamp; velX = velY = 0; // touching the screen stops any glide
  canvas.setPointerCapture(e.pointerId);
});
canvas.addEventListener('pointermove', (e) => {
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
});

// ---------- loop ----------

const clock = new THREE.Clock();
function frame() {
  const dt = Math.min(clock.getDelta(), 0.1);
  const t = clock.elapsedTime;

  if (!dragging && (velX || velY)) { // glide after a flick
    applyTurn(velX * dt, velY * dt);
    const decay = Math.exp(-dt * FLICK_DECAY);
    velX *= decay; velY *= decay;
    if (Math.abs(velX) < 0.01 && Math.abs(velY) < 0.01) velX = velY = 0;
  }

  if (gyroOn) {
    targetQ.setFromAxisAngle(Y_AXIS, gyroYawOffset).multiply(deviceQ);
    pivot.quaternion.slerp(targetQ, 1 - Math.exp(-dt * 18));
  } else {
    const k = 1 - Math.exp(-dt * 12);
    yaw += (targetYaw - yaw) * k;
    pitch += (targetPitch - pitch) * k;
    pivot.quaternion.setFromEuler(tmpE.set(pitch, yaw, 0, 'YXZ'));
  }

  if (cfg) { // slow idle drift so the depth is felt even when nothing is touched
    const s = cfg.sway;
    pivot.position.set(Math.sin(t * 0.31) * s, Math.sin(t * 0.23 + 1.3) * s * 0.5, Math.cos(t * 0.27) * s);
  }

  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}

build().then(frame).catch((err) => {
  console.error(err);
  enterBtn.textContent = 'Nu s-a putut încărca';
});
