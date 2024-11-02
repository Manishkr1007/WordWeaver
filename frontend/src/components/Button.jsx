
function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    loading = false, // Add loading prop here
    ...props
}) {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className} ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
      disabled={loading} // Disable button if loading
      {...props}
    >
      {loading ? 'Loading...' : children} {/* Show loading text if loading */}
    </button>
  )
}

export default Button
