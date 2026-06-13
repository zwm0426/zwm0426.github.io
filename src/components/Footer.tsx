import React from 'react';
import { Github, Linkedin, Mail, BookOpen, type LucideIcon } from 'lucide-react';

type Site = {
  copyright: string;
  footerText?: string;
};

type IconLink = {
  label: string;
  href: string;
  Icon: LucideIcon;
};

type Links = {
  github?: string;
  linkedin?: string;
  publications?: string;
  email?: {
    user: string;
    domain: string;
  };
};

type FooterProps = {
  site: Site;
  links?: Links;
};

const Footer = ({ site, links }: FooterProps) => {
  const socialLinks: IconLink[] = [
    links?.github ? { label: 'GitHub', href: links.github, Icon: Github } : undefined,
    links?.linkedin ? { label: 'LinkedIn', href: links.linkedin, Icon: Linkedin } : undefined,
  ].filter((link): link is IconLink => Boolean(link));

  const publicationLink = links?.publications
    ? { label: 'Publications', href: links.publications, Icon: BookOpen }
    : undefined;

  const handleEmailClick = () => {
    if (!links?.email) return;
    window.location.href = `mailto:${links.email.user}@${links.email.domain}`;
  };

  return (
    <footer className="py-12 px-6 border-t border-zinc-100">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <p className="text-sm text-zinc-500">
            {site.footerText ?? site.copyright}
          </p>
        </div>
        
        <div className="flex gap-6">
          {socialLinks.map((link) => {
            const isExternal = link.href.startsWith('http');

            return (
              <a
                key={link.label}
                href={link.href || '#'}
                aria-label={link.label}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                className="text-zinc-400 hover:text-zinc-900 transition-colors"
              >
                <link.Icon size={20} />
              </a>
            );
          })}
          {links?.email && (
            <button
              type="button"
              onClick={handleEmailClick}
              aria-label="Email"
              className="text-zinc-400 hover:text-zinc-900 transition-colors"
            >
              <Mail size={20} />
            </button>
          )}
          {publicationLink && (
            <a
              href={publicationLink.href}
              aria-label={publicationLink.label}
              className="text-zinc-400 hover:text-zinc-900 transition-colors"
            >
              <publicationLink.Icon size={20} />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
