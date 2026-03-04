/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Twitter, 
  Mail, 
  GraduationCap, 
  ExternalLink, 
  ChevronRight,
  BookOpen,
  Code,
  Users,
  Award,
  MapPin,
  ArrowLeft
} from 'lucide-react';

// --- Types ---
interface NewsItem {
  id: number;
  date: string;
  title: string;
  description: string;
  tag?: string;
}

// --- Mock Data ---
const NEWS_ITEMS: NewsItem[] = [
  {
    id: 1,
    date: "Feb 2026",
    title: "New Journey at NAOCE",
    description: "Thrilled to start my new role as an Engineer at the School of Ocean and Civil Engineering, SJTU, exploring the intersection of AI, XR, and engineering.",
    tag: "Career"
  },
  {
    id: 2,
    date: "Jan 2026",
    title: "Winter Trip to the US",
    description: "Enjoyed a wonderful winter vacation visiting New York City, Boston, and Pittsburgh.",
    tag: "Travel"
  },
  {
    id: 3,
    date: "Dec 2025",
    title: "PhD Program Acceptance",
    description: "Exciting news! I have been officially accepted into a PhD program to further my academic journey.",
    tag: "Academic"
  },
  {
    id: 4,
    date: "Dec 2025",
    title: "Awarded Excellent Lab Technician",
    description: "Deeply honored to be awarded the 'Excellent Lab Technician' title at SJTU.",
    tag: "Award"
  }
];

// --- Components ---

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
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
      if (location.pathname === '/') {
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
      isScrolled || location.pathname !== '/' ? 'bg-white/80 backdrop-blur-md border-b border-zinc-200 py-4' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold tracking-tight text-zinc-900">
          Kevin Zhao
        </Link>
        
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link, i) => (
            link.type === 'route' ? (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.href ? 'text-zinc-900' : 'text-zinc-600 hover:text-zinc-900'
                }`}
              >
                {link.name}
              </Link>
            ) : (
              <Link
                key={link.name}
                to={link.href}
                onClick={(e) => handleHashClick(e, link.href)}
                className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
              >
                {link.name}
              </Link>
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

const PageLayout = ({ children, title, subtitle }: { children: React.ReactNode; title: string; subtitle?: string }) => (
  <div className="pt-32 pb-24 px-6 min-h-screen bg-white">
    <div className="max-w-6xl mx-auto">
      <div className="mb-16">
        <Link to="/" className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors mb-8 group">
          <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
        </Link>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 mb-6">{title}</h1>
        {subtitle && <p className="text-xl text-zinc-500 max-w-3xl">{subtitle}</p>}
        <div className="h-1 bg-zinc-900 w-20 mt-8" />
      </div>
      {children}
    </div>
  </div>
);

// --- Pages ---

const Home = () => (
  <>
    {/* Hero Section */}
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
              <Link to="/cv">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-zinc-900 text-white rounded-full font-medium shadow-lg shadow-zinc-200 hover:bg-zinc-800 transition-all flex items-center gap-2"
                >
                  View CV <ChevronRight size={18} />
                </motion.button>
              </Link>
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

    {/* About Me Section */}
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
                src="https://picsum.photos/seed/lab/800/800" 
                alt="Lab Environment" 
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

    {/* News Preview Section */}
    <section id="news" className="py-24 bg-zinc-50 px-6 border-y border-zinc-100">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <SectionHeading subtitle="Stay updated with my latest academic and professional milestones.">
            Recent Updates
          </SectionHeading>
          <Link to="/news" className="mb-12 text-sm font-bold text-zinc-900 hover:gap-2 transition-all flex items-center">
            View all news <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {NEWS_ITEMS.slice(0, 3).map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-zinc-100 shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{item.date}</span>
                <span className="px-2 py-1 rounded-md bg-zinc-50 text-zinc-500 text-[10px] font-bold uppercase">{item.tag}</span>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-zinc-600 transition-colors">{item.title}</h3>
              <p className="text-zinc-500 text-sm leading-relaxed mb-6">
                {item.description}
              </p>
              <Link to="/news" className="inline-flex items-center text-sm font-bold text-zinc-900 hover:gap-2 transition-all">
                Read more <ChevronRight size={16} className="ml-1" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  </>
);

const NewsPage = () => (
  <PageLayout title="News" subtitle="A complete timeline of my professional journey and updates.">
    <div className="space-y-12">
      {NEWS_ITEMS.map((item, i) => (
        <motion.div 
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex flex-col md:flex-row gap-8 md:gap-16 items-start border-b border-zinc-100 pb-12"
        >
          <div className="md:w-32 flex-shrink-0">
            <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest">{item.date}</span>
            <div className="mt-2">
              <span className="px-2 py-1 rounded-md bg-zinc-100 text-zinc-500 text-[10px] font-bold uppercase">{item.tag}</span>
            </div>
          </div>
          <div className="flex-grow">
            <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
            <p className="text-zinc-600 leading-relaxed text-lg">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </PageLayout>
);

const ProjectsPage = () => (
  <PageLayout title="Projects" subtitle="Selected works in AI, XR, and Human-Computer Interaction.">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {[1, 2, 3, 4].map((p) => (
        <motion.div 
          key={p}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: p * 0.1 }}
          className="group"
        >
          <div className="aspect-video rounded-3xl overflow-hidden bg-zinc-100 mb-6 relative">
            <img 
              src={`https://picsum.photos/seed/project${p}/800/450`} 
              alt={`Project ${p}`} 
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 right-4">
              <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-zinc-900 shadow-lg">
                <ExternalLink size={18} />
              </div>
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-2 group-hover:text-zinc-600 transition-colors">Innovative XR Interface {p}</h3>
          <p className="text-zinc-500 mb-4">A brief description of the project, the technologies used, and the impact it had on the field of engineering.</p>
          <div className="flex gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-zinc-100 rounded">Unity</span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-zinc-100 rounded">AI</span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-zinc-100 rounded">HCI</span>
          </div>
        </motion.div>
      ))}
    </div>
  </PageLayout>
);

