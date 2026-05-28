import React from 'react';
import Reveal from './Reveal';

const Education: React.FC = () => {
  return (
    <section id="education" className="sec">
      <Reveal>
        <div className="slab">// 04 — EDUCATION</div>
        <h2 className="sh">Academic Foundation</h2>
        <div className="line"></div>
      </Reveal>
      
      <Reveal width="100%" delay={0.2}>
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
      </Reveal>
    </section>
  );
};

export default Education;
