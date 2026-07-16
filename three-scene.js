/* ── 3D scenes (Three.js) — hero cloud-infrastructure scene + skill sphere ── */
(function () {
  'use strict';

  /* Classic (non-module) script so it also works over file:// — THREE comes from the global UMD build */
  const THREE = window.THREE;
  if (!THREE) {
    if (typeof window.__initHero2D === 'function') window.__initHero2D();
    return;
  }

  const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const MOBILE = window.innerWidth < 700;
  const DPR = Math.min(window.devicePixelRatio || 1, MOBILE ? 1.5 : 2);

  const THEMES = {
    light: { accent: 0xdc2626, ink: 0x1c1e21, accentCss: '#dc2626', inkCss: 'rgba(28,30,33,.82)' },
    dark: { accent: 0xf87171, ink: 0xf2f3f5, accentCss: '#f87171', inkCss: 'rgba(242,243,245,.88)' }
  };
  const theme = () =>
    THEMES[document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'];

  const accentMats = [];
  const inkMats = [];
  const retintFns = [];

  function registerMat(mat, kind) {
    (kind === 'accent' ? accentMats : inkMats).push(mat);
    mat.color.set(kind === 'accent' ? theme().accent : theme().ink);
  }

  function retintAll() {
    accentMats.forEach(m => m.color.set(theme().accent));
    inkMats.forEach(m => m.color.set(theme().ink));
    retintFns.forEach(fn => fn());
    needsStaticRender = true;
  }

  new MutationObserver(muts => {
    if (muts.some(m => m.attributeName === 'data-theme')) retintAll();
  }).observe(document.documentElement, { attributes: true });

  /* ══════════════════ HERO — cloud infrastructure in orbit ══════════════════ */
  let hero = null;

  function initHero() {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return null;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    } catch (e) {
      return null;
    }
    renderer.setPixelRatio(DPR);

    const scene = new THREE.Scene();
    /* Theme-aware fog — gives real depth to the scene */
    const bgColor = () =>
      (getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#ffffff');
    scene.fog = new THREE.Fog(new THREE.Color(bgColor()), 7, 13.5);
    retintFns.push(() => scene.fog.color.set(bgColor()));

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 60);
    camera.position.set(0, 0, 6.2);

    const root = new THREE.Group();
    scene.add(root);

    /* Core — wireframe icosahedron (the "cluster brain") */
    const coreGeo = new THREE.IcosahedronGeometry(1.15, 1);
    const coreMat = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.33 });
    registerMat(coreMat, 'accent');
    const core = new THREE.LineSegments(new THREE.WireframeGeometry(coreGeo), coreMat);
    root.add(core);

    const coreDotsMat = new THREE.PointsMaterial({ size: 0.045, transparent: true, opacity: 0.5, sizeAttenuation: true });
    registerMat(coreDotsMat, 'ink');
    const coreDots = new THREE.Points(coreGeo, coreDotsMat);
    core.add(coreDots);

    /* Inner core glow */
    const innerMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.05 });
    registerMat(innerMat, 'accent');
    core.add(new THREE.Mesh(new THREE.IcosahedronGeometry(0.85, 1), innerMat));

    /* Orbiting containers (boxes) */
    const boxes = [];
    const nBoxes = MOBILE ? 6 : 11;
    for (let i = 0; i < nBoxes; i++) {
      const s = 0.14 + Math.random() * 0.17;
      const geo = new THREE.BoxGeometry(s, s, s);
      const isAccent = i % 3 === 0;
      const mat = new THREE.LineBasicMaterial({ transparent: true, opacity: isAccent ? 0.8 : 0.55 });
      registerMat(mat, isAccent ? 'accent' : 'ink');
      const box = new THREE.LineSegments(new THREE.EdgesGeometry(geo), mat);
      box.userData = {
        r: 1.9 + Math.random() * 1.6,
        speed: (0.08 + Math.random() * 0.14) * (i % 2 ? 1 : -1),
        phase: Math.random() * Math.PI * 2,
        yAmp: 0.4 + Math.random() * 0.9,
        tilt: Math.random() * Math.PI,
        spin: 0.3 + Math.random() * 0.8
      };
      boxes.push(box);
      root.add(box);
    }

    /* Kubernetes-style 7-sided rings */
    const rings = [];
    for (let i = 0; i < (MOBILE ? 2 : 3); i++) {
      const pts = [];
      for (let k = 0; k < 7; k++) {
        const a = (k / 7) * Math.PI * 2 + Math.PI / 2;
        pts.push(new THREE.Vector3(Math.cos(a) * 0.32, Math.sin(a) * 0.32, 0));
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      const mat = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.6 });
      registerMat(mat, 'accent');
      const ring = new THREE.LineLoop(geo, mat);
      ring.userData = {
        r: 2.4 + Math.random() * 1.1,
        speed: (0.06 + Math.random() * 0.08) * (i % 2 ? -1 : 1),
        phase: (i / 3) * Math.PI * 2,
        yAmp: 0.5 + Math.random() * 0.6,
        spin: 0.4 + Math.random() * 0.5
      };
      rings.push(ring);
      root.add(ring);
    }

    /* Ambient particle field */
    const nPts = MOBILE ? 110 : 240;
    const pos = new Float32Array(nPts * 3);
    for (let i = 0; i < nPts; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 11;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6.5;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    const ptsGeo = new THREE.BufferGeometry();
    ptsGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    const ptsMat = new THREE.PointsMaterial({ size: 0.022, transparent: true, opacity: 0.4, sizeAttenuation: true });
    registerMat(ptsMat, 'ink');
    const field = new THREE.Points(ptsGeo, ptsMat);
    root.add(field);

    /* Data flows — packets travelling along curves between nodes */
    const flows = [];
    const nFlows = MOBILE ? 3 : 6;
    for (let i = 0; i < nFlows; i++) {
      const a1 = Math.random() * Math.PI * 2, a2 = Math.random() * Math.PI * 2;
      const p1 = new THREE.Vector3(Math.cos(a1) * 2.8, (Math.random() - 0.5) * 2, Math.sin(a1) * 2.8);
      const p2 = new THREE.Vector3(Math.cos(a2) * 2.8, (Math.random() - 0.5) * 2, Math.sin(a2) * 2.8);
      const mid = p1.clone().add(p2).multiplyScalar(0.35);
      const curve = new THREE.CatmullRomCurve3([p1, mid, p2]);
      const lineMat = new THREE.LineBasicMaterial({ transparent: true, opacity: 0.18 });
      registerMat(lineMat, 'ink');
      root.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(curve.getPoints(50)), lineMat));
      const pktMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.9 });
      registerMat(pktMat, 'accent');
      const pkt = new THREE.Mesh(new THREE.SphereGeometry(0.035, 8, 8), pktMat);
      root.add(pkt);
      flows.push({ curve, pkt, t: Math.random(), speed: 0.0018 + Math.random() * 0.0022 });
    }

    /* Pointer parallax (smoothed) + scroll */
    let mx = 0, my = 0, smx = 0, smy = 0;
    window.addEventListener('pointermove', e => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
    }, { passive: true });

    const heroEl = canvas.closest('.hero');
    let heroH = 800;
    function resize() {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      if (w < 2 || h < 2) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      heroH = heroEl ? Math.max(400, heroEl.offsetHeight) : 800;
    }
    resize();
    window.addEventListener('resize', resize);

    function update(t) {
      smx += (mx - smx) * 0.045;
      smy += (my - smy) * 0.045;
      root.rotation.y = t * 0.00007 + smx * 0.35;
      root.rotation.x = -0.12 + smy * 0.22 + window.scrollY * 0.00012;
      root.position.y = window.scrollY * 0.0009;
      /* Camera breathing drift */
      camera.position.x = Math.sin(t * 0.00013) * 0.18;
      camera.position.y = Math.cos(t * 0.00011) * 0.12;
      camera.lookAt(0, 0, 0);
      /* Core rotation + gentle pulse */
      core.rotation.y = t * 0.00016;
      core.rotation.z = t * 0.00006;
      core.scale.setScalar(1 + Math.sin(t * 0.0006) * 0.035);
      /* Fade the scene out as the hero scrolls away */
      canvas.style.opacity = Math.max(0, 1 - window.scrollY / (heroH * 0.85)).toFixed(3);
      for (const b of boxes) {
        const u = b.userData, a = u.phase + t * 0.001 * u.speed;
        b.position.set(Math.cos(a) * u.r, Math.sin(a * 1.4 + u.tilt) * u.yAmp, Math.sin(a) * u.r);
        b.rotation.x = t * 0.0006 * u.spin;
        b.rotation.y = t * 0.0004 * u.spin;
      }
      for (const r of rings) {
        const u = r.userData, a = u.phase + t * 0.001 * u.speed;
        r.position.set(Math.cos(a) * u.r, Math.sin(a * 1.2) * u.yAmp, Math.sin(a) * u.r);
        r.rotation.x = t * 0.0005 * u.spin;
        r.rotation.y = t * 0.0007 * u.spin;
      }
      for (const f of flows) {
        f.t = (f.t + f.speed) % 1;
        f.pkt.position.copy(f.curve.getPoint(f.t));
        f.pkt.material.opacity = 0.35 + 0.6 * Math.sin(f.t * Math.PI);
      }
      field.rotation.y = t * 0.00002;
      renderer.render(scene, camera);
    }

    return { canvas, update, resize };
  }

  /* ══════════════════ SKILLS — draggable 3D tag sphere ══════════════════ */
  const SKILLS = [
    ['Kubernetes', 1], ['Docker', 1], ['Terraform', 1], ['AWS', 1], ['GCP', 1],
    ['Helm', 0], ['ArgoCD', 1], ['FluxCD', 0], ['CloudFormation', 0], ['AWS CDK', 0],
    ['Terragrunt', 0], ['Buildkite', 0], ['CI/CD', 1], ['EKS', 0], ['ECS', 0],
    ['Lambda', 0], ['DynamoDB', 0], ['Step Functions', 0],
    ['GKE', 0], ['Cloud Run', 0], ['Pub/Sub', 0], ['Karpenter', 0],
    ['Golang', 1], ['Python', 1], ['C#', 0], ['.NET 6/8', 1], ['Node.js', 1],
    ['NestJS', 0], ['MySQL', 0], ['MongoDB', 0], ['RabbitMQ', 0],
    ['Microservices', 1]
  ];

  let sphere = null;

  function initSphere() {
    const canvas = document.getElementById('skillSphere');
    if (!canvas) return null;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    } catch (e) {
      return null;
    }
    renderer.setPixelRatio(DPR);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 50);
    camera.position.z = 6.9;

    const group = new THREE.Group();
    scene.add(group);

    const R = MOBILE ? 2.0 : 2.6;
    const items = [];
    const N = SKILLS.length;

    SKILLS.forEach(([word, isAccent], i) => {
      const c = document.createElement('canvas');
      const cx = c.getContext('2d');
      const font = '600 44px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
      cx.font = font;
      const w = Math.ceil(cx.measureText(word).width) + 28;
      c.width = w;
      c.height = 64;
      const tex = new THREE.CanvasTexture(c);
      tex.anisotropy = 4;
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
      const spr = new THREE.Sprite(mat);
      const k = isAccent ? 0.0095 : 0.0074;
      spr.scale.set(w * k, 64 * k, 1);
      /* Fibonacci sphere distribution */
      const y = 1 - (i / (N - 1)) * 2;
      const rad = Math.sqrt(Math.max(0, 1 - y * y));
      const th = Math.PI * (3 - Math.sqrt(5)) * i;
      spr.position.set(Math.cos(th) * rad * R, y * R, Math.sin(th) * rad * R);
      group.add(spr);
      items.push({ word, isAccent, canvas: c, cx, tex, font, spr });
    });

    function drawWords() {
      for (const it of items) {
        it.cx.clearRect(0, 0, it.canvas.width, it.canvas.height);
        it.cx.font = it.font;
        it.cx.textAlign = 'center';
        it.cx.textBaseline = 'middle';
        it.cx.fillStyle = it.isAccent ? theme().accentCss : theme().inkCss;
        it.cx.fillText(it.word, it.canvas.width / 2, it.canvas.height / 2);
        it.tex.needsUpdate = true;
      }
    }
    drawWords();
    retintFns.push(drawWords);

    /* Drag to rotate with inertia */
    let vx = 0.0016, vy = 0.0004, dragging = false, lx = 0, ly = 0;
    canvas.addEventListener('pointerdown', e => {
      dragging = true;
      lx = e.clientX; ly = e.clientY;
      canvas.setPointerCapture(e.pointerId);
      canvas.style.cursor = 'grabbing';
    });
    canvas.addEventListener('pointermove', e => {
      if (!dragging) return;
      vx = (e.clientX - lx) * 0.00028;
      vy = (e.clientY - ly) * 0.00028;
      group.rotation.y += (e.clientX - lx) * 0.005;
      group.rotation.x += (e.clientY - ly) * 0.005;
      lx = e.clientX; ly = e.clientY;
      needsStaticRender = true;
    });
    const endDrag = () => { dragging = false; canvas.style.cursor = 'grab'; };
    canvas.addEventListener('pointerup', endDrag);
    canvas.addEventListener('pointercancel', endDrag);

    const v = new THREE.Vector3();
    function update() {
      if (!dragging) {
        vx += (0.0016 - vx) * 0.01;
        vy += (0 - vy) * 0.01;
        group.rotation.y += vx;
        group.rotation.x += vy;
      }
      group.rotation.x = Math.max(-0.9, Math.min(0.9, group.rotation.x));
      /* Depth-based fade */
      for (const it of items) {
        v.copy(it.spr.position).applyQuaternion(group.quaternion);
        const d = (v.z + R) / (2 * R);
        it.spr.material.opacity = 0.22 + 0.78 * d;
      }
      renderer.render(scene, camera);
    }

    function resize() {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      if (w < 2 || h < 2) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }
    resize();
    window.addEventListener('resize', resize);

    return { canvas, update, resize };
  }

  /* ══════════════════ Shared render loop with visibility gating ══════════════════ */
  let heroVisible = true, sphereVisible = true, needsStaticRender = true;

  try {
    hero = initHero();
  } catch (e) { hero = null; }
  try {
    sphere = initSphere();
  } catch (e) { sphere = null; }

  if (hero || sphere) window.__three3DActive = true;
  if (!hero && typeof window.__initHero2D === 'function') window.__initHero2D();

  const io = new IntersectionObserver(entries => {
    for (const en of entries) {
      if (hero && en.target === hero.canvas) heroVisible = en.isIntersecting;
      if (sphere && en.target === sphere.canvas) sphereVisible = en.isIntersecting;
    }
  }, { rootMargin: '80px' });
  if (hero) io.observe(hero.canvas);
  if (sphere) io.observe(sphere.canvas);

  if (REDUCED) {
    /* Static single render; re-render only on theme change or drag */
    const staticLoop = () => {
      if (needsStaticRender) {
        if (hero) hero.update(1200);
        if (sphere) sphere.update();
        needsStaticRender = false;
      }
      requestAnimationFrame(staticLoop);
    };
    requestAnimationFrame(staticLoop);
  } else if (hero || sphere) {
    const loop = t => {
      if (!document.hidden) {
        if (hero && heroVisible) hero.update(t);
        if (sphere && sphereVisible) sphere.update();
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
})();
