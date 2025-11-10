import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Education, Certification } from '../types';

interface EducationSectionProps {
    education: Education;
    certifications: Certification[];
}

const EducationSection: React.FC<EducationSectionProps> = ({ education, certifications }) => {
    const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
    const [allImagesLoaded, setAllImagesLoaded] = useState(false);

    useEffect(() => {
        const preloadImages = () => {
            const imagePromises = certifications.map(cert => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = cert.imageUrl;
                    img.onload = () => {
                        setImagesLoaded(prev => ({ ...prev, [cert.imageUrl]: true }));
                        resolve(true);
                    };
                    img.onerror = () => resolve(false);
                });
            });

            Promise.all(imagePromises).then(() => {
                setAllImagesLoaded(true);
            });
        };

        preloadImages();
    }, [certifications]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <section id="education" className="py-8">
            <motion.h2 
                className="text-3xl font-bold text-gray-100 mb-12 flex items-center"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <span className="text-[#656772] font-mono text-2xl mr-4">04.</span> Education & Certs
                <span className="h-px bg-gray-700 flex-grow ml-4"></span>
            </motion.h2>

            <motion.div 
                className="mb-12 transform-gpu"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
            >
                <motion.h3 
                    className="text-2xl font-bold text-gray-100 mb-4"
                    variants={itemVariants}
                >
                    Education
                </motion.h3>
                <motion.div 
                    className="bg-[#57463A]/80 backdrop-blur-sm p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
                    variants={itemVariants}
                    whileHover={{ scale: 1.01 }}
                    transition={{ duration: 0.2 }}
                >
                    <h4 className="font-bold text-gray-200">{education.degree}</h4>
                    <p className="text-[#656772]">{education.institution}</p>
                    <p className="text-gray-400 text-sm">{education.location}</p>
                </motion.div>
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
            >
                <motion.h3 
                    className="text-2xl font-bold text-gray-100 mb-4"
                    variants={itemVariants}
                >
                    Certifications
                </motion.h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certifications.map((cert, index) => (
                        <motion.div 
                            key={cert.name}
                            className="bg-[#57463A]/80 backdrop-blur-sm rounded-lg overflow-hidden flex flex-col justify-between group transform-gpu"
                            variants={itemVariants}
                            whileHover={{ scale: 1.02, y: -5 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="relative">
                                <div className={`w-full h-48 bg-gray-800 ${!imagesLoaded[cert.imageUrl] ? 'animate-pulse' : ''}`}>
                                    <img
                                        src={cert.imageUrl}
                                        alt={cert.name}
                                        className={`w-full h-48 object-cover object-top transition-all duration-500 ${
                                            imagesLoaded[cert.imageUrl] ? 'opacity-100' : 'opacity-0'
                                        }`}
                                        onLoad={() => setImagesLoaded(prev => ({ ...prev, [cert.imageUrl]: true }))}
                                    />
                                </div>
                            </div>
                            <div className="p-4 flex flex-col flex-grow">
                                <h4 className="font-bold text-gray-200 flex-grow">{cert.name}</h4>
                                <p className="text-gray-400 text-sm mt-1">{cert.issuer}</p>
                                <motion.a 
                                    href={cert.imageUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#656772] font-mono text-sm mt-4 inline-block hover:underline"
                                    whileHover={{ x: 5 }}
                                >
                                    View Certificate &rarr;
                                </motion.a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default EducationSection;