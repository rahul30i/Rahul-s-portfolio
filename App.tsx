import React, { useState, useEffect, useRef } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import Header from './components/Header';
import OptimizedImage from './components/OptimizedImage';
import EducationSection from './components/EducationSection';
import Section3D from './components/Section3D';
import Preloader from './components/Preloader';
import Greeting from './components/Greeting';
import TechBackground from './components/TechBackground';
import { personalInfo, projects, experiences, certifications, skills, education } from './constants';
import { GithubIcon, LinkedinIcon, LeetcodeIcon, MailIcon } from './components/icons';

declare global {
    interface Window {
        VANTA: any;
    }
}

type AppState = 'loading' | 'greeting' | 'ready';

const App = () => {
    const [appState, setAppState] = useState<AppState>('loading');
    const mainContentRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        // Initialize AOS once with optimized configuration
        AOS.init({
            duration: 800,
            once: true,
            offset: 100,
            throttleDelay: 99,
            disable: false,
        });

        const loadingTimer = setTimeout(() => {
            setAppState('greeting');
        }, 800); // Reduced loading time

        return () => clearTimeout(loadingTimer);
    }, []);

    const handleGreetingFinished = () => {
        setAppState('ready');
        requestAnimationFrame(() => {
            if (mainContentRef.current) {
                mainContentRef.current.style.opacity = '1';
                mainContentRef.current.style.transform = 'translateY(0)';
            }
        });
    };

    const renderContent = () => {
        switch (appState) {
            case 'loading':
                return <Preloader />;
            case 'greeting':
                return <Greeting onFinished={handleGreetingFinished} />;
            case 'ready':
                return (
                    <div className="text-gray-300 font-sans antialiased relative min-h-screen bg-[#110E15]">
                        <div className="relative z-10 opacity-0 transition-all duration-700 ease-out transform translate-y-4" ref={mainContentRef}>
                            <Header />
                            
                            {/* Hero Section */}
                            <section id="home" className="min-h-screen relative overflow-hidden">
                                <TechBackground />
                                <div className="absolute inset-0 bg-gradient-to-br from-[#110E15]/80 via-[#211720]/70 to-[#411D2B]/80 backdrop-blur-sm"></div>
                                <div className="relative z-10 container mx-auto px-6 h-screen flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
                                    {/* Profile Image Container */}
                                    <div className="w-full max-w-md lg:w-2/5 relative group" data-aos="fade-right">
                                        <div className="relative z-20 rounded-2xl overflow-hidden border-4 border-[#656772]/30 shadow-2xl shadow-[#656772]/20 transform transition-all duration-500 group-hover:scale-105 group-hover:rotate-2">
                                            <OptimizedImage 
                                                src={personalInfo.profilePhoto} 
                                                alt="Korivi Rahul" 
                                                className="w-full h-[500px] object-cover object-center filter brightness-95 contrast-105 transition-all duration-500 group-hover:brightness-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                        </div>
                                        <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#656772] rounded-2xl transform -rotate-3 transition-transform duration-500 group-hover:rotate-6"></div>
                                        <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-[#57463A] rounded-2xl transform rotate-3 transition-transform duration-500 group-hover:-rotate-6"></div>
                                    </div>

                                    {/* Content Container */}
                                    <div className="lg:w-3/5 text-center lg:text-left" data-aos="fade-left">
                                        <div className="relative">
                                            <div className="hidden lg:block absolute -left-12 top-1/2 w-8 h-1 bg-[#656772]"></div>
                                            <h2 className="text-5xl md:text-7xl font-bold text-gray-100 tracking-tight leading-tight animate-text-shadow">
                                                {personalInfo.name}
                                            </h2>
                                            <p className="mt-6 max-w-xl text-lg text-gray-300/90 leading-relaxed mx-auto lg:mx-0 backdrop-blur-sm">
                                                {personalInfo.summary}
                                            </p>
                                            
                                            {/* Social links */}
                                            <div className="flex items-center justify-center lg:justify-start space-x-6 mt-8">
                                                <a href={`mailto:${personalInfo.email}`} 
                                                   className="text-gray-400 hover:text-[#656772] transform hover:scale-110 transition-all duration-300 ease-out" 
                                                   aria-label="Email">
                                                    <div className="p-3 rounded-full bg-[#2E2B26]/50 hover:bg-[#2E2B26]/80">
                                                        <MailIcon className="w-7 h-7" />
                                                    </div>
                                                </a>
                                                <a href={personalInfo.github} 
                                                   target="_blank" 
                                                   rel="noopener noreferrer" 
                                                   className="text-gray-400 hover:text-[#656772] transform hover:scale-110 transition-all duration-300 ease-out" 
                                                   aria-label="GitHub">
                                                    <div className="p-3 rounded-full bg-[#2E2B26]/50 hover:bg-[#2E2B26]/80">
                                                        <GithubIcon className="w-6 h-6" />
                                                    </div>
                                                </a>
                                                <a href={personalInfo.linkedin} 
                                                   target="_blank" 
                                                   rel="noopener noreferrer" 
                                                   className="text-gray-400 hover:text-[#656772] transform hover:scale-110 transition-all duration-300 ease-out" 
                                                   aria-label="LinkedIn">
                                                    <div className="p-3 rounded-full bg-[#2E2B26]/50 hover:bg-[#2E2B26]/80">
                                                        <LinkedinIcon className="w-6 h-6" />
                                                    </div>
                                                </a>
                                                <a href={personalInfo.leetcode} 
                                                   target="_blank" 
                                                   rel="noopener noreferrer" 
                                                   className="text-gray-400 hover:text-[#656772] transform hover:scale-110 transition-all duration-300 ease-out" 
                                                   aria-label="LeetCode">
                                                    <div className="p-3 rounded-full bg-[#2E2B26]/50 hover:bg-[#2E2B26]/80">
                                                        <LeetcodeIcon className="w-6 h-6" />
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            
                            {/* Main Content */}
                            <main className="container mx-auto px-6 md:px-10 lg:px-16">
                                {/* Experience Section */}
                                <Section3D>
                                    <section id="experience" className="py-8">
                                        <motion.h2 
                                            className="text-3xl font-bold text-gray-100 mb-12 flex items-center"
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            <span className="text-[#430E18] font-mono text-2xl mr-4">01.</span> Experience
                                            <span className="h-px bg-[#2A0A11] flex-grow ml-4"></span>
                                        </motion.h2>
                                        <div className="space-y-12">
                                            {experiences.map((exp, index) => (
                                                <div key={index} data-aos="fade-up" className="relative pl-8 border-l-2 border-gray-700">
                                                    <div className="absolute -left-2 top-1 w-4 h-4 bg-[#656772] rounded-full border-4 border-[#2E2B26]"></div>
                                                    <h3 className="text-xl font-bold text-gray-100">{exp.role} @ {exp.company}</h3>
                                                    <p className="text-sm text-[#656772] font-mono mb-2">{exp.duration}</p>
                                                    <ul className="list-disc list-inside text-gray-400 space-y-2">
                                                        {exp.duties.map((duty, i) => (
                                                            <li key={i}>{duty}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </Section3D>

                                {/* Projects Section */}
                                <Section3D className="mb-8">
                                    <section id="projects" className="py-8">
                                        <h2 className="text-3xl font-bold text-gray-100 mb-8 flex items-center">
                                            <span className="text-[#656772] font-mono text-2xl mr-4">02.</span> Projects
                                            <span className="h-px bg-gray-700 flex-grow ml-4"></span>
                                        </h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                                            {projects.map((project, index) => (
                                                <motion.div 
                                                    key={index}
                                                    className="bg-[#211720]/90 backdrop-blur-sm rounded-lg flex flex-col justify-between hover:shadow-2xl hover:shadow-[#430E18]/30 hover:-translate-y-2 transition-all duration-300 border-t-4 border-[#411D2B]"
                                                    initial={{ opacity: 0, y: 20 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true, margin: "-50px" }}
                                                    transition={{ duration: 0.4, delay: Math.min(index * 0.1, 0.8) }}
                                                    whileHover={{ scale: 1.01 }}
                                                >
                                                    <div className="p-6 flex flex-col flex-grow">
                                                        <div className="flex justify-between items-center mb-4">
                                                            <motion.svg 
                                                                xmlns="http://www.w3.org/2000/svg" 
                                                                className="h-8 w-8 text-[#430E18]" 
                                                                fill="none" 
                                                                viewBox="0 0 24 24" 
                                                                stroke="currentColor"
                                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                                                            </motion.svg>
                                                        </div>
                                                        <h3 className="text-xl font-bold text-gray-100 mb-2 flex-grow">{project.title}</h3>
                                                        <p className="text-gray-400 mb-4">{project.description}</p>
                                                    </div>
                                                    <div className="bg-[#110E15]/40 p-4 rounded-b-lg">
                                                        <div className="flex flex-wrap gap-2">
                                                            {project.tech.map((tech, i) => (
                                                                <motion.span 
                                                                    key={i} 
                                                                    className="bg-[#2A0A11]/80 backdrop-blur-sm text-gray-200 px-3 py-1 rounded-full text-xs font-mono"
                                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                                    whileInView={{ opacity: 1, scale: 1 }}
                                                                    whileHover={{ scale: 1.1, backgroundColor: "rgba(67, 14, 24, 0.8)" }}
                                                                    transition={{ duration: 0.2, delay: i * 0.1 }}
                                                                >
                                                                    {tech}
                                                                </motion.span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </section>
                                </Section3D>

                                {/* Skills Section */}
                                <Section3D>
                                    <section id="skills" className="py-8">
                                        <motion.h2 
                                            className="text-3xl font-bold text-gray-100 mb-12 flex items-center"
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <span className="text-[#656772] font-mono text-2xl mr-4">03.</span> Skills
                                            <span className="h-px bg-gray-700 flex-grow ml-4"></span>
                                        </motion.h2>
                                        <motion.div 
                                            className="space-y-8"
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                        >
                                            {Object.entries(skills).map(([category, skillList], index) => (
                                                <motion.div 
                                                    key={index}
                                                    initial={{ opacity: 0, y: 20 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                                    className="skill-category"
                                                >
                                                    <h3 className="text-lg font-bold text-[#656772] mb-4">{category}</h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {skillList.map((skill, i) => (
                                                            <motion.span 
                                                                key={i} 
                                                                className="bg-[#2A0A11]/80 backdrop-blur-sm text-gray-200 px-3 py-1 rounded-full text-sm font-mono"
                                                                initial={{ opacity: 0, scale: 0.8 }}
                                                                whileInView={{ opacity: 1, scale: 1 }}
                                                                viewport={{ once: true }}
                                                                transition={{ 
                                                                    duration: 0.3, 
                                                                    delay: Math.min(index * 0.1 + i * 0.05, 1.5),
                                                                    type: "spring",
                                                                    stiffness: 200
                                                                }}
                                                                whileHover={{ 
                                                                    scale: 1.1, 
                                                                    backgroundColor: "#430E18",
                                                                    transition: { duration: 0.2 }
                                                                }}
                                                            >
                                                                {skill}
                                                            </motion.span>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    </section>
                                </Section3D>

                                {/* Education Section */}
                                <Section3D className="mt-0">
                                    <EducationSection education={education} certifications={certifications} />
                                </Section3D>

                                {/* Contact Section */}
                                <Section3D>
                                    <section id="contact" className="py-8 px-4">
                                        <div className="max-w-4xl mx-auto text-center">
                                            <motion.h2 
                                                className="text-3xl font-bold text-gray-100 mb-6"
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.6 }}
                                            >
                                                Get In Touch
                                            </motion.h2>
                                            <motion.p 
                                                className="max-w-md mx-auto text-gray-400 mb-8"
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.6, delay: 0.2 }}
                                            >
                                                I'm currently open to new opportunities and my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                                            </motion.p>
                                            <motion.a 
                                                href={`mailto:${personalInfo.email}`}
                                                className="inline-block bg-transparent text-[#656772] font-mono border-2 border-[#656772] rounded-md px-8 py-3 hover:bg-[#656772] hover:bg-opacity-10 transition-all duration-300 transform hover:scale-105"
                                                initial={{ opacity: 0, y: 20 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.6, delay: 0.4 }}
                                            >
                                                Say Hello
                                            </motion.a>
                                            <motion.footer 
                                                className="mt-16 text-gray-500 text-sm font-mono"
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.6, delay: 0.6 }}
                                            >
                                                <p>Designed & Built by Korivi Rahul</p>
                                                <div className="flex items-center justify-center space-x-6 mt-6">
                                                    <motion.a 
                                                        href={personalInfo.github} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="text-gray-400 hover:text-[#656772] transform hover:scale-110 transition-all duration-300"
                                                        whileHover={{ scale: 1.2 }}
                                                    >
                                                        <GithubIcon className="w-6 h-6"/>
                                                    </motion.a>
                                                    <motion.a 
                                                        href={personalInfo.linkedin} 
                                                        target="_blank" 
                                                        rel="noopener noreferrer"
                                                        className="text-gray-400 hover:text-[#656772] transform hover:scale-110 transition-all duration-300"
                                                        whileHover={{ scale: 1.2 }}
                                                    >
                                                        <LinkedinIcon className="w-6 h-6"/>
                                                    </motion.a>
                                                </div>
                                            </motion.footer>
                                        </div>
                                    </section>
                                </Section3D>
                            </main>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return renderContent();
};

export default App;