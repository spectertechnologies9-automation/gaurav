import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { isSmallScreen } from '../lib/motion.js';

/**
 * Lightweight floating-geometry scene behind the portrait.
 * - Flat-shaded neo-brutalist solids with black outlines (no heavy lighting/shadows)
 * - Renders only while visible (IntersectionObserver) and while the tab is visible
 * - DPR capped, fewer objects on small screens
 */
const PALETTE = [0xffe500, 0xff55a5, 0x315df5, 0x73f5c0, 0xc8a7ff, 0xff8750, 0x76e5f5];

export default function HeroScene({ pointer }) {
  const host = useRef(null);

  useEffect(() => {
    const el = host.current;
    const small = isSmallScreen();
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !small, powerPreference: 'low-power' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.25 : 1.75));
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.z = 14;

    scene.add(new THREE.AmbientLight(0xffffff, 1.6));
    const sun = new THREE.DirectionalLight(0xffffff, 1.8);
    sun.position.set(4, 6, 8);
    scene.add(sun);

    const geos = [
      new THREE.BoxGeometry(1.5, 1.5, 1.5),
      new THREE.OctahedronGeometry(1.05),
      new THREE.TetrahedronGeometry(1.2),
      new THREE.IcosahedronGeometry(0.95, 0),
      new THREE.TorusGeometry(0.8, 0.3, 8, 18),
      new THREE.ConeGeometry(0.9, 1.6, 4),
      new THREE.DodecahedronGeometry(0.9),
    ];
    const lineMat = new THREE.LineBasicMaterial({ color: 0x111111 });
    const count = small ? 7 : 12;
    const objs = [];
    const mats = [];
    for (let i = 0; i < count; i++) {
      const g = geos[i % geos.length];
      const m = new THREE.MeshStandardMaterial({ color: PALETTE[i % PALETTE.length], flatShading: true, roughness: 0.9, metalness: 0 });
      mats.push(m);
      const mesh = new THREE.Mesh(g, m);
      mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(g), lineMat));
      const a = (i / count) * Math.PI * 2 + 0.4;
      const rad = 5.2 + (i % 3) * 1.1;
      mesh.userData = { a, rad, sp: 0.1 + (i % 5) * 0.03, rx: 0.2 + (i % 4) * 0.1, ry: 0.25 + (i % 3) * 0.12, y: (i % 2 ? 1 : -1) * (0.6 + (i % 4) * 0.7), ph: i * 1.7 };
      mesh.scale.setScalar(small ? 0.55 : 0.7 + (i % 3) * 0.15);
      scene.add(mesh);
      objs.push(mesh);
    }

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = el;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    let raf = 0;
    let visible = true;
    let pageVisible = !document.hidden;
    const clock = new THREE.Clock();
    const sx = { x: 0, y: 0 };

    const frame = () => {
      raf = 0;
      if (!visible || !pageVisible) return;
      const t = clock.getElapsedTime();
      sx.x += (pointer.current.x - sx.x) * 0.06;
      sx.y += (pointer.current.y - sx.y) * 0.06;
      objs.forEach((o) => {
        const u = o.userData;
        const ang = u.a + t * u.sp;
        o.position.set(Math.cos(ang) * u.rad * 0.95, u.y + Math.sin(t * 0.8 + u.ph) * 0.45, Math.sin(ang) * 2.2 - 1);
        o.rotation.x = t * u.rx;
        o.rotation.y = t * u.ry;
      });
      scene.rotation.y = sx.x * 0.25;
      scene.rotation.x = -sx.y * 0.15;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (!raf && visible && pageVisible) {
        clock.start();
        raf = requestAnimationFrame(frame);
      }
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
    });
    io.observe(el);
    const onVis = () => {
      pageVisible = !document.hidden;
      if (pageVisible) start();
    };
    document.addEventListener('visibilitychange', onVis);
    start();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      geos.forEach((g) => g.dispose());
      mats.forEach((m) => m.dispose());
      lineMat.dispose();
      objs.forEach((o) => o.children[0].geometry.dispose());
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [pointer]);

  return <div ref={host} className="hero__canvas" aria-hidden="true" />;
}
