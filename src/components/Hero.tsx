import React from 'react';
import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

const Hero = () => {
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
              src="https://picsum.photos/seed/kevin/400/400" 
              alt="Kevin ZHAO Weiming" 
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full object-cover border-4 border-white shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
              referrerPolicy="no-referrer"
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
              Engineer @ NAOCE, SJTU
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-zinc-900 mb-6">
              Hi, I'm <span className="text-zinc-500">Kevin</span> ZHAO Weiming
            </h1>
            <p className="text-xl text-zinc-600 leading-relaxed max-w-2xl mb-10">
              I am an Engineer at the School of Ocean and Civil Engineering (NAOCE) at Shanghai Jiao Tong University. My work focuses on integrating advanced technologies with engineering practices, drawing from my strong interdisciplinary background in Artificial Intelligence (AI), Extended Reality (XR), and Human-Computer Interaction (HCI).
            </p>
            
            <div className="flex flex-wrap gap-4">
              <a href="/cv">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-zinc-900 text-white rounded-full font-medium shadow-lg shadow-zinc-200 hover:bg-zinc-800 transition-all flex items-center gap-2"
                >
                  View CV <ChevronRight size={18} />
                </motion.button>
              </a>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-zinc-900 border border-zinc-200 rounded-full font-medium hover:bg-zinc-50 transition-all"
              >
                Get in touch
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
