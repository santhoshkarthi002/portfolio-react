import React from 'react';
import Reveal from './Reveal';
import { experiences } from '../data/experience';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="sec-dark">
      <div className="grid-bg" style={{ opacity: .45 }}></div>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Reveal>
          <div className="slab">// 03 — EXPERIENCE</div>
          <h2 className="sh">Career Journey</h2>
          <div className="line"></div>
        </Reveal>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
          {experiences.map((exp, index) => (
            <Reveal key={exp.id} width="100%" delay={index * 0.1}>
              <div style={{ display: 'flex', gap: '22px', alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '8px', flexShrink: 0 }}>
                  <div style={{ 
                    width: '14px', 
                    height: '14px', 
                    borderRadius: '50%', 
                    background: exp.isCurrent ? 'var(--accent-g)' : 'rgba(var(--accent-rgb), 0.2)', 
                    border: '2px solid ' + (exp.isCurrent ? 'var(--accent-g)' : 'var(--accent)'),
                    boxShadow: exp.isCurrent ? '0 0 14px rgba(var(--accent-g-rgb), 0.5)' : 'none'
                  }}></div>
                  {index !== experiences.length - 1 && (
                    <div style={{ width: '1px', minHeight: '80px', flex: 1, background: 'linear-gradient(to bottom,rgba(var(--accent-rgb), 0.2),transparent)', marginTop: '8px' }}></div>
                  )}
                </div>
                <div className={`tl-card ${exp.isCurrent ? 'cur' : ''}`}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
                    <div>
                      <h3 style={{ fontFamily: "'Sora',sans-serif", fontWeight: 700, fontSize: '17px', color: 'var(--text-main)', marginBottom: '5px' }}>{exp.role}</h3>
                      <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '13px', color: 'var(--accent)' }}>{exp.company}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                      <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '11px', color: 'var(--text-dim)', background: 'rgba(var(--accent-rgb), 0.05)', border: '1px solid var(--border)', padding: '3px 10px', borderRadius: '4px' }}>{exp.duration}</span>
                      {exp.isCurrent && (
                        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', color: 'var(--accent-g)', background: 'rgba(var(--accent-g-rgb), 0.1)', border: '1px solid rgba(var(--accent-g-rgb), 0.3)', padding: '2px 8px', borderRadius: '4px' }}>● CURRENT</span>
                      )}
                    </div>
                  </div>
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {exp.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} style={{ display: 'flex', gap: '10px', marginBottom: rIdx === exp.responsibilities.length - 1 ? 0 : '8px', fontFamily: "'Sora',sans-serif", fontSize: '13.5px', color: 'var(--text-dim)', lineHeight: 1.7 }}>
                        <span style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '3px', fontSize: '10px' }}>▸</span>
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
