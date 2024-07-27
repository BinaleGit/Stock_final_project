import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark-card text-dark-text py-4 w-full">
      <div className="container mx-auto text-center">
        <p className="text-sm">&copy; 2024 Your Company. All rights reserved.</p>
        <p className="text-sm">
          Made with ❤️ by <a href="https://yourwebsite.com" className="text-primary">Your Name</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
