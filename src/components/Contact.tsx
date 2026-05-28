import React from 'react';
import Reveal from './Reveal';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="sec-dark">
      <div className="grid-bg" style={{ opacity: .35 }}></div>
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '680px' }}>
        <Reveal>
          <div className="slab">// 05 — CONTACT</div>
          <h2 className="sh">Let's Build Together</h2>
          <div className="line"></div>
        </Reveal>
        
        <Reveal delay={0.2}>
          <p style={{ fontFamily: "'Sora',sans-serif", color: '#6677aa', fontSize: '15px', lineHeight: 1.9, marginBottom: '48px' }}>Looking for a frontend developer who delivers pixel-perfect, high-performance UIs? Open to exciting full-time roles and collaborations.</p>
        </Reveal>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', marginBottom: '48px' }}>
          <Reveal delay={0.3}>
            <a href="mailto:santhoshkarthisk005@gmail.com" className="cl"><span style={{ color: '#00e5ff', fontSize: '20px', lineHeight: 1 }}>✉</span> santhoshkarthisk005@gmail.com</a>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="cl"><span style={{ color: '#00e5ff', fontSize: '20px', lineHeight: 1 }}>☎</span> +91 9092314029</div>
          </Reveal>
          <Reveal delay={0.5}>
            <div className="cl"><span style={{ color: '#00e5ff', fontSize: '20px', lineHeight: 1 }}>◎</span> Tiruppur, Tamil Nadu, India</div>
          </Reveal>
        </div>
        
        <Reveal delay={0.6}>
          <a href="mailto:santhoshkarthisk005@gmail.com" className="btn-s">SEND A MESSAGE →</a>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
