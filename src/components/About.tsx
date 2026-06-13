import React from 'react';
import { motion } from 'motion/react';
import { Code, Users, GraduationCap, MapPin, type LucideIcon } from 'lucide-react';

type AboutIcon = 'code' | 'users' | 'graduation-cap' | 'map-pin';

type AboutHighlight = {
  label: string;
  icon: AboutIcon;
};

type Profile = {
  about: {
    image: string;
    imageAlt?: string;
    paragraphs: string[];
    highlights: AboutHighlight[];
    focusLabel?: string;
    currentFocus: string;
  };
};

type AboutProps = {
  profile: Profile;
};

const iconMap: Record<AboutIcon, LucideIcon> = {
  code: Code,
  users: Users,
  'graduation-cap': GraduationCap,
  'map-pin': MapPin,
};

const SectionHeading = ({ children, subtitle }: { children: React.ReactNode; subtitle?: string }) => (
  <div className="mb-12">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl mb-4"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-zinc-500 max-w-2xl"
      >
        {subtitle}
      </motion.p>
    )}
    <motion.div 
      initial={{ width: 0 }}
      whileInView={{ width: 60 }}
      viewport={{ once: true }}
      className="h-1 bg-zinc-900 mt-6"
    />
  </div>
);

const About = ({ profile }: AboutProps) => {
  const about = profile.about;

  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeading>About Me</SectionHeading>
            <div className="space-y-6 text-zinc-600 leading-relaxed">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
              <div className="grid grid-cols-2 gap-4 pt-4">
                {about.highlights.map((highlight) => {
                  const Icon = iconMap[highlight.icon];

                  return (
                    <div className="flex items-center gap-3" key={highlight.label}>
                      <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-900">
                        <Icon size={20} />
                      </div>
                      <span className="text-sm font-medium">{highlight.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden bg-zinc-100 border border-zinc-100 shadow-sm transition-shadow duration-300 hover:shadow-xl">
               <img 
                src={about.image} 
                alt={about.imageAlt ?? 'About me'} 
                className="w-full h-full object-cover transition-transform duration-300 ease-out hover:scale-[1.01]"
                referrerPolicy="no-referrer"
               />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-zinc-100 max-w-[200px]">
              <p className="text-xs font-bold text-zinc-400 uppercase mb-2">{about.focusLabel ?? 'Current Focus'}</p>
              <p className="text-sm font-semibold leading-tight">{about.currentFocus}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
export { SectionHeading };
