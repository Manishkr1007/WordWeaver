
import linkedin from '../assets/img/linkedin.png';
import github from '../assets/img/github.png';
import email from '../assets/img/gmail.png';
import phone from '../assets/img/telephone.png';

function Contact() {
  return (
    <div className="bg-gray-300 flex flex-col items-center justify-center h-screen">
      <div className="bg-white p-12 rounded-lg shadow-lg text-center contact-container">
        
        <h1 className="text-2xl font-extrabold mb-6 text-black">Contact Us</h1>

        <form className="contact-form">
          <div className="form-group">
            <label htmlFor="name" className="font-semibold text-left">Full Name</label>
            <input type="text" id="name" className="input-field" placeholder="Enter your full name" />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="font-semibold text-left">Email Address</label>
            <input type="email" id="email" className="input-field" placeholder="Enter your email" />
          </div>

          <div className="form-group">
            <label htmlFor="message" className="font-semibold text-left">Message</label>
            <textarea id="message" className="input-field" rows="4" placeholder="Enter your message"></textarea>
          </div>

          <button type="submit" className="submit-btn">Send</button>
        </form>

        
        <hr className="divider my-6" />

        
        <div className="flex justify-center space-x-6">
          <a href="https://www.linkedin.com/in/manish-kumar-he-him-5292b8247/" className="text-gray-600 hover:text-blue-700" target="_blank" rel="noopener noreferrer">
            <img src={linkedin} alt="LinkedIn" className="h-8 hover:scale-110 transition transform duration-300" />
          </a>
          <a href="https://github.com/Manishkr1007" className="text-gray-600 hover:text-black" target="_blank" rel="noopener noreferrer">
            <img src={github} alt="GitHub" className="h-8 hover:scale-110 transition transform duration-300" />
          </a>
          <a href="tel:+919693510834" className="text-gray-600 hover:text-green-600">
            <img src={phone} alt="Phone" className="h-8 hover:scale-110 transition transform duration-300" />
          </a>
          <a href="mailto:manishkr061210@gmail.com" className="text-gray-600 hover:text-red-600">
            <img src={email} alt="Email" className="h-8 hover:scale-110 transition transform duration-300" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
