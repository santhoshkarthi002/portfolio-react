import React from 'react';
import { navLinks } from '../data/navbar';
import { contactData } from '../data/contact';

interface NavbarProps {
  onScroll: (id: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onScroll }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="flex items-center justify-between px-[8%] py-2.5 bg-white/85 dark:bg-[#04080f]/85 sticky top-0 left-0 right-0 z-[100] backdrop-blur-md border-b border-gray-200 dark:border-[#00e5ff1a] w-full box-border">
      <div 
        className="cursor-pointer flex items-center"
        onClick={scrollToTop}
      >
        <img 
          src="/karthik-logo.png" 
          alt="Karthikeyan Logo" 
          className="h-[65px] w-auto object-contain"
        />
      </div>
      <div className="flex gap-7 items-center">
        {navLinks.map((link) => (
          <button 
            key={link.id} 
            className="text-slate-600 dark:text-slate-400 font-mono text-xs tracking-wider cursor-pointer transition-all duration-300 bg-none border-none p-0 relative hover:text-cyan-600 dark:hover:text-[#00e5ff] after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-cyan-500 dark:after:bg-[#00e5ff] after:transition-all after:duration-300 hover:after:w-full" 
            onClick={() => onScroll(link.id)}
          >
            {link.label}
          </button>
        ))}
        <a 
          href={`mailto:${contactData.email}`} 
          className="bg-transparent border border-cyan-500 dark:border-[#00e5ff] text-cyan-600 dark:text-[#00e5ff] font-mono text-[11px] tracking-[1.5px] px-[18px] py-2 cursor-pointer transition-all duration-300 no-underline inline-block relative overflow-hidden hover:bg-cyan-50 dark:hover:bg-[#00e5ff18] hover:shadow-[0_0_28px_rgba(0,229,255,0.16)] hover:-translate-y-0.5"
        >
          HIRE ME
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
