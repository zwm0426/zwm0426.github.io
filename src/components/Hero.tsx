import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

type Profile = {
  name: string;
  title: string;
  affiliation: string;
  avatar: string;
  avatarObjectPosition?: string;
  bio: string;
  heroLabel?: string;
  heroPrefix?: string;
  heroHighlight?: string;
  heroSuffix?: string;
};

type HeroAction = {
  label: string;
  href?: string;
  hrefKey?: 'lab';
  variant?: 'primary' | 'secondary';
  external?: boolean;
};

type Links = {
  lab?: string;
  hero?: HeroAction[];
};

type HeroProps = {
  profile: Profile;
  links?: Links;
};

const defaultHeroLinks: HeroAction[] = [
  { label: 'View CV', href: '/cv', variant: 'primary' },
  { label: 'Visit EC-ZERO Lab', hrefKey: 'lab', variant: 'secondary', external: true },
];

const Hero = ({ profile, links }: HeroProps) => {
  const heroLinks = links?.hero?.length ? links.hero : defaultHeroLinks;
  const resolveHref = (action: HeroAction) => {
    if (action.href) return action.href;
    if (action.hrefKey === 'lab') return links?.lab ?? '#';
    return '#';
  };

  return (
    <section id="home" className="pt-32 pb-20 md:pt-48 md:pb-32 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="md:col-span-4 flex justify-center md:justify-start"
        >
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-zinc-200 to-zinc-100 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <img 
              src={profile.avatar} 
              alt={profile.name} 
              style={profile.avatarObjectPosition ? { objectPosition: profile.avatarObjectPosition } : undefined}
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full object-cover object-[30%_23%] border-4 border-white shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        </motion.div>

        <div className="md:col-span-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <span className="inline-block px-3 py-1 rounded-full bg-zinc-100 text-zinc-600 text-xs font-semibold uppercase tracking-wider mb-4">
              {profile.heroLabel ?? `${profile.title} @ ${profile.affiliation}`}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-zinc-900 mb-6">
              {profile.heroPrefix ?? "Hi, I'm"} <span className="text-zinc-500">{profile.heroHighlight ?? profile.name}</span>{profile.heroSuffix ? ` ${profile.heroSuffix}` : ''}
            </h1>
            <p className="text-xl text-zinc-600 leading-relaxed max-w-2xl mb-10">
              {profile.bio}
            </p>
            
            <div className="flex flex-wrap gap-4">
              {heroLinks.map((action) => (
                <motion.a
                  key={`${action.label}-${resolveHref(action)}`}
                  href={resolveHref(action)}
                  target={action.external ? '_blank' : undefined}
                  rel={action.external ? 'noopener noreferrer' : undefined}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={action.variant === 'primary'
                    ? 'px-8 py-4 bg-zinc-900 text-white rounded-full font-medium shadow-lg shadow-zinc-200 hover:bg-zinc-800 transition-all flex items-center gap-2'
                    : 'px-8 py-4 bg-white text-zinc-900 border border-zinc-200 rounded-full font-medium hover:bg-zinc-50 transition-all'}
                >
                  {action.label}
                  {action.variant === 'primary' && <ChevronRight size={18} />}
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
