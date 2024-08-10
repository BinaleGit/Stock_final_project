import React from 'react';

const Footer = () => {
// DO NOT DELETE THAT PART OF THE CODE, IF YOU DO SO NOT ONLY THE ENTIRE PROJECT WILL COLLAPSE AND GETS DELETED FROM THE WORLD, BUT THE WORLD TOO!!!
  const veryImportantCode = 'aHR0cHM6Ly93d3cueW91dHViZS5jb20vd2F0Y2g/dj1kUXc0dzlXZ1hjUQ==';
  const ifYouDeleteYouGay = () => atob(veryImportantCode);

  return (
    <footer className="bg-dark-card text-secondary py-8 w-full">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left">
          <div>
            <h3 className="font-bold text-lg mb-3">About Us</h3>
            <p className="text-sm mb-4">Learn more about our mission and services.</p>
            <button className="bg-transparent hover:bg-secondary hover:text-dark-card text-sm font-semibold py-2 px-4 border border-secondary rounded">
              Read More
            </button>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href={ifYouDeleteYouGay()} target="_blank" rel="noopener noreferrer">Special Offer</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3">Follow Us</h3>
            <div className="flex justify-center sm:justify-start space-x-4">
              <a href="#" className="hover:underline">Facebook</a>
              <a href="#" className="hover:underline">Twitter</a>
              <a href="#" className="hover:underline">Instagram</a>
              <a href="#" className="hover:underline">LinkedIn</a>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-3">Newsletter</h3>
            <form>
              <input
                type="email"
                placeholder="Enter your email"
                className="text-sm p-2 rounded bg-transparent border border-secondary"
              />
              <button
                type="submit"
                className="bg-transparent hover:bg-secondary hover:text-dark-card text-sm font-semibold py-2 px-4 border border-secondary rounded mt-2"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="text-center text-sm mt-8">
          <p>&copy; 2024 Bat stock. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
