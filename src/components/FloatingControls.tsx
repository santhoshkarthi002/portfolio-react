import React, { useState } from 'react';

const FloatingControls: React.FC = () => {
  const [currentStyle, setCurrentStyle] = useState<'nodes' | 'cubes' | 'torus'>('nodes');
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const changeStyle = (style: 'nodes' | 'cubes' | 'torus') => {
    setCurrentStyle(style);
    window.dispatchEvent(new CustomEvent('change-animation', { detail: style }));
    setIsMenuOpen(false);
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="fixed bottom-[30px] left-[30px] flex flex-col gap-3 z-[1000]">
      <div className="relative">
        {isMenuOpen && (
          <div className="absolute bottom-[60px] left-0 bg-white dark:bg-[#060d1a] border border-gray-200 dark:border-[#00e5ff33] rounded-xl p-2 flex flex-col gap-1 min-w-[160px] shadow-2xl backdrop-blur-md animate-[slideUp_0.3s_cubic-bezier(0.4,0,0.2,1)] z-[1001]">
            {(['nodes', 'cubes', 'torus'] as const).map(style => (
              <button
                key={style}
                className={`px-4 py-2.5 rounded-lg font-mono text-xs cursor-pointer text-left transition-all duration-200 flex items-center justify-between
                  ${currentStyle === style 
                    ? 'text-cyan-600 dark:text-[#00e5ff] bg-cyan-50 dark:bg-[#00e5ff1a]' 
                    : 'text-slate-600 dark:text-white hover:bg-cyan-100 hover:text-cyan-800 dark:hover:bg-[#00e5ff] dark:hover:text-[#04080f]'
                  }`}
                onClick={() => changeStyle(style)}
              >
                <span>{style.toUpperCase()}</span>
                {currentStyle === style && <span>●</span>}
              </button>
            ))}
          </div>
        )}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`w-[50px] h-[50px] rounded-full p-0 flex items-center justify-center text-lg bg-white/80 dark:bg-[#060d1a]/80 backdrop-blur-sm shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)] transition-all
            ${isMenuOpen ? 'border-2 border-cyan-500 dark:border-[#00e5ff]' : 'border border-gray-200 dark:border-[#00e5ff33]'}`}
          title="Animation Settings"
        >
          🎨
        </button>
      </div>

      <button 
        onClick={toggleTheme}
        className="w-[50px] h-[50px] rounded-full p-0 flex items-center justify-center text-xl bg-white/80 dark:bg-[#060d1a]/80 backdrop-blur-sm shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)] border border-gray-200 dark:border-[#00e5ff33] transition-all"
        title="Toggle Theme"
      >
        {isDarkTheme ? '☀️' : '🌙'}
      </button>
    </div>
  );
};

export default FloatingControls;
