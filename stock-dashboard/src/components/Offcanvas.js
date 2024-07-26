import React from 'react';

const Offcanvas = ({ isOpen, onClose, children }) => {
    return (
        <div className={`fixed inset-0 z-40 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out`}>
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
            <div className="absolute right-0 bg-dark-card w-80 h-full shadow-xl p-4 border rounded-lg overflow-y-auto"
                style={{ maxWidth: '90%', zIndex: 50 }}>
                <button className="text-dark-text focus:outline-none transition-colors duration-200 hover:bg-gray-200 rounded-full p-1"
                        onClick={onClose}>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
                {children}
            </div>
        </div>
    );
};

export default Offcanvas;
