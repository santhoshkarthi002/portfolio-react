import React from 'react';
import Reveal from './Reveal';
import { contactData } from '../data/contact';

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
          <p style={{ fontFamily: "'Sora',sans-serif", color: 'var(--text-dim)', fontSize: '15px', lineHeight: 1.9, marginBottom: '48px' }}>{contactData.description}</p>
        </Reveal>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '48px' }}>
          <Reveal delay={0.3}>
            <a href={`mailto:${contactData.email}`} className="cl"><span style={{ color: 'var(--accent)', fontSize: '20px', lineHeight: 1 }}>✉</span> {contactData.email}</a>
          </Reveal>
          <Reveal delay={0.4}>
            <div className="cl"><span style={{ color: 'var(--accent)', fontSize: '20px', lineHeight: 1 }}>☎</span> {contactData.phone} <span style={{ fontSize: '12px', color: 'var(--text-dim)' }}>(Primary)</span></div>
          </Reveal>
          {contactData.phoneSecondary && (
            <Reveal delay={0.45}>
              <div className="cl"><span style={{ color: 'var(--accent)', fontSize: '20px', lineHeight: 1 }}>☎</span> {contactData.phoneSecondary}</div>
            </Reveal>
          )}
          <Reveal delay={0.5}>
            <div className="cl"><span style={{ color: 'var(--accent)', fontSize: '20px', lineHeight: 1 }}>◎</span> {contactData.location}</div>
          </Reveal>
        </div>
        
        <Reveal delay={0.6}>
          <a href={`mailto:${contactData.email}`} className="btn-s">SEND A MESSAGE →</a>
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
