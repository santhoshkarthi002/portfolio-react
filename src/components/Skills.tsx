import React from 'react';
import Reveal from './Reveal';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="sec">
      <div className="scan"></div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Reveal>
          <div className="slab">// 02 — SKILLS</div>
          <h2 className="sh">Technical Arsenal</h2>
          <div className="line"></div>
        </Reveal>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: '20px', marginBottom: '28px' }}>
          <Reveal delay={0.1}>
            <div className="skill-card">
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', color: '#00e5ff55', letterSpacing: '2px', marginBottom: '6px' }}>01</div>
              <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 600, fontSize: '14px', color: '#ddeeff', marginBottom: '14px' }}>Frameworks &amp; Libraries</div>
              <span className="tag">React JS</span><span className="tag">SolidJS</span><span className="tag">Next JS</span><span className="tag">React Hook Form</span>
            </div>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="skill-card">
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', color: '#00e5ff55', letterSpacing: '2px', marginBottom: '6px' }}>02</div>
              <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 600, fontSize: '14px', color: '#ddeeff', marginBottom: '14px' }}>UI &amp; Styling</div>
              <span className="tag">HTML5</span><span className="tag">CSS3</span><span className="tag">Material UI</span><span className="tag">Tailwind CSS</span><span className="tag">Bootstrap</span>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="skill-card">
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', color: '#00e5ff55', letterSpacing: '2px', marginBottom: '6px' }}>03</div>
              <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 600, fontSize: '14px', color: '#ddeeff', marginBottom: '14px' }}>Languages</div>
              <span className="tag">JavaScript ES6+</span><span className="tag">TypeScript</span>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="skill-card">
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', color: '#00e5ff55', letterSpacing: '2px', marginBottom: '6px' }}>04</div>
              <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 600, fontSize: '14px', color: '#ddeeff', marginBottom: '14px' }}>State &amp; Data</div>
              <span className="tag">Redux Toolkit</span><span className="tag">React Query</span><span className="tag">REST APIs</span>
            </div>
          </Reveal>
          <Reveal delay={0.5}>
            <div className="skill-card">
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', color: '#00e5ff55', letterSpacing: '2px', marginBottom: '6px' }}>05</div>
              <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 600, fontSize: '14px', color: '#ddeeff', marginBottom: '14px' }}>Data Visualization</div>
              <span className="tag">Apache ECharts</span><span className="tag">Recharts</span>
            </div>
          </Reveal>
          <Reveal delay={0.6}>
            <div className="skill-card">
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', color: '#00e5ff55', letterSpacing: '2px', marginBottom: '6px' }}>06</div>
              <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 600, fontSize: '14px', color: '#ddeeff', marginBottom: '14px' }}>Dev Tools</div>
              <span className="tag">Git</span><span className="tag">GitHub</span><span className="tag">GitLab</span><span className="tag">VS Code</span><span className="tag">Chrome DevTools</span>
            </div>
          </Reveal>
        </div>
        
        <Reveal delay={0.7} width="100%">
          <div style={{ background: '#060d1a', border: '1px solid #00ff9f1e', borderRadius: '12px', padding: '28px' }}>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', color: '#00ff9f77', letterSpacing: '2px', marginBottom: '14px' }}>SOFT SKILLS</div>
            <span className="tag-g">Attention to Detail</span>
            <span className="tag-g">Cross-functional Collaboration</span>
            <span className="tag-g">Problem Solving</span>
            <span className="tag-g">Self-motivated Learner</span>
            <span className="tag-g">Agile / Scrum</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Skills;
