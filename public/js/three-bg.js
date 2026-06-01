/* ============================================================
   three-bg.js — Refined "horizon" background for Consultora Herrera
   A slow undulating topographic wireframe receding into fog.
   Calm, premium, futuristic. Warm copper→gold, restrained.
   No deps beyond global THREE (r128).
   ============================================================ */
(function () {
  const canvas = document.getElementById("bg-canvas");
  if (!canvas || typeof THREE === "undefined") return;

  const reduced = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const BG = 0x0c0a09;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(BG, 0.062);

  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 120);
  camera.position.set(0, 2.1, 7);
  camera.lookAt(0, 0.2, -6);

  const SEG = reduced ? 60 : 110;
  const SIZE = 60;
  const geo = new THREE.PlaneGeometry(SIZE, SIZE, SEG, SEG);
  geo.rotateX(-Math.PI / 2);
  const pos = geo.attributes.position;
  const base = new Float32Array(pos.count * 2);
  for (let i = 0; i < pos.count; i++) {
    base[i * 2] = pos.getX(i);
    base[i * 2 + 1] = pos.getZ(i);
  }

  const colorAttr = new Float32Array(pos.count * 3);
  geo.setAttribute("color", new THREE.BufferAttribute(colorAttr, 3));

  const cLow = new THREE.Color("#6f2417");
  const cMid = new THREE.Color("#b8431f");
  const cHigh = new THREE.Color("#e7a23a");

  const grid = new THREE.Mesh(
    geo,
    new THREE.MeshBasicMaterial({
      wireframe: true,
      vertexColors: true,
      transparent: true,
      opacity: 0.55,
      fog: true,
    })
  );
  grid.position.set(0, -1.4, -8);
  scene.add(grid);

  const grid2 = grid.clone();
  grid2.material = grid.material.clone();
  grid2.material.opacity = 0.16;
  grid2.position.set(0, 7.5, -8);
  grid2.scale.y = -1;
  scene.add(grid2);

  const glowGeo = new THREE.PlaneGeometry(SIZE, 9);
  const glowMat = new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, fog: false,
    blending: THREE.AdditiveBlending,
    uniforms: { uColor: { value: new THREE.Color("#c8431d") } },
    vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
    fragmentShader: `
      varying vec2 vUv; uniform vec3 uColor;
      void main(){
        float v = smoothstep(0.0,0.5,vUv.y)*smoothstep(1.0,0.5,vUv.y);
        gl_FragColor = vec4(uColor, v*0.5);
      }`,
  });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  glow.position.set(0, 0.4, -22);
  scene.add(glow);

  const m = { x: 0, y: 0, tx: 0, ty: 0 };
  let scrollNorm = 0;
  window.addEventListener("pointermove", (e) => {
    m.tx = e.clientX / window.innerWidth - 0.5;
    m.ty = e.clientY / window.innerHeight - 0.5;
  }, { passive: true });
  window.addEventListener("scroll", () => {
    const h = document.documentElement.scrollHeight - window.innerHeight;
    scrollNorm = h > 0 ? window.scrollY / h : 0;
  }, { passive: true });

  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize);
  resize();

  let pulse = 0;
  window.__bgPulse = () => { pulse = 1; };

  function wave(x, z, t) {
    return (
      Math.sin(x * 0.32 + t * 0.85) * 0.5 +
      Math.sin((x + z) * 0.2 + t * 0.55) * 0.38 +
      Math.cos(z * 0.28 - t * 0.7) * 0.34
    );
  }

  const clock = new THREE.Clock();
  function frame() {
    const t = clock.getElapsedTime();
    m.x += (m.tx - m.x) * 0.045;
    m.y += (m.ty - m.y) * 0.045;
    pulse *= 0.94;

    const amp = 1 + pulse * 0.5;
    for (let i = 0; i < pos.count; i++) {
      const x = base[i * 2], z = base[i * 2 + 1];
      const h = wave(x, z, t) * amp;
      pos.setY(i, h);
      const tt = THREE.MathUtils.clamp((h + 0.9) / 2.4, 0, 1);
      let c;
      if (tt < 0.5) c = cLow.clone().lerp(cMid, tt / 0.5);
      else c = cMid.clone().lerp(cHigh, (tt - 0.5) / 0.5);
      colorAttr[i * 3] = c.r; colorAttr[i * 3 + 1] = c.g; colorAttr[i * 3 + 2] = c.b;
    }
    pos.needsUpdate = true;
    geo.attributes.color.needsUpdate = true;

    grid.rotation.z = m.x * 0.06;
    camera.position.x = m.x * 1.6;
    camera.position.y = 2.1 - m.y * 0.6 - scrollNorm * 1.4;
    camera.lookAt(0, 0.2 - scrollNorm * 0.8, -6);

    renderer.render(scene, camera);
    if (!reduced) requestAnimationFrame(frame);
  }
  frame();
  if (reduced) renderer.render(scene, camera);
})();
