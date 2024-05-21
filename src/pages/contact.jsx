import React from 'react';
import linkedin from '../assets/img/linkedin.png';
import github from '../assets/img/github.png';
import email from '../assets/img/gmail.png';
import phone from '../assets/img/telephone.png';

function Contact() {
  return (
    <div className="bg-gray-300 flex flex-col items-center justify-center  h-screen">
      <h1 className="text-3xl font-extrabold mb-6 text-black shadow-lg p-4 rounded-lg">Contact Us</h1>

      <div className="bg-white p-24 rounded-lg shadow-lg text-center">
        
        <div className="flex justify-center space-x-6">
          <a href="https://www.linkedin.com/in/manish-kumar-he-him-5292b8247/" className="text-gray-600 hover:text-blue-700" target="_blank" rel="noopener noreferrer">
            <img src={linkedin} alt="LinkedIn" className="h-8 hover:scale-110 transition transform duration-300"/>
          </a>
          <a href="https://github.com/Manishkr1007" className="text-gray-600 hover:text-black" target="_blank" rel="noopener noreferrer">
            <img src={github} alt="GitHub" className="h-8 hover:scale-110 transition transform duration-300"/>
          </a>
          <a href="tel:+919693510834" className="text-gray-600 hover:text-green-600">
            <img src={phone} alt="Phone" className="h-8 hover:scale-110 transition transform duration-300"/>
          </a>
          <a href="mailto:manishkr061210@gmail.com" className="text-gray-600 hover:text-red-600">
            <img src={email} alt="Email" className="h-8 hover:scale-110 transition transform duration-300"/>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
