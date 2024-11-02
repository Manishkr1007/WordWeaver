import React from "react";
import { loaded } from "../../src/assets";
import Lottie from "lottie-react";

const Loader = () => {
  return (
    <Lottie
      animationData={loaded}
      loop={true}
      alt="Loading"
      className="w-96 h-96 justify-center items-center flex"
    />
  );
};

export default Loader;