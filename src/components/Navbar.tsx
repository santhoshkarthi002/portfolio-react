import React from 'react';

interface NavbarProps {
  onScroll: (id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onScroll }) => {
  return (
    <nav style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      padding: '22px 8%', 
      background: 'linear-gradient(to bottom,#04080fee,transparent)', 
      position: 'sticky', 
      top: 0, 
      zIndex: 100, 
      backdropFilter: 'blur(8px)' 
    }}>
      <div 
        style={{ fontFamily: "'Space Mono',monospace", color: '#00e5ff', fontSize: '20px', fontWeight: 700, cursor: 'pointer' }} 
        onClick={() => onScroll('hero')}
      >
        &lt;|KG|&gt;
      </div>
      <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
        <button className="nav-link" onClick={() => onScroll('skills')}>SKILLS</button>
        <button className="nav-link" onClick={() => onScroll('experience')}>EXPERIENCE</button>
        <button className="nav-link" onClick={() => onScroll('education')}>EDUCATION</button>
        <button className="nav-link" onClick={() => onScroll('contact')}>CONTACT</button>
        <a href="mailto:santhoshkarthisk005@gmail.com" className="btn" style={{ padding: '8px 18px', fontSize: '11px' }}>HIRE ME</a>
      </div>
    </nav>
  );
};

export default Navbar;
