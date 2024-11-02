import  { useState, useMemo } from 'react';
import Container from "../container/Container";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import Logo from '../Logo';
import { FiMenu, FiX } from "react-icons/fi";
import LogoutBtn from './LogoutBtn';
import Profile from '../../components/profile';

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = useMemo(() => [
        {
            name: (
                <div className="flex items-center">
                    <Logo className="w-6 h-6 mr-2" />
                    WordWeaver
                </div>
            ),
            slug: "/",
            active: !authStatus
        },
        {
            name: "WordWeaver",
            slug: "/wordweaver",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus
        },
        {
            name: "Profile",
            slug: "/profile",
            active: !authStatus
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus
        }
    ], [authStatus]);

    return (
        <header className='py-3 shadow bg-black' role="banner">
            <Container>
                <nav className='flex justify-between items-center' role="navigation" aria-label="Main Navigation">
                    {/* Logo and Title Section */}
                    <div className='flex items-center'>
                        <div className='w-20'>
                            <Link to="/" aria-label="Home">
                                <Logo />
                            </Link>
                        </div>
                        <div className='ml-2'>
                            <h1 className='text-2xl md:text-4xl font-bold text-white'>WordWeaver</h1>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className='flex items-center'>
                        <ul className='hidden md:flex md:items-center'>
                            {navItems.map((item) => item.active && (
                                <li key={item.slug} className='ml-4'>
                                    <Link
                                        to={item.slug}
                                        className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full bg-white text-black'
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                            {authStatus && (
                                <>
                                    <li className='ml-4'>
                                        <LogoutBtn />
                                    </li>
                                    <div className='w-20 ml-3'>
                                        <Link to="/dashboard" aria-label="Dashboard">
                                            <Profile />
                                        </Link>
                                    </div>
                                </>
                            )}
                        </ul>

                        {/* Mobile Menu Toggle Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className='md:hidden ml-4 text-white focus:outline-none'
                            aria-expanded={isMobileMenuOpen ? "true" : "false"}
                            aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
                        >
                            {isMobileMenuOpen ? <FiX className='w-6 h-6' /> : <FiMenu className='w-6 h-6' />}
                        </button>
                    </div>
                </nav>

                {/* Mobile Navigation Menu */}
                <ul className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                    {navItems.map((item) => item.active && (
                        <li key={item.slug} className='my-2'>
                            <Link
                                to={item.slug}
                                className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full text-white'
                                onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
                            >
                                {item.name}
                            </Link>
                        </li>
                    ))}
                    {authStatus && (
                        <li className='my-2'>
                            <LogoutBtn />
                        </li>
                    )}
                </ul>
            </Container>
        </header>
    );
}

export default Header;
