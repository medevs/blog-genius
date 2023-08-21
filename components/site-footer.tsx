import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 p-8 text-white dark:bg-gray-800">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} Blog Genius. Made with ❤️ By Ahmed</p>
      </div>
    </footer>
  );
};

export default Footer;