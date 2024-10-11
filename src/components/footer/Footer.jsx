import React from 'react';
import { Link } from "react-router-dom";
import Logo from "../Logo"; // Assuming Logo is a component that renders your logo

function Footer() {
    return (
        <section className="relative overflow-hidden py-10 bg-slate-900">
            <div className="relative z-10 mx-auto max-w-7xl px-4 flex flex-col md:flex-row justify-between items-center">
                {/* Logo and Title Section */}
                <div className="w-full md:w-5/12 mb-8 md:mb-0">
                    <div className="flex flex-col justify-center items-center md:items-start">
                        <div className="mb-4">
                            <Logo width="100px" /> {/* Logo component */}
                        </div>
                        <h1 className='mb-4 text-2xl font-bold text-white'>WordWeaver</h1> {/* Changed font size for better visibility */}
                        <p className="text-sm text-gray-400 text-center md:text-left">
                            &copy; 2024 WordWeaver. All Rights Reserved. {/* Text color updated for better contrast */}
                        </p>
                    </div>
                </div>

                {/* Support and Legal Links Section */}
                <div className="w-full md:w-7/12 flex flex-col md:flex-row justify-between">
                    {/* Support Links */}
                    <div className="mb-8 md:mb-0">
                        <h3 className="tracking-px mb-4 text-xs font-semibold uppercase text-white">
                            Support
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link className="text-base font-medium text-gray-400 hover:text-white" to="/">
                                    Account
                                </Link>
                            </li>
                            <li>
                                <Link className="text-base font-medium text-gray-400 hover:text-white" to="/">
                                    Help
                                </Link>
                            </li>
                            <li>
                                <Link className="text-base font-medium text-gray-400 hover:text-white" to="/contact">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div className="mb-8 md:mb-0">
                        <h3 className="tracking-px mb-4 text-xs font-semibold uppercase text-white">
                            Legals
                        </h3>
                        <ul className="space-y-2">
                            <li>
                                <Link className="text-base font-medium text-gray-400 hover:text-white" to="/">
                                    Terms &amp; Conditions
                                </Link>
                            </li>
                            <li>
                                <Link className="text-base font-medium text-gray-400 hover:text-white" to="/">
                                    Privacy Policy
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media Section */}
                    <div className="flex flex-col items-center">
                        <h3 className="tracking-px mb-4 text-xs font-semibold uppercase text-white">
                            Follow Us
                        </h3>
                        <div className="flex space-x-4">
                            {/* Placeholder links for social media */}
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                <i className="fab fa-facebook-f"></i> {/* FontAwesome icon placeholder for Facebook */}
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                <i className="fab fa-twitter"></i> {/* FontAwesome icon placeholder for Twitter */}
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                                <i className="fab fa-instagram"></i> {/* FontAwesome icon placeholder for Instagram */}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Footer;