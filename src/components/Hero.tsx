import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import Reveal from './Reveal';
import { heroData } from '../data/hero';

interface HeroProps {
  onScroll: (id: string) => void;
}

export type AnimationStyle = 'nodes' | 'cubes' | 'torus';

const Hero: React.FC<HeroProps> = ({ onScroll }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const typedRef = useRef<HTMLSpanElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [animStyle, setAnimStyle] = useState<AnimationStyle>('nodes');

  useEffect(() => {
    const handleStyleChange = (e: any) => {
      if (e.detail) setAnimStyle(e.detail);
    };
    window.addEventListener('change-animation', handleStyleChange);
    return () => window.removeEventListener('change-animation', handleStyleChange);
  }, []);

  useEffect(() => {
    // ── Typewriter ──────────────────────────────────────────────────────────────
    const ROLES = heroData.roles;
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

    timeoutId = setTimeout(typeWrite, 1200);

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

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // Dynamic Objects based on style
    const objects: THREE.Mesh[] = [];
    
    if (animStyle === 'nodes') {
      for (let i = 0; i < 55; i++) {
        const big = Math.random() > .75;
        const r = big ? .45 + Math.random() * .25 : .1 + Math.random() * .22;
        const g = new THREE.SphereGeometry(r, 8, 6);
        const c = big ? 0x00e5ff : Math.random() > .5 ? 0x00ff9f : 0x0055aa;
        const m = new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: big ? .95 : .5 });
        const mesh = new THREE.Mesh(g, m);
        mesh.position.set((Math.random() - .5) * 72, (Math.random() - .5) * 50, (Math.random() - .5) * 35);
        mesh.userData = { ph: Math.random() * Math.PI * 2, sp: .25 + Math.random() * .5 };
        objects.push(mesh);
        mainGroup.add(mesh);
      }
    } else if (animStyle === 'cubes') {
      for (let i = 0; i < 40; i++) {
        const s = 0.5 + Math.random() * 1.5;
        const g = new THREE.BoxGeometry(s, s, s);
        const c = Math.random() > .5 ? 0x00e5ff : 0x00ff9f;
        const m = new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.4, wireframe: true });
        const mesh = new THREE.Mesh(g, m);
        mesh.position.set((Math.random() - .5) * 60, (Math.random() - .5) * 40, (Math.random() - .5) * 20);
        mesh.userData = { rx: Math.random() * 0.02, ry: Math.random() * 0.02 };
        objects.push(mesh);
        mainGroup.add(mesh);
      }
    } else if (animStyle === 'torus') {
      const g = new THREE.TorusKnotGeometry(10, 3, 100, 16);
      const m = new THREE.MeshBasicMaterial({ color: 0x00e5ff, wireframe: true, transparent: true, opacity: 0.15 });
      const mesh = new THREE.Mesh(g, m);
      objects.push(mesh);
      mainGroup.add(mesh);
    }

    // Edges (only for nodes)
    const MAX = 120;
    const ea = new Float32Array(MAX * 6);
    const eg = new THREE.BufferGeometry();
    eg.setAttribute('position', new THREE.BufferAttribute(ea, 3));
    const el = new THREE.LineSegments(eg, new THREE.LineBasicMaterial({ color: 0x00e5ff, transparent: true, opacity: .13 }));
    if (animStyle === 'nodes') scene.add(el);

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

      if (animStyle === 'nodes') {
        objects.forEach(n => {
          // Mouse Repulsion
          const mX = mx * 35;
          const mY = my * 25;
          const distToMouse = Math.sqrt(Math.pow(n.position.x - mX, 2) + Math.pow(n.position.y - mY, 2));
          
          if (distToMouse < 12) {
            const angle = Math.atan2(n.position.y - mY, n.position.x - mX);
            const force = (12 - distToMouse) * 0.02;
            n.position.x += Math.cos(angle) * force;
            n.position.y += Math.sin(angle) * force;
          }

          n.position.x += Math.sin(t * n.userData.sp + n.userData.ph) * .007;
          n.position.y += Math.cos(t * n.userData.sp * .8 + n.userData.ph) * .007;
        });
        let cnt = 0;
        outer: for (let i = 0; i < objects.length; i++) {
          for (let j = i + 1; j < objects.length; j++) {
            if (cnt >= MAX) break outer;
            const d = objects[i].position.distanceTo(objects[j].position);
            if (d < 18) {
              const b = cnt * 6;
              ea[b] = objects[i].position.x;
              ea[b + 1] = objects[i].position.y;
              ea[b + 2] = objects[i].position.z;
              ea[b + 3] = objects[j].position.x;
              ea[b + 4] = objects[j].position.y;
              ea[b + 5] = objects[j].position.z;
              cnt++;
            }
          }
        }
        for (let i = cnt * 6; i < MAX * 6; i++) ea[i] = 0;
        eg.attributes.position.needsUpdate = true;
        el.geometry.setDrawRange(0, cnt * 2);
      } else if (animStyle === 'cubes') {
        objects.forEach(o => {
          o.rotation.x += o.userData.rx;
          o.rotation.y += o.userData.ry;
        });
      } else if (animStyle === 'torus') {
        if (objects[0]) {
          objects[0].rotation.x += 0.005;
          objects[0].rotation.y += 0.01;
        }
      }

      // Parallax Effect
      cam.position.x += (mx * 8 - cam.position.x) * .03;
      cam.position.y += (my * 6 - cam.position.y) * .03;
      cam.lookAt(0, 0, 0);
      
      // Group Rotation based on mouse
      mainGroup.rotation.y += (mx * 0.2 - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (-my * 0.2 - mainGroup.rotation.x) * 0.05;
      
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
  }, [animStyle]);

  return (
    <section id="hero" ref={heroRef} style={{ position: 'relative', height: '100vh', minHeight: '640px', display: 'flex', alignItems: 'center', padding: '0 8%', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }}></canvas>
      <div className="grid-bg" style={{ opacity: .55, zIndex: 1 }}></div>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 55% 50%,transparent 25%,#04080f 75%)', pointerEvents: 'none', zIndex: 1 }}></div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '220px', background: 'linear-gradient(to bottom,transparent,#04080f)', pointerEvents: 'none', zIndex: 1 }}></div>

      <div style={{ position: 'relative', zIndex: 2, maxWidth: '680px' }}>
        <Reveal delay={0.2}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '22px' }}>
            <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--accent-g)', display: 'inline-block', animation: 'pulse 1.8s ease-in-out infinite' }}></span>
            <span style={{ fontFamily: "'Space Mono',monospace", color: 'var(--accent-g)', fontSize: '11px', letterSpacing: '4px' }}>AVAILABLE FOR OPPORTUNITIES</span>
          </div>
        </Reveal>
        
        <Reveal delay={0.4}>
          <div style={{ fontFamily: "'Space Mono',monospace", color: 'var(--text-muted)', fontSize: '13px', marginBottom: '12px', fontStyle: 'italic' }}>// {heroData.location}</div>
          <h1 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(3rem,8vw,6rem)', color: 'var(--text-main)', lineHeight: 1.05, letterSpacing: '-2px', marginBottom: '4px' }}>{heroData.name}</h1>
          <h1 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: 'clamp(3rem,8vw,6rem)', color: 'var(--accent)', lineHeight: 1.05, letterSpacing: '-2px', marginBottom: '24px', animation: 'glowT 3s ease-in-out infinite' }}>{heroData.surname}</h1>
        </Reveal>

        <Reveal delay={0.6}>
          <div style={{ height: '44px', display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
            <span id="typed" ref={typedRef} style={{ fontFamily: "'Space Mono',monospace", fontSize: 'clamp(.9rem,2.2vw,1.2rem)', color: 'var(--accent-g)' }}></span>
            <span style={{ animation: 'blink 1s step-end infinite', color: 'var(--accent)', marginLeft: '2px' }}>▊</span>
          </div>
        </Reveal>

        <Reveal delay={0.8}>
          <p style={{ fontFamily: "'Sora',sans-serif", color: 'var(--text-dim)', fontSize: '15px', lineHeight: 1.9, maxWidth: '500px', marginBottom: '40px' }}>
            {heroData.description}
          </p>
        </Reveal>

        <Reveal delay={1.0}>
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', marginBottom: '52px' }}>
            <a href={`mailto:santhoshkarthisk005@gmail.com`} className="btn-s">GET IN TOUCH</a>
            <button className="btn" onClick={() => onScroll('experience')}>VIEW EXPERIENCE ↓</button>
          </div>
        </Reveal>

        <Reveal delay={1.2}>
          <div style={{ display: 'flex', gap: '44px', paddingTop: '28px', borderTop: '1px solid var(--border)' }}>
            {heroData.stats.map((stat, idx) => (
              <div key={idx}>
                <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '2.2rem', color: 'var(--accent)', lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '1px', marginTop: '6px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {/* Floating tags */}
      <div style={{ position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: '14px', zIndex: 2 }}>
        {heroData.floatingTags.map((tag, idx) => (
          <div key={tag} style={{ 
            background: 'var(--card-bg)', 
            border: '1px solid var(--border)', 
            color: 'var(--accent)', 
            padding: '9px 20px', 
            fontFamily: "'Space Mono',monospace", 
            fontSize: '12px', 
            letterSpacing: '1px', 
            boxShadow: '0 4px 12px var(--shadow)',
            animation: `${idx % 2 === 0 ? 'floatA' : 'floatB'} ${2.5 + Math.random()}s ease-in-out infinite`,
            animationDelay: `${idx * 0.4}s`
          }}>{tag}</div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
