import React, { useState, useEffect } from 'react';
import { Code, X } from 'lucide-react';

type NavigationItem = {
  label: string;
  href: string;
  type?: 'route' | 'hash';
};

type NavbarProps = {
  navigation: NavigationItem[];
  brand: string;
};

const normalizePath = (path: string) => {
  if (path.length <= 1) return path;
  return path.replace(/\/$/, '');
};

const Navbar = ({ navigation, brand }: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [currentPath]);

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

  const isRouteActive = (href: string) => {
    if (href.includes('#')) return false;
    return normalizePath(currentPath) === normalizePath(href);
  };

  const getLinkType = (link: NavigationItem) => link.type ?? (link.href.includes('#') ? 'hash' : 'route');

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || currentPath !== '/' || isMenuOpen ? 'bg-white/80 backdrop-blur-md border-b border-zinc-200 py-4' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <a href="/" className="text-xl font-semibold tracking-tight text-zinc-900">
            {brand}
          </a>
          
          <div className="hidden md:flex space-x-8">
            {navigation.map((link) => (
              getLinkType(link) === 'route' ? (
                <a
                  key={link.label}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    isRouteActive(link.href) ? 'text-zinc-900' : 'text-zinc-600 hover:text-zinc-900'
                  }`}
                >
                  {link.label}
                </a>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleHashClick(e, link.href)}
                  className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
                >
                  {link.label}
                </a>
              )
            ))}
          </div>

          <div className="md:hidden">
             <button 
               onClick={() => setIsMenuOpen(!isMenuOpen)} 
               className="text-zinc-900 p-2 focus:outline-none"
             >
               {isMenuOpen ? <X size={24} /> : <Code size={24} />}
             </button>
          </div>
        </div>

        <div className={`md:hidden absolute top-full left-0 right-0 bg-white/80 backdrop-blur-md border-b border-zinc-200 transition-all duration-300 origin-top ${
          isMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'
        }`}>
          <div className="px-6 py-8 flex flex-col space-y-6">
            {navigation.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  if (getLinkType(link) === 'hash') handleHashClick(e, link.href);
                  setIsMenuOpen(false);
                }}
                className={`text-lg font-medium ${
                  isRouteActive(link.href) ? 'text-zinc-900' : 'text-zinc-600'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
