import React, { useState, useEffect } from 'react';
import { Code, Globe2, X } from 'lucide-react';
import { documentLanguage, switchLocalePath, withLocalePath, type Locale } from '../i18n/routing';

type NavigationItem = {
  label: string;
  href: string;
  type?: 'route' | 'hash';
};

type NavbarProps = {
  navigation: NavigationItem[];
  brand: string;
  locale: Locale;
  currentPath: string;
  switchLabel: string;
  switchAriaLabel: string;
  openMenuAriaLabel: string;
  closeMenuAriaLabel: string;
};

const normalizePath = (path: string) => {
  if (path.length <= 1) return path;
  return path.replace(/\/$/, '');
};

const Navbar = ({
  navigation,
  brand,
  locale,
  currentPath: initialCurrentPath,
  switchLabel,
  switchAriaLabel,
  openMenuAriaLabel,
  closeMenuAriaLabel,
}: NavbarProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentPath, setCurrentPath] = useState(initialCurrentPath);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const targetLocale: Locale = locale === 'en' ? 'zh' : 'en';
  const languageHref = switchLocalePath(currentPath, targetLocale);
  const homeHref = withLocalePath('/', locale);

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
    if (href.includes('#')) {
      const target = new URL(href, window.location.origin);
      const id = target.hash.slice(1);

      if (normalizePath(currentPath) === normalizePath(target.pathname)) {
        e.preventDefault();
        window.history.replaceState(null, '', target.hash);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleLocaleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const browserSuffix = `${window.location.search}${window.location.hash}`;

    if (browserSuffix) {
      e.preventDefault();
      window.location.assign(`${languageHref}${browserSuffix}`);
    }
  };

  const isRouteActive = (href: string) => {
    if (href.includes('#')) return false;
    return normalizePath(currentPath) === normalizePath(href);
  };

  const getLinkType = (link: NavigationItem) => link.type ?? (link.href.includes('#') ? 'hash' : 'route');
  const isHomePath = normalizePath(currentPath) === normalizePath(homeHref);

  const languageLink = (mobile = false) => (
    <a
      href={languageHref}
      hrefLang={documentLanguage[targetLocale]}
      lang={documentLanguage[targetLocale]}
      aria-label={switchAriaLabel}
      onClick={handleLocaleClick}
      className={mobile
        ? 'inline-flex w-fit items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-base font-medium text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 transition-colors'
        : 'inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3.5 py-2 text-sm font-medium text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900 transition-colors'}
    >
      <Globe2 size={mobile ? 19 : 17} aria-hidden="true" />
      {switchLabel}
    </a>
  );

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || !isHomePath || isMenuOpen ? 'bg-white/80 backdrop-blur-md border-b border-zinc-200 py-4' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <a href={homeHref} className="text-xl font-semibold tracking-tight text-zinc-900">
            {brand}
          </a>
          
          <div className="hidden lg:flex items-center gap-6">
            <div className="flex items-center gap-7">
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
            {languageLink()}
          </div>

          <div className="lg:hidden">
             <button 
               onClick={() => setIsMenuOpen(!isMenuOpen)} 
               className="text-zinc-900 p-2 focus:outline-none"
               aria-label={isMenuOpen ? closeMenuAriaLabel : openMenuAriaLabel}
               aria-expanded={isMenuOpen}
             >
               {isMenuOpen ? <X size={24} /> : <Code size={24} />}
             </button>
          </div>
        </div>

        <div
          aria-hidden={!isMenuOpen}
          inert={!isMenuOpen}
          className={`lg:hidden absolute top-full left-0 right-0 bg-white border-b border-zinc-200 shadow-xl transition-all duration-300 origin-top ${
          isMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'
        }`}
        >
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
            <div className="border-t border-zinc-200 pt-6">
              {languageLink(true)}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
