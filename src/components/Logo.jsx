import PropTypes from 'prop-types'; // Import PropTypes for type checking
import logo from "/img/Featherpenlogo.png"; // Updated path

function Logo({ width = "100%", className = "" }) {
  return (
    <img 
      src={logo} 
      style={{ width }} 
      className={`rounded-full ${className}`} // Allow additional classes
      alt='WordWeaver Logo' // More descriptive alt text
    />
  ); 
}

// Define prop types
Logo.propTypes = {
  width: PropTypes.string,
  className: PropTypes.string,
};

export default Logo;