import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import './App.css'

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const typedRef = useRef<HTMLSpanElement>(null)
  const heroRef = useRef<HTMLElement>(null)

  const scroll2 = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

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
    <>
      {/* NAV */}
      <nav style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 8%', background: 'linear-gradient(to bottom,#04080fee,transparent)', position: 'sticky', top: 0, zIndex: 100, backdropFilter: 'blur(8px)' }}>
        <div style={{ fontFamily: "'Space Mono',monospace", color: '#00e5ff', fontSize: '20px', fontWeight: 700, cursor: 'pointer' }} onClick={() => scroll2('hero')}>&lt;|KG|&gt;</div>
        <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
          <button className="nav-link" onClick={() => scroll2('skills')}>SKILLS</button>
          <button className="nav-link" onClick={() => scroll2('experience')}>EXPERIENCE</button>
          <button className="nav-link" onClick={() => scroll2('education')}>EDUCATION</button>
          <button className="nav-link" onClick={() => scroll2('contact')}>CONTACT</button>
          <a href="mailto:santhoshkarthisk005@gmail.com" className="btn" style={{ padding: '8px 18px', fontSize: '11px' }}>HIRE ME</a>
        </div>
      </nav>

      {/* HERO */}
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
            <button className="btn" onClick={() => scroll2('experience')}>VIEW EXPERIENCE ↓</button>
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

      {/* SKILLS */}
      <section id="skills" className="sec">
        <div className="scan"></div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="slab">// 02 — SKILLS</div>
          <h2 className="sh">Technical Arsenal</h2>
          <div className="line"></div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '20px', marginBottom: '28px' }}>
            <div className="skill-card">
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', color: '#00e5ff55', letterSpacing: '2px', marginBottom: '6px' }}>01</div>
              <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 600, fontSize: '14px', color: '#ddeeff', marginBottom: '14px' }}>Frameworks &amp; Libraries</div>
              <span className="tag">React JS</span><span className="tag">SolidJS</span><span className="tag">Next JS</span><span className="tag">React Hook Form</span>
            </div>
            <div className="skill-card">
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', color: '#00e5ff55', letterSpacing: '2px', marginBottom: '6px' }}>02</div>
              <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 600, fontSize: '14px', color: '#ddeeff', marginBottom: '14px' }}>UI &amp; Styling</div>
              <span className="tag">HTML5</span><span className="tag">CSS3</span><span className="tag">Material UI</span><span className="tag">Tailwind CSS</span><span className="tag">Bootstrap</span>
            </div>
            <div className="skill-card">
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', color: '#00e5ff55', letterSpacing: '2px', marginBottom: '6px' }}>03</div>
              <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 600, fontSize: '14px', color: '#ddeeff', marginBottom: '14px' }}>Languages</div>
              <span className="tag">JavaScript ES6+</span><span className="tag">TypeScript</span>
            </div>
            <div className="skill-card">
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', color: '#00e5ff55', letterSpacing: '2px', marginBottom: '6px' }}>04</div>
              <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 600, fontSize: '14px', color: '#ddeeff', marginBottom: '14px' }}>State &amp; Data</div>
              <span className="tag">Redux Toolkit</span><span className="tag">React Query</span><span className="tag">REST APIs</span>
            </div>
            <div className="skill-card">
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', color: '#00e5ff55', letterSpacing: '2px', marginBottom: '6px' }}>05</div>
              <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 600, fontSize: '14px', color: '#ddeeff', marginBottom: '14px' }}>Data Visualization</div>
              <span className="tag">Apache ECharts</span><span className="tag">Recharts</span>
            </div>
            <div className="skill-card">
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', color: '#00e5ff55', letterSpacing: '2px', marginBottom: '6px' }}>06</div>
              <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 600, fontSize: '14px', color: '#ddeeff', marginBottom: '14px' }}>Dev Tools</div>
              <span className="tag">Git</span><span className="tag">GitHub</span><span className="tag">GitLab</span><span className="tag">VS Code</span><span className="tag">Chrome DevTools</span>
            </div>
          </div>
          <div style={{ background: '#060d1a', border: '1px solid #00ff9f1e', borderRadius: '12px', padding: '28px' }}>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', color: '#00ff9f77', letterSpacing: '2px', marginBottom: '14px' }}>SOFT SKILLS</div>
            <span className="tag-g">Attention to Detail</span>
            <span className="tag-g">Cross-functional Collaboration</span>
            <span className="tag-g">Problem Solving</span>
            <span className="tag-g">Self-motivated Learner</span>
            <span className="tag-g">Agile / Scrum</span>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="sec-dark">
        <div className="grid-bg" style={{ opacity: .45 }}></div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="slab">// 03 — EXPERIENCE</div>
          <h2 className="sh">Career Journey</h2>
          <div className="line"></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

            <div style={{ display: 'flex', gap: '22px', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '8px', flexShrink: 0 }}>
                <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#00ff9f', border: '2px solid #00ff9f', boxShadow: '0 0 14px #00ff9f77' }}></div>
                <div style={{ width: '1px', minHeight: '80px', flex: 1, background: 'linear-gradient(to bottom,#00e5ff30,transparent)', marginTop: '8px' }}></div>
              </div>
              <div className="tl-card cur">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
                  <div>
                    <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: '17px', color: '#eef2ff', marginBottom: '5px' }}>Front End Developer</h3>
                    <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '13px', color: '#00e5ff' }}>Praxio</div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '11px', color: '#556677', background: '#00e5ff08', border: '1px solid #00e5ff18', padding: '3px 10px', borderRadius: '4px' }}>Jul 2022 – Present</span>
                    <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', color: '#00ff9f', background: '#00ff9f10', border: '1px solid #00ff9f30', padding: '2px 8px', borderRadius: '4px' }}>● CURRENT</span>
                  </div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ display: 'flex', gap: '10px', marginBottom: '8px', fontFamily: "'Sora',sans-serif", fontSize: '13.5px', color: '#778899', lineHeight: 1.7 }}><span style={{ color: '#00e5ff', flexShrink: 0, marginTop: '3px', fontSize: '10px' }}>▸</span>Build scalable web apps with React.js &amp; SolidJS with focus on performance</li>
                  <li style={{ display: 'flex', gap: '10px', marginBottom: '8px', fontFamily: "'Sora',sans-serif", fontSize: '13.5px', color: '#778899', lineHeight: 1.7 }}><span style={{ color: '#00e5ff', flexShrink: 0, marginTop: '3px', fontSize: '10px' }}>▸</span>Collaborate with UI/UX designers, backend engineers, and product managers</li>
                  <li style={{ display: 'flex', gap: '10px', marginBottom: '8px', fontFamily: "'Sora',sans-serif", fontSize: '13.5px', color: '#778899', lineHeight: 1.7 }}><span style={{ color: '#00e5ff', flexShrink: 0, marginTop: '3px', fontSize: '10px' }}>▸</span>Conduct code reviews; apply lazy loading &amp; memoization optimizations</li>
                  <li style={{ display: 'flex', gap: '10px', fontFamily: "'Sora',sans-serif", fontSize: '13.5px', color: '#778899', lineHeight: 1.7 }}><span style={{ color: '#00e5ff', flexShrink: 0, marginTop: '3px', fontSize: '10px' }}>▸</span>Active in Agile ceremonies: sprint planning, standups, retrospectives</li>
                </ul>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '22px', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '8px', flexShrink: 0 }}>
                <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#00e5ff33', border: '2px solid #00e5ff' }}></div>
                <div style={{ width: '1px', minHeight: '80px', flex: 1, background: 'linear-gradient(to bottom,#00e5ff30,transparent)', marginTop: '8px' }}></div>
              </div>
              <div className="tl-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
                  <div>
                    <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: '17px', color: '#eef2ff', marginBottom: '5px' }}>Front End Developer</h3>
                    <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '13px', color: '#00e5ff' }}>Enthu Technology Solutions India Pvt Ltd</div>
                  </div>
                  <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '11px', color: '#556677', background: '#00e5ff08', border: '1px solid #00e5ff18', padding: '3px 10px', borderRadius: '4px', alignSelf: 'flex-start' }}>Mar 2022 – Jun 2022</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ display: 'flex', gap: '10px', marginBottom: '8px', fontFamily: "'Sora',sans-serif", fontSize: '13.5px', color: '#778899', lineHeight: 1.7 }}><span style={{ color: '#00e5ff', flexShrink: 0, marginTop: '3px', fontSize: '10px' }}>▸</span>Developed real-time IoT dashboards using charting libraries</li>
                  <li style={{ display: 'flex', gap: '10px', marginBottom: '8px', fontFamily: "'Sora',sans-serif", fontSize: '13.5px', color: '#778899', lineHeight: 1.7 }}><span style={{ color: '#00e5ff', flexShrink: 0, marginTop: '3px', fontSize: '10px' }}>▸</span>Built role-based access control user management modules</li>
                  <li style={{ display: 'flex', gap: '10px', fontFamily: "'Sora',sans-serif", fontSize: '13.5px', color: '#778899', lineHeight: 1.7 }}><span style={{ color: '#00e5ff', flexShrink: 0, marginTop: '3px', fontSize: '10px' }}>▸</span>Created pixel-perfect UI implementations aligned with modern design systems</li>
                </ul>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '22px', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '8px', flexShrink: 0 }}>
                <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#00e5ff33', border: '2px solid #00e5ff' }}></div>
                <div style={{ width: '1px', minHeight: '80px', flex: 1, background: 'linear-gradient(to bottom,#00e5ff30,transparent)', marginTop: '8px' }}></div>
              </div>
              <div className="tl-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
                  <div>
                    <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: '17px', color: '#eef2ff', marginBottom: '5px' }}>Front End Developer Trainee</h3>
                    <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '13px', color: '#00e5ff' }}>Abytz Technology Solutions India Pvt Ltd</div>
                  </div>
                  <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '11px', color: '#556677', background: '#00e5ff08', border: '1px solid #00e5ff18', padding: '3px 10px', borderRadius: '4px', alignSelf: 'flex-start' }}>Dec 2021 – Mar 2022</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ display: 'flex', gap: '10px', marginBottom: '8px', fontFamily: "'Sora',sans-serif", fontSize: '13.5px', color: '#778899', lineHeight: 1.7 }}><span style={{ color: '#00e5ff', flexShrink: 0, marginTop: '3px', fontSize: '10px' }}>▸</span>Maintained and enhanced existing React.js applications</li>
                  <li style={{ display: 'flex', gap: '10px', fontFamily: "'Sora',sans-serif", fontSize: '13.5px', color: '#778899', lineHeight: 1.7 }}><span style={{ color: '#00e5ff', flexShrink: 0, marginTop: '3px', fontSize: '10px' }}>▸</span>Learned component lifecycle, prop drilling, and Redux patterns</li>
                </ul>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '22px', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '8px', flexShrink: 0 }}>
                <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#00e5ff33', border: '2px solid #00e5ff' }}></div>
              </div>
              <div className="tl-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
                  <div>
                    <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: '17px', color: '#eef2ff', marginBottom: '5px' }}>Software Developer Trainee</h3>
                    <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '13px', color: '#00e5ff' }}>Aja Technologiess Pvt Ltd</div>
                  </div>
                  <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '11px', color: '#556677', background: '#00e5ff08', border: '1px solid #00e5ff18', padding: '3px 10px', borderRadius: '4px', alignSelf: 'flex-start' }}>Oct 2020 – Jan 2021</span>
                </div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ display: 'flex', gap: '10px', marginBottom: '8px', fontFamily: "'Sora',sans-serif", fontSize: '13.5px', color: '#778899', lineHeight: 1.7 }}><span style={{ color: '#00e5ff', flexShrink: 0, marginTop: '3px', fontSize: '10px' }}>▸</span>Participated in full dev cycle: coding, testing, debugging under senior mentorship</li>
                  <li style={{ display: 'flex', gap: '10px', fontFamily: "'Sora',sans-serif", fontSize: '13.5px', color: '#778899', lineHeight: 1.7 }}><span style={{ color: '#00e5ff', flexShrink: 0, marginTop: '3px', fontSize: '10px' }}>▸</span>Applied PHP-based development and database interaction best practices</li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* EDUCATION */}
      <section id="education" className="sec">
        <div className="slab">// 04 — EDUCATION</div>
        <h2 className="sh">Academic Foundation</h2>
        <div className="line"></div>
        <div style={{ background: '#060d1a', border: '1px solid #00e5ff1e', borderRadius: '16px', padding: '44px', maxWidth: '720px', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '220px', height: '220px', background: 'radial-gradient(circle,#00e5ff0c,transparent 70%)', pointerEvents: 'none' }}></div>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'linear-gradient(to bottom,#00e5ff,#00ff9f)' }}></div>
          <div style={{ paddingLeft: '24px' }}>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '11px', color: '#00e5ff55', letterSpacing: '3px', marginBottom: '14px' }}>B.TECH — INFORMATION TECHNOLOGY</div>
            <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '26px', color: '#eef2ff', marginBottom: '8px' }}>Anna University</h3>
            <div style={{ fontFamily: "'Sora',sans-serif", fontSize: '14px', color: '#778899', marginBottom: '32px' }}>Erode, Tamil Nadu</div>
            <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', color: '#445566', letterSpacing: '1px', marginBottom: '8px' }}>DURATION</div>
                <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 600, color: '#00e5ff', fontSize: '15px' }}>Jun 2016 – Apr 2020</div>
              </div>
              <div>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', color: '#445566', letterSpacing: '1px', marginBottom: '8px' }}>CGPA</div>
                <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, color: '#00ff9f', fontSize: '1.8rem', lineHeight: 1 }}>6.58 <span style={{ fontSize: '14px', color: '#445566', fontWeight: 400 }}>/ 10.0</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="sec-dark">
        <div className="grid-bg" style={{ opacity: .35 }}></div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '680px' }}>
          <div className="slab">// 05 — CONTACT</div>
          <h2 className="sh">Let's Build Together</h2>
          <div className="line"></div>
          <p style={{ fontFamily: "'Sora',sans-serif", color: '#6677aa', fontSize: '15px', lineHeight: 1.9, marginBottom: '48px' }}>Looking for a frontend developer who delivers pixel-perfect, high-performance UIs? Open to exciting full-time roles and collaborations.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', marginBottom: '48px' }}>
            <a href="mailto:santhoshkarthisk005@gmail.com" className="cl"><span style={{ color: '#00e5ff', fontSize: '20px', lineHeight: 1 }}>✉</span> santhoshkarthisk005@gmail.com</a>
            <div className="cl"><span style={{ color: '#00e5ff', fontSize: '20px', lineHeight: 1 }}>☎</span> +91 9092314029</div>
            <div className="cl"><span style={{ color: '#00e5ff', fontSize: '20px', lineHeight: 1 }}>◎</span> Tiruppur, Tamil Nadu, India</div>
          </div>
          <a href="mailto:santhoshkarthisk005@gmail.com" className="btn-s">SEND A MESSAGE →</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: '22px 8%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #00e5ff0e', background: '#04080f' }}>
        <span style={{ fontFamily: "'Space Mono',monospace", color: '#00e5ff', fontSize: '16px', fontWeight: 700 }}>&lt;KG /&gt;</span>
        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', color: '#334455', letterSpacing: '2px' }}>© 2025 KARTHIKEYAN G · FRONTEND DEVELOPER</span>
      </footer>
    </>
  )
}

export default App
