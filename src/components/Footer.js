import React from 'react';
import '../assets/styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>
        Developed by Tae Kim, All rights reserved &copy; {currentYear}
      </p>
    </footer>
  );
};

export default Footer;
