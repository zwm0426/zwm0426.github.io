import React from 'react';
import { motion } from 'motion/react';
import { Code, Users, GraduationCap, MapPin } from 'lucide-react';
import aboutImg from '../assets/images/about6.webp';

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

const About = () => {
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
              <p>
                Prior to my current role, I served as an educational engineer and the Director of the Extended Reality Lab at the SJTU Student Innovation Center, where I led curriculum development and student innovation training in AI and XR. I also worked as a Research Associate at the Energy Research Institute @ NTU (ERI@N) in Singapore, specializing in 3D LiDAR visualization and GUI design.
              </p>
              <p>
                I hold an MSc in Digital Media Technology from Nanyang Technological University (NTU), Singapore, and a BSc in Computer Science and Technology from Northwest University, China. My research interests include human-computer interaction (HCI), generative AI (AIGC), virtual/augmented reality (VR/AR), and their innovative applications.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-900">
                    <Code size={20} />
                  </div>
                  <span className="text-sm font-medium">AI & ML</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-900">
                    <Users size={20} />
                  </div>
                  <span className="text-sm font-medium">HCI Research</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-900">
                    <GraduationCap size={20} />
                  </div>
                  <span className="text-sm font-medium">XR Systems</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-900">
                    <MapPin size={20} />
                  </div>
                  <span className="text-sm font-medium">SJTU, Shanghai</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden bg-zinc-100">
               <img 
                src={aboutImg.src} 
                alt="About me" 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
               />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-zinc-100 max-w-[200px]">
              <p className="text-xs font-bold text-zinc-400 uppercase mb-2">Current Focus</p>
              <p className="text-sm font-semibold leading-tight">Developing AI-enhanced XR applications and exploring next-gen HCI.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
export { SectionHeading };
