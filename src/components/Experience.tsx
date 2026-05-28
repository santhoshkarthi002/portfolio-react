import React from 'react';

const Experience: React.FC = () => {
  return (
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
  );
};

export default Experience;