const TeachingPage = () => (
  <PageLayout title="Teaching" subtitle="Curriculum development and student innovation training.">
    <div className="max-w-3xl space-y-12">
      <div className="bg-zinc-50 p-8 rounded-3xl border border-zinc-100">
        <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
          <BookOpen className="text-zinc-900" /> Extended Reality Lab
        </h3>
        <p className="text-zinc-600 leading-relaxed mb-6">
          As the Director of the XR Lab at SJTU Student Innovation Center, I led the development of several key courses focusing on virtual and augmented reality.
        </p>
        <ul className="space-y-4">
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-900 mt-2 flex-shrink-0" />
            <div>
              <p className="font-bold">Introduction to XR Development</p>
              <p className="text-sm text-zinc-500">Undergraduate elective course covering Unity, C#, and AR/VR principles.</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-900 mt-2 flex-shrink-0" />
            <div>
              <p className="font-bold">AI for Creative Media</p>
              <p className="text-sm text-zinc-500">Workshop series on using generative AI in digital content creation.</p>
            </div>
          </li>
        </ul>
      </div>
      
      <div>
        <h3 className="text-2xl font-bold mb-6">Student Mentorship</h3>
        <p className="text-zinc-600 leading-relaxed mb-8">
          I have mentored numerous student teams in national innovation competitions, focusing on the application of AI and XR in solving real-world engineering problems.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 border border-zinc-100 rounded-2xl">
            <Award className="mb-4 text-zinc-400" />
            <p className="font-bold">Excellent Mentor Award</p>
            <p className="text-sm text-zinc-500">SJTU Student Innovation Center, 2024</p>
          </div>
          <div className="p-6 border border-zinc-100 rounded-2xl">
            <Users className="mb-4 text-zinc-400" />
            <p className="font-bold">50+ Students Mentored</p>
            <p className="text-sm text-zinc-500">Across various interdisciplinary projects</p>
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
);

