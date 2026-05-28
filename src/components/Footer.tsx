import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{ padding: '22px 8%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #00e5ff0e', background: '#04080f' }}>
      <span style={{ fontFamily: "'Space Mono',monospace", color: '#00e5ff', fontSize: '16px', fontWeight: 700 }}>&lt;KG /&gt;</span>
      <span style={{ fontFamily: "'Space Mono',monospace", fontSize: '10px', color: '#334455', letterSpacing: '2px' }}>© 2025 KARTHIKEYAN G · FRONTEND DEVELOPER</span>
    </footer>
  );
};

export default Footer;
