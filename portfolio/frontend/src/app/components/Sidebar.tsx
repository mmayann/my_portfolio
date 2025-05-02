import { useState, useRef, useEffect } from 'react';

export default function Sidebar() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const sidebarRef = useRef<HTMLElement>(null); 

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsSidebarVisible(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsSidebarVisible(false);
      timeoutRef.current = null;
    }, 500); 
  };

  useEffect(() => {
    const sidebar = sidebarRef.current;
    if (sidebar) {
      const handleScroll = () => {

      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="relative">
      <div
        className="absolute top-0 left-0 h-full w-20"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 w-50 px-7 py-8 transition-opacity duration-300 ${
          isSidebarVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ul>
          <li className="mt-10"><a href="#hero">About me</a></li>
          <li className="mt-10"><a href="#works">Works</a></li>
          <li className="mt-10"><a href="#skills">Skill</a></li>
          <li className="mt-10"><a href="#contact">Contact</a></li>
        </ul>
      </aside>
    </div>
  );
}