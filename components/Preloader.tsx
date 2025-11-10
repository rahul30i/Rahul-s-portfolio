
import React from 'react';

const Preloader: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-[#2E2B26]">
            <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-[#656772]"></div>
                <p className="text-[#656772] font-mono text-lg">Loading assets...</p>
            </div>
        </div>
    );
};

export default Preloader;
