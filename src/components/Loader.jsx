import loadGif from "../assets/load.gif"; // Update the path according to your project structure

function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
      <img src={loadGif} alt="Loading..." className=" w-40 h-40" />
    </div>
  );
}

export default Loader;
