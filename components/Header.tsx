
import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#2E2B26]/80 shadow-lg backdrop-blur-sm' : 'bg-transparent'}`}>
            <nav className="w-full px-6 md:px-10 lg:px-16 py-4 flex justify-between items-center">
                <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('home'); }} className="text-2xl font-bold text-[#656772] font-mono">KR</a>
                
                {/* Desktop Menu */}
                <ul className="hidden md:flex items-center space-x-8 font-mono">
                    {navLinks.map((link, index) => (
                        <li key={link.id}>
                            <a href={`#${link.id}`} onClick={(e) => { e.preventDefault(); scrollTo(link.id); }} className="text-gray-300 hover:text-gray-100 transition-colors duration-300">
                                <span className="text-[#656772]">0{index + 1}.</span> {link.name}
                            </a>
                        </li>
                    ))}
                </ul>
                
                {/* Mobile Menu Button */}
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden z-50">
                     <div className="w-6 h-6 flex flex-col justify-around">
                        <span className={`block w-full h-0.5 bg-[#656772] transition-transform duration-300 ${isMenuOpen ? 'rotate-45 translate-y-[5px]' : ''}`}></span>
                        <span className={`block w-full h-0.5 bg-[#656772] transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`block w-full h-0.5 bg-[#656772] transition-transform duration-300 ${isMenuOpen ? '-rotate-45 -translate-y-[5px]' : ''}`}></span>
                    </div>
                </button>
            </nav>

            {/* Mobile Menu */}
            <div className={`fixed top-0 right-0 h-full bg-[#57463A] w-3/4 max-w-sm transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden`}>
                <ul className="flex flex-col items-center justify-center h-full space-y-8 font-mono text-lg">
                     {navLinks.map((link, index) => (
                        <li key={link.id}>
                            <a href={`#${link.id}`} onClick={(e) => { e.preventDefault(); scrollTo(link.id); }} className="text-gray-300 hover:text-gray-100 transition-colors duration-300">
                                <span className="text-[#656772]">0{index + 1}.</span> {link.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </header>
    );
};

export default Header;
