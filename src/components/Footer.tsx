import React from 'react';
import { Github, Twitter, Mail, BookOpen } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 px-6 border-t border-zinc-100">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <p className="text-sm text-zinc-500">
            © {new Date().getFullYear()} Kevin ZHAO Weiming. Built with precision & passion.
          </p>
        </div>
        
        <div className="flex gap-6">
          <a href="#" className="text-zinc-400 hover:text-zinc-900 transition-colors">
            <Github size={20} />
          </a>
          <a href="#" className="text-zinc-400 hover:text-zinc-900 transition-colors">
            <Twitter size={20} />
          </a>
          <a href="#" className="text-zinc-400 hover:text-zinc-900 transition-colors">
            <Mail size={20} />
          </a>
          <a href="#" className="text-zinc-400 hover:text-zinc-900 transition-colors">
            <BookOpen size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