const PublicationsPage = () => (
  <PageLayout title="Publications" subtitle="Research contributions in HCI, XR, and AI.">
    <div className="space-y-12">
      {[2025, 2024, 2023].map((year) => (
        <div key={year}>
          <h3 className="text-xl font-bold text-zinc-400 mb-8 border-b border-zinc-100 pb-2">{year}</h3>
          <div className="space-y-8">
            {[1, 2].map((pub) => (
              <div key={pub} className="group">
                <p className="text-lg font-bold group-hover:text-zinc-600 transition-colors mb-2">
                  Towards Seamless Interaction: A Study on AI-Driven Gesture Recognition in Immersive XR Environments
                </p>
                <p className="text-zinc-500 text-sm mb-3">
                  <span className="font-bold text-zinc-900">Kevin Zhao</span>, J. Smith, L. Wang.
                </p>
                <p className="text-zinc-400 text-xs uppercase tracking-widest italic">
                  Proceedings of the ACM on Human-Computer Interaction (PACMHCI), {year}
                </p>
                <div className="flex gap-4 mt-4">
                  <a href="#" className="text-xs font-bold text-zinc-900 flex items-center gap-1 hover:underline">
                    [PDF]
                  </a>
                  <a href="#" className="text-xs font-bold text-zinc-900 flex items-center gap-1 hover:underline">
                    [DOI]
                  </a>
                  <a href="#" className="text-xs font-bold text-zinc-900 flex items-center gap-1 hover:underline">
                    [Code]
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </PageLayout>
);

const CVPage = () => (
  <PageLayout title="Curriculum Vitae" subtitle="Academic background, professional experience, and skills.">
    <div className="max-w-4xl space-y-16">
      {/* Education */}
      <section>
        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
          <GraduationCap /> Education
        </h3>
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row justify-between gap-2">
            <div>
              <p className="font-bold text-xl">Nanyang Technological University (NTU)</p>
              <p className="text-zinc-600">MSc in Digital Media Technology</p>
            </div>
            <p className="text-zinc-400 font-medium">Singapore</p>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-2">
            <div>
              <p className="font-bold text-xl">Northwest University</p>
              <p className="text-zinc-600">BSc in Computer Science and Technology</p>
            </div>
            <p className="text-zinc-400 font-medium">China</p>
          </div>
        </div>
      </section>

      {/* Experience */}
      <section>
        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
          <Code /> Experience
        </h3>
        <div className="space-y-12">
          <div className="relative pl-8 border-l-2 border-zinc-100">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-zinc-900" />
            <div className="flex flex-col md:flex-row justify-between gap-2 mb-4">
              <div>
                <p className="font-bold text-xl">Engineer</p>
                <p className="text-zinc-600">School of Ocean and Civil Engineering (NAOCE), SJTU</p>
              </div>
              <p className="text-zinc-400 font-medium">2026 - Present</p>
            </div>
            <p className="text-zinc-500">Integrating advanced technologies with engineering practices, focusing on AI, XR, and HCI.</p>
          </div>
          
          <div className="relative pl-8 border-l-2 border-zinc-100">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-zinc-200" />
            <div className="flex flex-col md:flex-row justify-between gap-2 mb-4">
              <div>
                <p className="font-bold text-xl">Director of XR Lab</p>
                <p className="text-zinc-600">SJTU Student Innovation Center</p>
              </div>
              <p className="text-zinc-400 font-medium">Previous</p>
            </div>
            <p className="text-zinc-500">Led curriculum development and student innovation training in AI and XR.</p>
          </div>

          <div className="relative pl-8 border-l-2 border-zinc-100">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-zinc-200" />
            <div className="flex flex-col md:flex-row justify-between gap-2 mb-4">
              <div>
                <p className="font-bold text-xl">Research Associate</p>
                <p className="text-zinc-600">Energy Research Institute @ NTU (ERI@N)</p>
              </div>
              <p className="text-zinc-400 font-medium">Previous</p>
            </div>
            <p className="text-zinc-500">Specialized in 3D LiDAR visualization and GUI design.</p>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section>
        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
          <Users /> Skills
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="font-bold mb-4 uppercase text-xs tracking-widest text-zinc-400">Technologies</p>
            <ul className="space-y-2 text-zinc-600">
              <li>Unity / C#</li>
              <li>Python / PyTorch</li>
              <li>React / TypeScript</li>
              <li>ARCore / ARKit</li>
            </ul>
          </div>
          <div>
            <p className="font-bold mb-4 uppercase text-xs tracking-widest text-zinc-400">Research</p>
            <ul className="space-y-2 text-zinc-600">
              <li>HCI Methodologies</li>
              <li>User Study Design</li>
              <li>3D Visualization</li>
              <li>Generative AI</li>
            </ul>
          </div>
          <div>
            <p className="font-bold mb-4 uppercase text-xs tracking-widest text-zinc-400">Languages</p>
            <ul className="space-y-2 text-zinc-600">
              <li>English (Professional)</li>
              <li>Mandarin (Native)</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  </PageLayout>
);

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white text-zinc-900 selection:bg-zinc-900 selection:text-white font-sans">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/teaching" element={<TeachingPage />} />
          <Route path="/publications" element={<PublicationsPage />} />
          <Route path="/cv" element={<CVPage />} />
        </Routes>

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
      </div>
    </Router>
  );
}
