import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface Section3DProps {
    children: React.ReactNode;
    className?: string;
}

const Section3D: React.FC<Section3DProps> = ({ children, className = '' }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const rotate = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            {
                threshold: 0.1
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    return (
        <motion.div
            ref={sectionRef}
            className={`relative transform-gpu ${className}`}
            style={{
                perspective: "1000px",
                y,
                opacity
            }}
            initial={false}
        >
            <motion.div
                className="relative"
                style={{
                    rotateX: rotate,
                    scale,
                    transformStyle: "preserve-3d"
                }}
            >
                {children}
            </motion.div>
        </motion.div>
    );
};

export default Section3D;