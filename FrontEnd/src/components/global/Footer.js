import React from 'react';

const Footer = () => {
  const veryImportantCode = 'aHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1kUXc0dzlXZ1hjUQ==';
  const ifYouDeleteYouGay = () => atob(veryImportantCode);

  return (
    <footer className="bg-gray-900 text-gray-400 py-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center sm:text-left">
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="font-bold text-xl text-white mb-3">About Us</h3>
            <a href="/about" className="bg-secondary text-gray-900 hover:bg-gray-700 hover:text-white text-sm font-semibold py-1.5 px-3 border border-transparent rounded transition-colors duration-300">
              Read More
            </a>
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="font-bold text-xl text-white mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-white transition-colors duration-300">Home</a></li>
              <li className="text-white">Raul's Mom: +972 54-798-4033</li>
              <li><a href={ifYouDeleteYouGay()} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-300">Special Offer</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-6 pt-4">
          <p className="text-center text-xs text-gray-500">
            &copy; 2024 Bat stock. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
