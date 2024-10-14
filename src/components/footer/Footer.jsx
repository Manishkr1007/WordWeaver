import React from 'react';
import { Link } from "react-router-dom";
import { FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import Logo from "../Logo";

function Footer() {
    return (
        <section className="relative overflow-hidden py-12 bg-slate-900">
            <div className="relative mx-auto max-w-7xl px-6">
                <div className="flex flex-col md:flex-row justify-between mb-12">
                    <div className="flex flex-col items-center md:items-start w-full md:w-1/3 mb-8 md:mb-0">
                        <Logo width="100px" className="mb-6" />
                        <h1 className="text-2xl font-bold text-white mb-4">WordWeaver</h1>
                        <p className="text-sm text-gray-400 text-center md:text-left">
                            Sharing Stories with the World
                        </p>
                    </div>
                    <div className="w-full md:w-1/3 mb-8 md:mb-0 text-center md:text-left">
                        <h3 className="text-xl font-semibold text-white mb-4">Subscribe to our Newsletter</h3>
                        <p className="text-gray-400 mb-4">Stay updated with the latest news and articles from WordWeaver.</p>
                        <form className="flex flex-col md:flex-row items-center justify-center md:justify-start">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-4 py-2 w-full md:w-auto text-gray-900 rounded-md mb-4 md:mb-0 md:mr-4"
                            />
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500">
                                Subscribe
                            </button>
                        </form>
                    </div>
                    <div className="w-full md:w-1/3 flex flex-col items-center md:items-start">
                        <h3 className="text-xl font-semibold text-white mb-4">Follow Us</h3>
                        <div className="flex space-x-4">
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                                <FaTwitter className="text-white text-2xl hover:text-gray-400" />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                                <FaLinkedin className="text-white text-2xl hover:text-gray-400" />
                            </a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                                <FaInstagram className="text-white text-2xl hover:text-gray-400" />
                            </a>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between mb-12">
                    <div className="w-full md:w-1/4 mb-8 md:mb-0">
                        <h3 className="text-lg font-semibold text-white mb-6">Support</h3>
                        <ul className="space-y-4">
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

                    {/* Quick Links Section */}
                    <div className="w-full md:w-1/4 mb-8 md:mb-0">
                        <h3 className="text-lg font-semibold text-white mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link className="text-base font-medium text-gray-400 hover:text-white" to="/">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link className="text-base font-medium text-gray-400 hover:text-white" to="/">
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link className="text-base font-medium text-gray-400 hover:text-white" to="/about">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Section */}
                    <div className="w-full md:w-1/4">
                        <h3 className="text-lg font-semibold text-white mb-6">Legals</h3>
                        <ul className="space-y-4">
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
                </div>
                <div className="text-center">
                    <p className="text-sm text-gray-400">
                        &copy; 2024 WordWeaver. All Rights Reserved.
                    </p>
                </div>
            </div>
        </section>
    );
}
export default Footer;
