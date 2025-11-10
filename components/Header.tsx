
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        
        // Prevent body scroll when menu is open
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    const scrollTo = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        setIsMenuOpen(false);
    };

    const navLinks = [
        { id: 'experience', name: 'Experience' },
        { id: 'projects', name: 'Projects' },
        { id: 'skills', name: 'Skills' },
        { id: 'education', name: 'Education' },
        { id: 'contact', name: 'Contact' },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#2E2B26]/95 shadow-lg backdrop-blur-sm' : 'bg-[#2E2B26]/50 backdrop-blur-sm'}`}>
            <nav className="container mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-16 py-4 flex justify-between items-center">
                <a href="#home" 
                   onClick={(e) => { e.preventDefault(); scrollTo('home'); }} 
                   className="text-xl sm:text-2xl font-bold text-[#656772] font-mono relative z-50 hover:text-gray-100 transition-colors duration-300">
                    KR
                </a>
                
                {/* Desktop Menu */}
                <ul className="hidden md:flex items-center space-x-6 lg:space-x-8 font-mono">
                    {navLinks.map((link, index) => (
                        <li key={link.id}>
                            <a href={`#${link.id}`} 
                               onClick={(e) => { e.preventDefault(); scrollTo(link.id); }} 
                               className="text-sm lg:text-base text-gray-300 hover:text-gray-100 transition-colors duration-300 whitespace-nowrap py-2 px-3 rounded-lg hover:bg-[#656772]/20">
                                <span className="text-[#656772]">0{index + 1}.</span> {link.name}
                            </a>
                        </li>
                    ))}
                </ul>
                
                {/* Mobile Menu Button */}
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)} 
                    className="md:hidden relative z-50 p-2 rounded-lg hover:bg-[#656772]/20 transition-colors duration-300" 
                    aria-label="Toggle menu"
                >
                    <div className="w-6 h-5 flex flex-col justify-between">
                        <span className={`block w-full h-0.5 bg-[#656772] transform transition-all duration-300 ${
                            isMenuOpen ? 'rotate-45 translate-y-[9px]' : ''
                        }`}></span>
                        <span className={`block w-full h-0.5 bg-[#656772] transform transition-all duration-300 ${
                            isMenuOpen ? 'opacity-0 translate-x-3' : ''
                        }`}></span>
                        <span className={`block w-full h-0.5 bg-[#656772] transform transition-all duration-300 ${
                            isMenuOpen ? '-rotate-45 -translate-y-[9px]' : ''
                        }`}></span>
                    </div>
                </button>
            </nav>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300 md:hidden ${
                isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`} onClick={() => setIsMenuOpen(false)}>
                <div 
                    className={`fixed top-0 right-0 h-full w-[min(75%,300px)] bg-[#2E2B26]/95 shadow-xl backdrop-blur-md transform transition-transform duration-300 ease-out ${
                        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                    onClick={e => e.stopPropagation()}
                >
                    <div className="flex flex-col h-full pt-20 pb-8 px-6">
                        <ul className="flex-1 flex flex-col space-y-4 font-mono">
                            {navLinks.map((link, index) => (
                                <li key={link.id} className="border-b border-[#656772]/20 last:border-none">
                                    <a 
                                        href={`#${link.id}`} 
                                        onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
                                        className="block py-3 px-4 text-base text-gray-300 hover:text-gray-100 hover:bg-[#656772]/20 rounded-lg transition-all duration-300"
                                    >
                                        <span className="text-[#656772] mr-2">0{index + 1}.</span>
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                        <div className="mt-8 text-center">
                            <a 
                                href="#contact"
                                onClick={(e) => { e.preventDefault(); scrollTo('contact'); }}
                                className="inline-block px-6 py-2 border-2 border-[#656772] text-[#656772] hover:bg-[#656772]/20 rounded-lg transition-all duration-300"
                            >
                                Get In Touch
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

