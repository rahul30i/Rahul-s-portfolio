import { FC, ReactNode, Suspense } from 'react';
import { motion } from 'framer-motion';

interface LazySectionProps {
    children: ReactNode;
    id: string;
    title: string;
    number: string;
}

const LazySection: FC<LazySectionProps> = ({ children, id, title, number }) => {
    return (
        <section id={id} className="py-24">
            <h2 className="text-3xl font-bold text-gray-100 mb-12 flex items-center" data-aos="fade-right">
                <span className="text-[#656772] font-mono text-2xl mr-4">{number}</span> {title}
                <span className="h-px bg-gray-700 flex-grow ml-4"></span>
            </h2>
            <Suspense fallback={
                <div className="animate-pulse flex space-x-4">
                    <div className="flex-1 space-y-4 py-1">
                        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                        <div className="space-y-2">
                            <div className="h-4 bg-gray-700 rounded"></div>
                            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                        </div>
                    </div>
                </div>
            }>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                >
                    {children}
                </motion.div>
            </Suspense>
        </section>
    );
};

export default LazySection;