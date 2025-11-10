import React, { useState, useEffect } from 'react';

interface OptimizedImageProps {
    src: string;
    alt: string;
    className?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({ src, alt, className }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => setIsLoaded(true);
    }, [src]);

    return (
        <div className={`relative ${className}`}>
            <img
                src={src}
                alt={alt}
                loading="eager"
                className={`${className} transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setIsLoaded(true)}
            />
            {!isLoaded && (
                <div className="absolute inset-0 bg-gray-800 animate-pulse" />
            )}
        </div>
    );
};

export default OptimizedImage;