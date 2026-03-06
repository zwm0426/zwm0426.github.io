import React, { useState, useEffect } from 'react';
import { Code, X } from 'lucide-react'; // 引入 X 图标作为关闭按钮

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 👉 第一步：新增控制状态

  useEffect(() => {
    setCurrentPath(window.location.pathname);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 当路径改变时自动关闭菜单
  useEffect(() => {
    setIsMenuOpen(false);
  }, [currentPath]);

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
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || currentPath !== '/' || isMenuOpen ? 'bg-white/80 backdrop-blur-md border-b border-zinc-200 py-4' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <a href="/" className="text-xl font-semibold tracking-tight text-zinc-900">
            Kevin Zhao
          </a>
          
          {/* Desktop Menu - 保持不变 */}
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

          {/* Mobile Menu Button - 👉 第二步：绑定点击事件 */}
          <div className="md:hidden">
             <button 
               onClick={() => setIsMenuOpen(!isMenuOpen)} 
               className="text-zinc-900 p-2 focus:outline-none"
             >
               {isMenuOpen ? <X size={24} /> : <Code size={24} />}
             </button>
          </div>
        </div>

        {/* Mobile Menu Overlay - 👉 第三步：渲染折叠菜单 */}
        <div className={`md:hidden absolute top-full left-0 right-0 bg-white border-b border-zinc-200 transition-all duration-300 origin-top ${
          isMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'
        }`}>
          <div className="px-6 py-8 flex flex-col space-y-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  if (link.type === 'hash') handleHashClick(e, link.href);
                  setIsMenuOpen(false); // 点击后自动关闭
                }}
                className={`text-lg font-medium ${
                  currentPath === link.href ? 'text-zinc-900' : 'text-zinc-600'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;