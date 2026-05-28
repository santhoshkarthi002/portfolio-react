import React, { useState } from 'react';
import { heroData } from '../data/hero';

const Footer: React.FC = () => {
  return (
    <footer style={{ padding: '22px 8%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #00e5ff0e', background: '#04080f', flexWrap: 'wrap', gap: '20px' }}>
      <img 
        src="/karthik-logo.png" 
        alt={`${heroData.name} ${heroData.surname} Logo`} 
        style={{ height: '50px', width: 'auto', opacity: 0.9 }} 
      />
      <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', color: '#334455', letterSpacing: '2px' }}>© 2025 {heroData.name.toUpperCase()} {heroData.surname.toUpperCase()} · FRONTEND DEVELOPER</span>
    </footer>
  );
};

export default Footer;
