import React from 'react'
import {Link} from "react-router-dom"
import Logo from "../Logo"
import contact from '../../pages/contact';

function Footer() {
    return (
        <section className="relative overflow-hidden py-10 bg-gray-400 border border-t-2 border-t-black">
            <div className="relative z-10 mx-auto max-w-7xl px-4 flex justify-center items-center">
                <div className="-m-6 flex flex-wrap">
                    <div className="w-full p-6 md:w-1/2 lg:w-5/12 mb-8 md:mb-0 md:pr-6">
                        <div className="flex h-full flex-col justify-center items-center md:justify-between">
                            <div className="mb-4 inline-flex items-center">
                                <Logo width="100px" />
                            </div>
                            <h1 className='mb-10 text-1xl font-bold text-gray-800'>WordWeaver</h1>
                            <div>
                                <p className="text-sm md:text-center text-gray-600">
                                    &copy; Copyright 2024. All Rights Reserved by WordWeaver.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full p-6  md:w-1/2 lg:w-7/12 md:items-start">
                        <div className="flex flex-wrap  justify-between">
                            {/* <div className="w-full md:w-1/2 lg:w-1/4 mb-8 md:mb-0 ">
                                <h3 className="tracking-px mb-4 md:mb-9 text-xs text-center md:text-left font-semibold uppercase text-gray-500">
                                    Company
                                </h3>
                                <ul  className='flex flex-col items-center md:flex-none md:items-start' >
                                    <li className="mb-2 md:mb-4 ">
                                        <Link
                                            className="text-base font-medium text-gray-900 hover:text-gray-700"
                                            to="/"
                                        >
                                            Features
                                        </Link>
                                    </li>
                                    <li className="mb-4  ">
                                    <Link
                                        className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                        to="/"
                                    >
                                        Pricing
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                        to="/"
                                    >
                                        Affiliate Program
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                        to="/"
                                    >
                                        Press Kit
                                    </Link>
                                </li>
                                </ul>
                            </div> */}
                            <div className="w-full p-6 md:p-0 md:w-1/2 lg:w-2/12">
                        <div className="w-full md:w-1/2 lg:w-1/4 mb-8 md:mb-0">
                            <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500  text-center md:text-left">
                                Support
                            </h3>
                            <ul className='flex flex-col items-center md:flex-none md:items-start'>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                        to="/"
                                    >
                                        Account
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                        to="/"
                                    >
                                        Help
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                        to="/contact"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                        to="/"
                                    >
                                        Customer Support
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="w-full md:p-0 p-6 md:w-1/2 lg:w-3/12">
                        <div className="h-full">
                            <h3 className="tracking-px mb-9  text-xs font-semibold uppercase text-gray-500 text-center md:text-left">
                                Legals
                            </h3>
                            <ul className='flex flex-col  items-center md:flex-none md:items-start'>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                        to="/"
                                    >
                                        Terms &amp; Conditions
                                    </Link>
                                </li>
                                <li className="mb-4">
                                    <Link
                                        className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                        to="/"
                                    >
                                        Privacy Policy
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className=" text-base font-medium text-gray-900 hover:text-gray-700"
                                        to="/"
                                    >
                                        Licensing
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                        </div>
                    </div>--
                </div>
            </div>
        </section>
    );
}

export default Footer;