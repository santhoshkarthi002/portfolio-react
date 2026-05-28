import React from 'react';
import Reveal from './Reveal';
import { technicalSkills, softSkills } from '../data/skills';

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
          {technicalSkills.map((category, index) => (
            <Reveal key={category.id} delay={0.1 * (index + 1)} width="100%" height="100%">
              <div className="skill-card">
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', color: 'var(--accent)', opacity: 0.5, letterSpacing: '2px', marginBottom: '6px' }}>{category.id}</div>
                <div style={{ fontFamily: "'Sora',sans-serif", fontWeight: 600, fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '14px' }}>{category.title}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px' }}>
                  {category.skills.map((skill) => (
                    <span key={skill} className="tag">{skill}</span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        
        <Reveal delay={0.7} width="100%">
          <div style={{ background: 'var(--card-bg)', border: '1px solid var(--border)', borderRadius: '12px', padding: '28px', boxShadow: '0 10px 30px var(--shadow)' }}>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', color: 'var(--accent-g)', opacity: 0.7, letterSpacing: '2px', marginBottom: '14px' }}>SOFT SKILLS</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px' }}>
              {softSkills.map((skill) => (
                <span key={skill} className="tag-g">{skill}</span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Skills;
