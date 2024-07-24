// src/components/Popover.js
import React, { useState } from 'react';

const Popover = ({ stockName, onClose, onClick, position }) => {
    const [animationClass, setAnimationClass] = useState('pop');

    const handleClose = (e) => {
        e.stopPropagation();
        setAnimationClass('unpop');
        setTimeout(onClose, 500); // Match the duration of the "unpop" animation
    };

    const popoverStyle = {
        top: `${105 + position * 60}px`,
        right: '16px'
    };

    return (
        <div style={popoverStyle} className={`fixed bg-dark-card p-4 shadow-lg rounded-lg cursor-pointer border border-gray-600 ${animationClass}`} onClick={onClick}>
            <div className="flex justify-between items-center">
                <span className="text-white font-semibold">{stockName}</span>
                <button className="text-gray-400 hover:text-gray-200 focus:outline-none" onClick={handleClose}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Popover;
