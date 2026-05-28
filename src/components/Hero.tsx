import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroProps {
  onScroll: (id: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onScroll }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const typedRef = useRef<HTMLSpanElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // ── Typewriter ──────────────────────────────────────────────────────────────
    const ROLES = ['React.js Developer', 'SolidJS Engineer', 'UI Architect', 'TypeScript Enthusiast'];
    let rIdx = 0, cIdx = 0, del = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    function typeWrite() {
      const cur = ROLES[rIdx];
      const el = typedRef.current;
      if (!el) return;

      if (!del) {
        if (cIdx < cur.length) {
          el.textContent = cur.slice(0, ++cIdx);
          timeoutId = setTimeout(typeWrite, 75);
        } else {
          del = true;
          timeoutId = setTimeout(typeWrite, 1600);
        }
      } else {
        if (cIdx > 0) {
          el.textContent = cur.slice(0, --cIdx);
          timeoutId = setTimeout(typeWrite, 45);
        } else {
          del = false;
          rIdx = (rIdx + 1) % ROLES.length;
          timeoutId = setTimeout(typeWrite, 100);
        }
      }
    }

    timeoutId = setTimeout(typeWrite, 600);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    // ── Three.js ────────────────────────────────────────────────────────────────
    if (!canvasRef.current || !heroRef.current) return;

    const hero = heroRef.current;
    const canvas = canvasRef.current;
    
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(hero.clientWidth, hero.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(60, hero.clientWidth / hero.clientHeight, 0.1, 1000);
    cam.position.z = 38;

    // Nodes
    const nodes: THREE.Mesh[] = [];
    const ng = new THREE.Group();
    for (let i = 0; i < 55; i++) {
      const big = Math.random() > .75;
      const r = big ? .45 + Math.random() * .25 : .1 + Math.random() * .22;
      const g = new THREE.SphereGeometry(r, 8, 6);
      const c = big ? 0x00e5ff : Math.random() > .5 ? 0x00ff9f : 0x0055aa;
      const m = new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: big ? .95 : .5 });
      const mesh = new THREE.Mesh(g, m);
      mesh.position.set((Math.random() - .5) * 72, (Math.random() - .5) * 50, (Math.random() - .5) * 35);
      mesh.userData = { ph: Math.random() * Math.PI * 2, sp: .25 + Math.random() * .5 };
      nodes.push(mesh);
      ng.add(mesh);
    }
    scene.add(ng);

    // Wireframe octahedra
    const og = new THREE.Group();
    for (let i = 0; i < 5; i++) {
      const g = new THREE.OctahedronGeometry(1.3 + Math.random() * 1.5, 0);
      const m = new THREE.MeshBasicMaterial({ color: 0x00e5ff, wireframe: true, transparent: true, opacity: .07 });
      const mesh = new THREE.Mesh(g, m);
      mesh.position.set((Math.random() - .5) * 60, (Math.random() - .5) * 40, (Math.random() - .5) * 20);
      mesh.userData = { rx: (Math.random() - .5) * .005, ry: (Math.random() - .5) * .008 };
      og.add(mesh);
    }
    scene.add(og);

    // Edges
    const MAX = 120;
    const ea = new Float32Array(MAX * 6);
    const eg = new THREE.BufferGeometry();
    eg.setAttribute('position', new THREE.BufferAttribute(ea, 3));
    const el = new THREE.LineSegments(eg, new THREE.LineBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: .13 }));
    scene.add(el);

    // Stars
    const sa = new Float32Array(300 * 3);
    for (let i = 0; i < 900; i++) sa[i] = (Math.random() - .5) * 200;
    const sg = new THREE.BufferGeometry();
    sg.setAttribute('position', new THREE.BufferAttribute(sa, 3));
    const stars = new THREE.Points(sg, new THREE.PointsMaterial({ size: .18, color: 0x8899cc, transparent: true, opacity: .4, sizeAttenuation: true }));
    scene.add(stars);

    // Mouse
    let mx = 0, my = 0;
    const onMouseMove = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - .5) * 2;
      my = -(e.clientY / window.innerHeight - .5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Animate
    let t = 0;
    let animId: number;
    const anim = () => {
      animId = requestAnimationFrame(anim);
      t += .007;
      nodes.forEach(n => {
        n.position.x += Math.sin(t * n.userData.sp + n.userData.ph) * .007;
        n.position.y += Math.cos(t * n.userData.sp * .8 + n.userData.ph) * .007;
      });
      og.children.forEach(o => {
        const mesh = o as THREE.Mesh;
        mesh.rotation.x += mesh.userData.rx;
        mesh.rotation.y += mesh.userData.ry;
      });
      let cnt = 0;
      outer: for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (cnt >= MAX) break outer;
          const d = nodes[i].position.distanceTo(nodes[j].position);
          if (d < 18) {
            const b = cnt * 6;
            ea[b] = nodes[i].position.x;
            ea[b + 1] = nodes[i].position.y;
            ea[b + 2] = nodes[i].position.z;
            ea[b + 3] = nodes[j].position.x;
            ea[b + 4] = nodes[j].position.y;
            ea[b + 5] = nodes[j].position.z;
            cnt++;
          }
        }
      }
      for (let i = cnt * 6; i < MAX * 6; i++) ea[i] = 0;
      eg.attributes.position.needsUpdate = true;
      el.geometry.setDrawRange(0, cnt * 2);
      cam.position.x += (mx * 4 - cam.position.x) * .025;
      cam.position.y += (my * 2.5 - cam.position.y) * .025;
      cam.lookAt(0, 0, 0);
      ng.rotation.y += .0007;
      renderer.render(scene, cam);
    };
    anim();

    const onResize = () => {
      const w = hero.clientWidth, h = hero.clientHeight;
      cam.aspect = w / h;
      cam.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animId);
      renderer.dispose();
    };
  }, []);

  return (
    <section id="hero" ref={heroRef} style={{ position: 'relative', height: '100vh', minHeight: '640px', display: 'flex', alignItems: 'center', padding: '0 8%', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}></canvas>
      <div className="grid-bg" style={{ opacity: .55, zIndex: 1 }}></div>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 55% 50%,transparent 25%,#04080f 75%)', pointerEvents: 'none', zIndex: 1 }}></div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '220px', background: 'linear-gradient(to bottom,transparent,#04080f)', pointerEvents: 'none', zIndex: 1 }}></div>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '680px', animation: 'fadeUp .9s ease both' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#00ff9f', display: 'inline-block', animation: 'pulse 1.8s ease-in-out infinite' }}></span>
          <span style={{ fontFamily: "'Space Mono',monospace", color: '#00ff9f', fontSize: '11px', letterSpacing: '4px' }}>AVAILABLE FOR OPPORTUNITIES</span>
        </div>
        <div style={{ fontFamily: "'Space Mono',monospace", color: '#445566', fontSize: '13px', marginBottom: '12px', fontStyle: 'italic' }}>// Frontend Developer · Tiruppur, Tamil Nadu</div>
        <h1 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(3rem,8vw,6rem)', color: '#fff', lineHeight: 1.05, letterSpacing: '-2px', marginBottom: '4px' }}>Karthikeyan</h1>
        <h1 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(3rem,8vw,6rem)', color: '#00e5ff', lineHeight: 1.05, letterSpacing: '-2px', marginBottom: '24px', animation: 'glowT 3s ease-in-out infinite' }}>G</h1>
        <div style={{ height: '44px', display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
          <span id="typed" ref={typedRef} style={{ fontFamily: "'Space Mono',monospace", fontSize: 'clamp(.9rem,2.2vw,1.2rem)', color: '#00ff9f' }}></span>
          <span style={{ animation: 'blink 1s step-end infinite', color: '#00e5ff', marginLeft: '2px' }}>▊</span>
        </div>
        <p style={{ fontFamily: "'Sora',sans-serif", color: '#6677aa', fontSize: '15px', lineHeight: 1.9, maxWidth: '500px', marginBottom: '40px' }}>
          3+ years crafting high-performance web interfaces with React.js &amp; SolidJS. Turning complex requirements into elegant, pixel-perfect experiences.
        </p>
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '52px' }}>
          <a href="mailto:santhoshkarthisk005@gmail.com" className="btn-s">GET IN TOUCH</a>
          <button className="btn" onClick={() => onScroll('experience')}>VIEW EXPERIENCE ↓</button>
        </div>
        <div style={{ display: 'flex', gap: '44px', paddingTop: '28px', borderTop: '1px solid #00e5ff15' }}>
          <div><div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '2.2rem', color: '#00e5ff', lineHeight: 1 }}>3+</div><div style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', color: '#445566', letterSpacing: '1px', marginTop: '6px' }}>YEARS EXP</div></div>
          <div><div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '2.2rem', color: '#00e5ff', lineHeight: 1 }}>6+</div><div style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', color: '#445566', letterSpacing: '1px', marginTop: '6px' }}>TECH STACKS</div></div>
          <div><div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '2.2rem', color: '#00e5ff', lineHeight: 1 }}>4</div><div style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', color: '#445566', letterSpacing: '1px', marginTop: '6px' }}>COMPANIES</div></div>
        </div>
      </div>

      {/* Floating tags */}
      <div style={{ position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '14px', zIndex: 2 }}>
        <div style={{ background: '#060d1a', border: '1px solid #00e5ff35', color: '#00e5ff', padding: '9px 20px', fontFamily: "'Space Mono',monospace", fontSize: '12px', letterSpacing: '1px', animation: 'floatA 2.8s ease-in-out infinite' }}>React.js</div>
        <div style={{ background: '#060d1a', border: '1px solid #00e5ff35', color: '#00e5ff', padding: '9px 20px', fontFamily: "'Space Mono',monospace", fontSize: '12px', letterSpacing: '1px', animation: 'floatB 3.2s ease-in-out infinite', animationDelay: '.4s' }}>TypeScript</div>
        <div style={{ background: '#060d1a', border: '1px solid #00e5ff35', color: '#00e5ff', padding: '9px 20px', fontFamily: "'Space Mono',monospace", fontSize: '12px', letterSpacing: '1px', animation: 'floatA 2.5s ease-in-out infinite', animationDelay: '.8s' }}>SolidJS</div>
        <div style={{ background: '#060d1a', border: '1px solid #00e5ff35', color: '#00e5ff', padding: '9px 20px', fontFamily: "'Space Mono',monospace", fontSize: '12px', letterSpacing: '1px', animation: 'floatB 3.5s ease-in-out infinite', animationDelay: '1.2s' }}>Redux Toolkit</div>
        <div style={{ background: '#060d1a', border: '1px solid #00e5ff35', color: '#00e5ff', padding: '9px 20px', fontFamily: "'Space Mono',monospace", fontSize: '12px', letterSpacing: '1px', animation: 'floatA 2.9s ease-in-out infinite', animationDelay: '1.6s' }}>Tailwind CSS</div>
        <div style={{ background: '#060d1a', border: '1px solid #00e5ff35', color: '#00e5ff', padding: '9px 20px', fontFamily: "'Space Mono',monospace", fontSize: '12px', letterSpacing: '1px', animation: 'floatB 3.1s ease-in-out infinite', animationDelay: '2s' }}>REST APIs</div>
      </div>
    </section>
  );
};

export default Hero;
