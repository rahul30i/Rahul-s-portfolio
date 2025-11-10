import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import '../src/styles/noise.css';

interface ParticleShape {
    shape: 'circle' | 'square' | 'triangle' | 'diamond' | 'hexagon' | 'star';
    size: number;
    color: string;
    x: number;
    y: number;
    z: number;
    scale: number;
    opacity: number;
    angle: number;
}

interface Dot extends ParticleShape {
    vx: number;
    vy: number;
    intensity: number;
    rotationSpeed: number;
}

interface GridLine {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

const ParticleShapeComponent: React.FC<ParticleShape> = ({ 
    shape, 
    size, 
    color, 
    x, 
    y, 
    z, 
    scale, 
    opacity, 
    angle 
}) => {
    const finalOpacity = opacity * (1 - Math.abs(z) * 0.005);
    const transform = `translate(${x}px, ${y}px) rotate(${angle}deg) scale(${scale})`;
    const glowStrength = Math.random() * 2 + 1;
    const baseStyle = {
        transform,
        opacity: finalOpacity,
        filter: `url(#neonGlow) drop-shadow(0 0 ${glowStrength}px ${color})`,
        transition: 'all 0.3s ease-out'
    };

    switch (shape) {
        case 'circle':
            return (
                <circle
                    cx={0}
                    cy={0}
                    r={size}
                    fill={color}
                    style={baseStyle}
                />
            );
        case 'square':
            return (
                <rect
                    x={-size}
                    y={-size}
                    width={size * 2}
                    height={size * 2}
                    fill={color}
                    style={baseStyle}
                    rx={size * 0.2}
                />
            );
        case 'triangle': {
            const points = `0,${-size} ${size * 0.866},${size/2} ${-size * 0.866},${size/2}`;
            return (
                <polygon
                    points={points}
                    fill={color}
                    style={baseStyle}
                />
            );
        }
        case 'diamond': {
            const points = `0,${-size} ${size},0 0,${size} ${-size},0`;
            return (
                <polygon
                    points={points}
                    fill={color}
                    style={baseStyle}
                />
            );
        }
        case 'hexagon': {
            const a = size * 0.866;
            const points = `${size},0 ${a},${-size/2} ${-a},${-size/2} ${-size},0 ${-a},${size/2} ${a},${size/2}`;
            return (
                <polygon
                    points={points}
                    fill={color}
                    style={baseStyle}
                />
            );
        }
        case 'star': {
            const outerRadius = size;
            const innerRadius = size * 0.4;
            const points = Array.from({length: 10}, (_, i) => {
                const angle = (Math.PI / 5) * i;
                const r = i % 2 === 0 ? outerRadius : innerRadius;
                const x = Math.cos(angle) * r;
                const y = Math.sin(angle) * r;
                return `${x},${y}`;
            }).join(' ');
            return (
                <polygon
                    points={points}
                    fill={color}
                    style={baseStyle}
                />
            );
        }
        default:
            return null;
    }
};

const TechBackground: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const backgroundY = useTransform(scrollY, [0, 1000], [0, 150]);
    const [dots, setDots] = useState<Dot[]>([]);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [gridLines, setGridLines] = useState<GridLine[]>([]);

    const colors = [
        '#4FACFE', '#00F2FE', '#00D2FF', '#0A84FF',
        'rgba(79, 172, 254, 0.8)',
        'rgba(0, 242, 254, 0.8)',
        'rgba(0, 210, 255, 0.8)',
        'rgba(10, 132, 255, 0.8)'
    ];

    const glowColors = [
        'rgba(79, 172, 254, 0.2)',
        'rgba(0, 242, 254, 0.2)',
        'rgba(0, 210, 255, 0.2)',
        'rgba(10, 132, 255, 0.2)'
    ];

    const shapes = ['circle', 'square', 'triangle', 'diamond', 'hexagon', 'star'] as const;

