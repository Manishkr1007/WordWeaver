import React from 'react';
import { FaTwitter, FaLinkedin, FaInstagram, FaFacebookF, FaGithub, FaDribbble } from 'react-icons/fa';
import Logo from "../Logo";
import { Link } from "react-router-dom"

// FooterColumn Component
const FooterColumn = ({ title, links }) => (
    <div className="flex flex-col mb-6">
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <ul className="space-y-1">
            {links.map((link, index) => (
                <li key={index}>
                    <Link 
                        to={link.path} 
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                        {link.label}
                    </Link>
                </li>
            ))}
        </ul>
    </div>
);

function Footer() {
    const supportLinks = [
        { path: "/account", label: "Account" },
        { path: "/help", label: "Help" },
        { path: "/contact", label: "Contact Us" }
    ];

    const quickLinks = [
        { path: "/", label: "Home" },
        { path: "/blog", label: "Blog" }
    ];

    const legalLinks = [
        { path: "/terms", label: "Terms & Conditions" },
        { path: "/privacy", label: "Privacy Policy" }
    ];

  return (
    <footer className="bg-slate-900 py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0 md:space-x-8">
          
          {/* Logo Section */}
          <div className="flex flex-col items-center space-x-2">
            <Logo width="80px" className="mb-2 ml-2" />
            <span className="text-white text-lg font-bold ">WordWeaver</span>
            <p className="text-gray-400">Sharing Stories with the World.</p>
          </div>

          {/* Links Section */}
          <div className="flex space-x-8 text-gray-400">
            <a href="/" className="hover:text-white">About</a>
            <a href="/" className="hover:text-white">Privacy Policy</a>
            <a href="/" className="hover:text-white">Licensing</a>
          </div>

          {/* Subscription Section */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-xl font-semibold text-white mb-2">Subscribe to Our Newsletter</h3>
            <p className="mb-4 text-gray-400">Stay updated with the latest news and articles.</p>
            <div className="flex w-full space-x-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-white text-gray-900 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-64 mb-10 mt-14 ml-20">
          <FooterColumn title="Support" links={supportLinks} />
          <FooterColumn title="Quick Links" links={quickLinks} />
          <FooterColumn title="Legal" links={legalLinks} />
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-8 border-t border-slate-700 pt-6">
          <p className="text-gray-400 text-sm">
            &copy; 2024 WordWeaver. All Rights Reserved.
          </p>

          {/* Social Icons */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-white text-lg hover:text-gray-400" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-white text-lg hover:text-gray-400" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-white text-lg hover:text-gray-400" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebookF className="text-white text-lg hover:text-gray-400" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <FaGithub className="text-white text-lg hover:text-gray-400" />
            </a>
            <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer">
              <FaDribbble className="text-white text-lg hover:text-gray-400" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
