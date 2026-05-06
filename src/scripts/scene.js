/**
 * Three.js editorial scene — wireframe globe
 * - Pure linework: meridians + parallels, no fills, no shaders
 * - Reads as a draftsman's drawing or telemetry diagram
 * - Off-screen-right placement so it never competes with typography
 * - Slow rotation + subtle axial wobble + mouse-driven camera parallax
 *
 * Restraint is the move.
 */

import * as THREE from 'three';

export function initScene(mountId = 'three-bg') {
  const mount = document.getElementById(mountId);
  if (!mount) return;

  const W = () => mount.clientWidth;
  const H = () => mount.clientHeight;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, W() / H(), 0.1, 100);
  camera.position.set(0, 0, 14);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W(), H());
  renderer.setClearColor(0xf4f1ea, 1);
  mount.appendChild(renderer.domElement);

  // ===== Wireframe globe =====
  // Pure line drawing: meridians (vertical great circles) and parallels
  // (horizontal latitude rings). Inspired by mid-century telemetry diagrams
  // and architectural drafting prints — no fills, just ink on paper.
  const globeGroup = new THREE.Group();
  globeGroup.position.set(8, 0, 0);

  const radius = 3.2;
  const lineColor = 0x1a1a1a;
  const lineMat = new THREE.LineBasicMaterial({
    color: lineColor,
    transparent: true,
    opacity: 0.32,
  });

  // Meridians — 12 vertical great circles, evenly spaced around the y-axis
  const meridianCount = 12;
  for (let i = 0; i < meridianCount; i++) {
    const points = [];
    const segments = 96;
    for (let j = 0; j <= segments; j++) {
      const phi = (j / segments) * Math.PI * 2;
      // Each meridian sits in the y-z plane, then rotated around y below
      points.push(
        new THREE.Vector3(0, radius * Math.sin(phi), radius * Math.cos(phi))
      );
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geo, lineMat);
    line.rotation.y = (i / meridianCount) * Math.PI;
    globeGroup.add(line);
  }

  // Parallels — 6 latitude rings; denser near the equator, sparser at the poles
  const parallelStops = [-0.85, -0.6, -0.3, 0.3, 0.6, 0.85];
  for (const y of parallelStops) {
    const r = radius * Math.sqrt(1 - y * y);
    const points = [];
    const segments = 128;
    for (let j = 0; j <= segments; j++) {
      const angle = (j / segments) * Math.PI * 2;
      points.push(
        new THREE.Vector3(r * Math.cos(angle), radius * y, r * Math.sin(angle))
      );
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.Line(geo, lineMat);
    globeGroup.add(line);
  }

  // Equator — slightly stronger than the other parallels (drafting hierarchy)
  const equatorPoints = [];
  const equatorSegments = 128;
  for (let j = 0; j <= equatorSegments; j++) {
    const angle = (j / equatorSegments) * Math.PI * 2;
    equatorPoints.push(
      new THREE.Vector3(
        radius * Math.cos(angle),
        0,
        radius * Math.sin(angle)
      )
    );
  }
  const equatorGeo = new THREE.BufferGeometry().setFromPoints(equatorPoints);
  const equatorMat = new THREE.LineBasicMaterial({
    color: lineColor,
    transparent: true,
    opacity: 0.55,
  });
  const equator = new THREE.Line(equatorGeo, equatorMat);
  globeGroup.add(equator);

  // Outer reference ring — compass marking around the globe
  const refRingGeo = new THREE.RingGeometry(radius * 1.25, radius * 1.252, 200);
  const refRingMat = new THREE.MeshBasicMaterial({
    color: lineColor,
    transparent: true,
    opacity: 0.22,
    side: THREE.DoubleSide,
  });
  const refRing = new THREE.Mesh(refRingGeo, refRingMat);
  refRing.rotation.x = Math.PI / 2;
  globeGroup.add(refRing);

  // Slight axial tilt — feels earth-like rather than purely geometric
  globeGroup.rotation.z = 0.4; // ~23° — Earth's axial tilt
  scene.add(globeGroup);

  // ===== Mouse parallax =====
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  function onMouseMove(e) {
    // Track mouse position relative to the hero (canvas mount), not the whole window.
    // This keeps parallax behaving correctly now that the canvas lives inside the hero
    // section rather than being page-level fixed.
    const rect = mount.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    targetX = x * 0.4;
    targetY = y * 0.25;
  }
  window.addEventListener('mousemove', onMouseMove);

  function resize() {
    const w = W();
    const h = H();
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', resize);

  // Pause when tab hidden — saves battery and GPU
  let visible = true;
  document.addEventListener('visibilitychange', () => {
    visible = !document.hidden;
  });

  // ===== Animate =====
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    if (!visible) return;

    const t = clock.getElapsedTime();

    currentX += (targetX - currentX) * 0.025;
    currentY += (targetY - currentY) * 0.025;
    camera.position.x = currentX * 1.0;
    camera.position.y = -currentY * 0.6;
    camera.lookAt(globeGroup.position.x * 0.3, 0, 0);

    // Steady, visible y-axis rotation — like a real spinning globe
    globeGroup.rotation.y = t * 0.15;

    // Subtle drift on the axial tilt — feels organic, not robotic
    globeGroup.rotation.z = 0.4 + Math.sin(t * 0.2) * 0.05;

    renderer.render(scene, camera);
  }
  animate();

  // Cleanup
  return () => {
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('resize', resize);
    renderer.dispose();
    lineMat.dispose();
    equatorMat.dispose();
    equatorGeo.dispose();
    refRingGeo.dispose();
    refRingMat.dispose();
    globeGroup.children.forEach((child) => {
      if (child.geometry) child.geometry.dispose();
    });
    if (renderer.domElement.parentElement === mount) {
      mount.removeChild(renderer.domElement);
    }
  };
}