    const initializeGrid = useCallback(() => {
        const gridSize = 50;
        const cols = Math.ceil(window.innerWidth / gridSize);
        const rows = Math.ceil(window.innerHeight / gridSize);
        const lines: GridLine[] = [];

        // Create horizontal lines
        for (let i = 0; i <= rows; i++) {
            lines.push({
                x1: 0,
                y1: i * gridSize,
                x2: window.innerWidth,
                y2: i * gridSize
            });
        }

        // Create vertical lines
        for (let i = 0; i <= cols; i++) {
            lines.push({
                x1: i * gridSize,
                y1: 0,
                x2: i * gridSize,
                y2: window.innerHeight
            });
        }

        setGridLines(lines);
    }, []);

    const initializeDots = useCallback(() => {
        const dotCount = Math.min(
            Math.floor((window.innerWidth * window.innerHeight) / 20000),
            100
        );
        const newDots = Array.from({ length: dotCount }, () => ({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            z: Math.random() * 300 - 150,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            size: Math.random() * 4 + 2,
            color: colors[Math.floor(Math.random() * colors.length)],
            shape: shapes[Math.floor(Math.random() * shapes.length)],
            angle: Math.random() * 360,
            scale: Math.random() * 0.5 + 0.5,
            opacity: Math.random() * 0.5 + 0.5,
            intensity: Math.random() * 0.5 + 0.5,
            rotationSpeed: (Math.random() - 0.5) * 2
        }));

        setDots(newDots);
        setDimensions({
            width: window.innerWidth,
            height: window.innerHeight
        });
    }, [colors, shapes]);

    useEffect(() => {
        initializeDots();
        initializeGrid();

        const handleResize = () => {
            initializeDots();
            initializeGrid();
        };

        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [initializeDots, initializeGrid]);

    useEffect(() => {
        let animationFrameId: number;
        const animate = () => {
            setDots(prevDots => prevDots.map(dot => {
                const dx = mousePosition.x - dot.x;
                const dy = mousePosition.y - dot.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = 150;

                let newVx = dot.vx;
                let newVy = dot.vy;
                let newX = dot.x;
                let newY = dot.y;
                let newAngle = dot.angle;

                if (distance < maxDistance) {
                    const force = (1 - distance / maxDistance) * 0.3;
                    newVx -= (dx / distance) * force;
                    newVy -= (dy / distance) * force;
                }

                newX += newVx;
                newY += newVy;
                newAngle += dot.rotationSpeed;

                // Keep dots within bounds
                if (newX < 0) {
                    newX = 0;
                    newVx *= -1;
                }
                if (newX > window.innerWidth) {
                    newX = window.innerWidth;
                    newVx *= -1;
                }
                if (newY < 0) {
                    newY = 0;
                    newVy *= -1;
                }
                if (newY > window.innerHeight) {
                    newY = window.innerHeight;
                    newVy *= -1;
                }

                return {
                    ...dot,
                    x: newX,
                    y: newY,
                    vx: newVx * 0.99,
                    vy: newVy * 0.99,
                    angle: newAngle % 360
                };
            }));

            animationFrameId = requestAnimationFrame(animate);
        };

        animationFrameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrameId);
    }, [mousePosition]);

