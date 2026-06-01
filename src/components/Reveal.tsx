import React, { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  width?: 'fit-content' | '100%';
  height?: 'fit-content' | '100%';
  delay?: number;
}

const Reveal: React.FC<RevealProps> = ({ children, width = 'fit-content', height = 'fit-content', delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width,
        height,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1) rotate(0deg)' : 'translateY(50px) scale(0.95) rotate(1deg)',
        transition: `all 0.8s cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
};

export default Reveal;
