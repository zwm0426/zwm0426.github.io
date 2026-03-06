import React, { useState, useEffect } from 'react';
import { Code } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', type: 'route' },
    { name: 'About', href: '/#about', type: 'hash' },
    { name: 'News', href: '/news', type: 'route' },
    { name: 'Projects', href: '/projects', type: 'route' },
    { name: 'Teaching', href: '/teaching', type: 'route' },
    { name: 'Publications', href: '/publications', type: 'route' },
    { name: 'CV', href: '/cv', type: 'route' },
  ];

  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      const id = href.split('#')[1];
      if (currentPath === '/') {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled || currentPath !== '/' ? 'bg-white/80 backdrop-blur-md border-b border-zinc-200 py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <a href="/" className="text-xl font-semibold tracking-tight text-zinc-900">
          Kevin Zhao
        </a>
        
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            link.type === 'route' ? (
              <a
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition-colors ${
                  currentPath === link.href ? 'text-zinc-900' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                {link.name}
              </a>
            ) : (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleHashClick(e, link.href)}
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
              >
                {link.name}
              </a>
            )
          ))}
        </div>

        <div className="md:hidden">
           <button className="text-zinc-900">
             <Code size={24} />
           </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
