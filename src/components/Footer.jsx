import React from "react";
import '../App.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div>
        <a href="/about">About Us</a> | 
        <a href="/faq">FAQ</a> | 
        <a href="/contact">Contact Us</a> | 
        <a href="/legal">Legal & Policy</a>
      </div>
      <div>
        © 2025 [Your Company Name]
      </div>
    </footer>
  );
};

export default Footer;