    return (
        <motion.div
            ref={containerRef}
            className="fixed inset-0 -z-10 overflow-hidden perspective-1000 tech-background"
            style={{ transform: `translateY(${backgroundY}px)` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-[#041E42] via-[#04293A] to-[#064663] opacity-95"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.95 }}
                transition={{ duration: 1.5 }}
            >
                <div className="absolute inset-0 mix-blend-overlay bg-noise" />
                <motion.div 
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(circle at 50% 50%, rgba(79, 172, 254, 0.15), transparent 70%)',
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div 
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(circle at 20% 20%, rgba(0, 242, 254, 0.12), transparent 50%)',
                    }}
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <motion.div 
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(circle at 80% 80%, rgba(0, 210, 255, 0.12), transparent 50%)',
                    }}
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                <div className="absolute inset-0 tech-pattern opacity-40">
                    <motion.div
                        className="w-full h-full"
                        animate={{
                            backgroundPosition: ['0% 0%', '100% 100%'],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                </div>
            </motion.div>

            <motion.svg
                className="absolute inset-0 w-full h-full transform-gpu pointer-events-none"
                style={{ transform: 'translateZ(0)' }}
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <defs>
                    <filter id="neonGlow">
                        <feFlood floodColor="#4FACFE" result="glow1" />
                        <feFlood floodColor="#00F2FE" result="glow2" />
                        <feComposite operator="in" in="glow1" in2="SourceGraphic" result="neon1" />
                        <feComposite operator="in" in="glow2" in2="SourceGraphic" result="neon2" />
                        <feGaussianBlur in="neon1" stdDeviation="2" result="blur1" />
                        <feGaussianBlur in="neon2" stdDeviation="3" result="blur2" />
                        <feComponentTransfer in="blur1" result="bright1">
                            <feFuncA type="linear" slope="3" intercept="0" />
                        </feComponentTransfer>
                        <feComponentTransfer in="blur2" result="bright2">
                            <feFuncA type="linear" slope="2" intercept="0" />
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode in="bright1" />
                            <feMergeNode in="bright2" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    <linearGradient id="lineGradient" gradientTransform="rotate(45)">
                        <stop offset="0%" stopColor="#4FACFE" stopOpacity="0.3">
                            <animate attributeName="stopOpacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite" />
                        </stop>
                        <stop offset="50%" stopColor="#00F2FE" stopOpacity="0.2">
                            <animate attributeName="stopOpacity" values="0.2;0.4;0.2" dur="3s" repeatCount="indefinite" />
                        </stop>
                        <stop offset="100%" stopColor="#00D2FF" stopOpacity="0.3">
                            <animate attributeName="stopOpacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite" />
                        </stop>
                    </linearGradient>

                    <pattern id="techGrid" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="url(#lineGradient)" strokeWidth="0.5">
                            <animate attributeName="strokeWidth" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
                        </path>
                        <circle cx="0" cy="0" r="1" fill="#4FACFE" opacity="0.5" filter="url(#neonGlow)">
                            <animate attributeName="r" values="1;1.5;1" dur="2s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="50" cy="0" r="1" fill="#00F2FE" opacity="0.5" filter="url(#neonGlow)">
                            <animate attributeName="r" values="1;1.5;1" dur="2s" repeatCount="indefinite" begin="0.5s" />
                        </circle>
                        <circle cx="0" cy="50" r="1" fill="#00D2FF" opacity="0.5" filter="url(#neonGlow)">
                            <animate attributeName="r" values="1;1.5;1" dur="2s" repeatCount="indefinite" begin="1s" />
                        </circle>
                    </pattern>

                    <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#4FACFE" stopOpacity="0.3">
                            <animate attributeName="stopOpacity" values="0.3;0.1;0.3" dur="4s" repeatCount="indefinite" />
                        </stop>
                        <stop offset="100%" stopColor="#00F2FE" stopOpacity="0">
                            <animate attributeName="stopOpacity" values="0;0.1;0" dur="4s" repeatCount="indefinite" />
                        </stop>
                    </radialGradient>
                </defs>

                <rect width="100%" height="100%" fill="url(#techGrid)" className="animate-pulse-slow" />

                <g className="grid-lines">
                    {gridLines.map((line, i) => (
                        <line
                            key={i}
                            x1={line.x1}
                            y1={line.y1}
                            x2={line.x2}
                            y2={line.y2}
                            stroke="url(#lineGradient)"
                            strokeWidth="0.5"
                            strokeOpacity="0.3"
                            filter="url(#neonGlow)"
                        />
                    ))}
                </g>

                <g className="particles">
                    {dots.map((dot, i) => (
                        <g key={i}>
                            <ParticleShapeComponent {...dot} />
                        </g>
                    ))}
                </g>
            </motion.svg>

            <style dangerouslySetInnerHTML={{
                __html: `
                    @keyframes pulse {
                        0% { transform: scale(1); opacity: 0.2; }
                        50% { transform: scale(1.5); opacity: 0.1; }
                        100% { transform: scale(1); opacity: 0.2; }
                    }
                    @keyframes pulse-slow {
                        0% { opacity: 0.1; }
                        50% { opacity: 0.3; }
                        100% { opacity: 0.1; }
                    }
                    .perspective-1000 {
                        perspective: 1000px;
                    }
                    .tech-background {
                        transform-style: preserve-3d;
                    }
                    .animate-pulse-slow {
                        animation: pulse-slow 4s ease-in-out infinite;
                    }
                `
            }} />
        </motion.div>
    );
};

export default TechBackground;