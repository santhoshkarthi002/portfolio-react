import React from 'react';

const Contact: React.FC = () => {
  return (
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
  );
};

export default Contact;
