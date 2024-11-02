import PropTypes from 'prop-types'; // Import PropTypes for type checking

// Use dynamic import for the logo
const logoPath = 'img/Featherpenlogo.png'; // Updated path

function Logo({ width = "100%", className = "" }) {
  return (
    <img 
      src={logoPath}
      style={{ width }} 
      className={`rounded-full ${className}`.trim()} // Allow additional classes
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