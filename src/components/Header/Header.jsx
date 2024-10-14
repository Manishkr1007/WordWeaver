import React, { useState } from 'react';
import Container from "../container/Container";
import { Link } from "react-router-dom";
import LogoutBtn from './LogoutBtn';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logo from '../Logo'; // Ensure this path is correct
import { FiMenu, FiX } from "react-icons/fi";
import Profile from '../../components/profile';

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        {
            name: (
                <div className="flex items-center">
                    <Logo className="w-6 h-6 mr-2" /> {/* Use Logo component */}
                    WordWeaver
                </div>
            ),
            slug: "/",
            active: !authStatus
        },
        {
            name: "WordWeaver", // New button added
            slug: "/wordweaver", // Define the slug for the new button
            active: true // Set active to true to always show this button
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
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus
        }
    ];

    return (
        <header className='py-3 shadow bg-black'>
            <Container>
                <nav className='flex justify-between items-center'>
                    <div className='flex items-center'>
                        <div className='w-20'>
                            <Link to="/">
                                <Logo />
                            </Link>
                        </div>
                        <div className='ml-2'>
                            <h1 className='text-2xl md:text-4xl font-bold text-white'>WordWeaver</h1>
                        </div>
                    </div>
                    <div className='flex items-center'>
                        <ul className='hidden md:flex md:items-center'>
                            {navItems.map((item) => item.active ? (
                                <li key={item.name} className='ml-4'>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full bg-white text-black'
                                    >
                                        {item.name}
                                    </button>
                                </li>
                            ) : null)}
                            {authStatus && (
                                <li className='ml-4'>
                                    <LogoutBtn />
                                </li>
                            )}
                            {authStatus && (
                                <div className='w-20 ml-3'>
                                    <Link to="/dashboard">
                                        <Profile />
                                    </Link>
                                </div>
                            )}
                        </ul>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className='md:hidden ml-4 text-white focus:outline-none'
                        >
                            {isMobileMenuOpen ? <FiX className='w-6 h-6' /> : <FiMenu className='w-6 h-6' />}
                        </button>
                    </div>
                </nav>
                <ul className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
                    {navItems.map((item) => item.active ? (
                        <li key={item.name} className='my-2'>
                            <button
                                onClick={() => navigate(item.slug)}
                                className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full text-white'
                            >
                                {item.name}
                            </button>
                        </li>
                    ) : null)}
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