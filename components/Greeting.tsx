import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import '../src/styles/animations.css'; // Add this import at the top

const greetings = ["Hello", "नमस्ते", "Bonjour", "Hola", "你好", "Konnichiwa", "Guten Tag", "Olá"];
const GREETING_INTERVAL = 500; // ms between greetings
const FADE_TIME = 300; // ms for fade transition

interface GreetingProps {
    onFinished: () => void;
}

const Greeting: React.FC<GreetingProps> = ({ onFinished }) => {
    const [index, setIndex] = useState(0);
    const [isFadingOut, setIsFadingOut] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        console.log('Greeting component mounted');
        return () => console.log('Greeting component unmounting');
    }, []);

    useEffect(() => {
        let timeoutId: number;
        let fadeTimeoutId: number;

        const handleNextGreeting = () => {
            console.log('Moving to next greeting:', index + 1);
            setIndex(prevIndex => prevIndex + 1);
            setIsFadingOut(false);
        };

        const handleExit = () => {
            console.log('Calling onFinished callback');
            setIsExiting(false);
            onFinished();
        };
        
        if (index >= greetings.length) {
            console.log('Greetings finished, triggering exit sequence');
            setIsExiting(true);
            timeoutId = window.setTimeout(handleExit, FADE_TIME + 200);
        } else {
            timeoutId = window.setTimeout(() => {
                setIsFadingOut(true);
                fadeTimeoutId = window.setTimeout(handleNextGreeting, FADE_TIME);
            }, GREETING_INTERVAL);
        }

        return () => {
            if (timeoutId) window.clearTimeout(timeoutId);
            if (fadeTimeoutId) window.clearTimeout(fadeTimeoutId);
        };
    }, [index, onFinished]);

    return (
        <div 
            className={`fixed inset-0 bg-[#2E2B26] z-[100] flex items-center justify-center transition-all duration-500 ease-in-out ${
                isExiting ? 'opacity-0' : 'opacity-100'
            }`}
        >
            <div className="relative w-full h-full flex items-center justify-center">
                {index < greetings.length && (
                     <h1 
                        className={`absolute text-[#656772] font-mono text-5xl md:text-7xl transition-all duration-300 ease-in-out transform ${
                            isFadingOut ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                        }`}
                     >
                        {greetings[index]}
                     </h1>
                )}

                {/* Dynamic light effect */}
                <div className="absolute inset-0">
                    <div 
                        className="absolute inset-0 pulse-animation"
                        style={{
                            background: 'radial-gradient(circle at 50% 50%, rgba(67, 14, 24, 0.2) 0%, transparent 70%)'
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Greeting;
