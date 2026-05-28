import React from 'react';
import Reveal from './Reveal';
import { educationData } from '../data/education';

const Education: React.FC = () => {
  return (
    <section id="education" className="sec">
      <Reveal>
        <div className="slab">// 04 — EDUCATION</div>
        <h2 className="sh">Academic Foundation</h2>
        <div className="line"></div>
      </Reveal>
      
      <Reveal width="100%" delay={0.2}>
        <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '16px', padding: '44px', maxWidth: '720px', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 40px var(--shadow)' }}>
          <div style={{ position: 'absolute', top: '-60px', right: '-60px', width: '220px', height: '220px', background: 'radial-gradient(circle,rgba(var(--accent-rgb), 0.1),transparent 70%)', pointerEvents: 'none' }}></div>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'linear-gradient(to bottom,var(--accent),var(--accent-g))' }}></div>
          <div style={{ paddingLeft: '24px' }}>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '11px', color: 'var(--accent)', opacity: 0.5, letterSpacing: '3px', marginBottom: '14px' }}>{educationData.degree}</div>
            <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, fontSize: '26px', color: 'var(--text-main)', marginBottom: '8px' }}>{educationData.institution}</h3>
            <div style={{ fontFamily: "'Sora',sans-serif", fontSize: '14px', color: 'var(--text-dim)', marginBottom: '32px' }}>{educationData.location}</div>
            <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '8px' }}>DURATION</div>
                <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 600, color: 'var(--accent)', fontSize: '15px' }}>{educationData.duration}</div>
              </div>
              <div>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '1px', marginBottom: '8px' }}>CGPA</div>
                <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 800, color: 'var(--accent-g)', fontSize: '1.8rem', lineHeight: 1 }}>{educationData.cgpa} <span style={{ fontSize: '14px', color: 'var(--text-muted)', fontWeight: 400 }}>/ {educationData.maxCgpa}</span></div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default Education;
