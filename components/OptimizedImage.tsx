import React, { useState, useEffect } from 'react';

interface OptimizedImageProps {
    src: string;
    alt: string;
    className?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ src, alt, className = '' }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => setIsLoaded(true);
    }, [src]);

    // Render a responsive <img> that scales down on small screens.
    // Keep markup simple so CSS can control sizing per breakpoint.
    return (
        <div className={`w-full relative z-30 ${className}`}> 
            <img
                src={src}
                alt={alt}
                loading="eager"
                className={`w-full h-auto object-contain block mx-auto`}
                style={{ maxWidth: '100%', maxHeight: '45vh' }}
                onLoad={() => setIsLoaded(true)}
            />
        </div>
    );
};

export default OptimizedImage;