import  { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import Button from "./Button";
import Input from "./Input";
import Logo from "./Logo";
import { provider, auth, signInWithPopup } from "./Firebase"; 
import { login } from "../store/authSlice";

import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";

function Signup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');  
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createUser = async (e) => {
    e.preventDefault();
    console.log("Signup request:", { name, email, password }); // Debugging line
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `http://localhost:3000/auth/signup`, // Correct usage
        { name, email, password },
        { withCredentials: true }
      );

      const { user, token } = response.data;
      if (user) {
        dispatch(login({ userData: user, token }));
        localStorage.setItem('userData', JSON.stringify(user));
        console.log(localStorage.getItem('userData') || '{}');
        navigate("/");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Signup failed");
      console.error("Signup error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider); // Make sure you have your auth and provider set up
      const user = result.user;
  
      if (user) {
        // Send user's email and name to the backend
        const response = await axios.post("http://localhost:3000/auth/google-signup", {
          email: user.email,
          name: user.name || user.email.split('@')[0], // Fallback to a default name if displayName is not available
        });
  
        // Assuming your backend responds with the user data including their ID
        const userData = response.data;
        localStorage.setItem('userData', JSON.stringify(userData)); // Store the actual user data from backend
        dispatch(login({ userData })); // Store user data in Redux
        navigate("/"); // Redirect to the home page or desired page
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error.message);
      // Handle error accordingly (e.g., show a notification)
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <div className="mb-6 text-center">
          <Logo className="mx-auto mb-4" width="100px" />
          <h2 className="text-2xl font-bold text-gray-800">Create Your Account</h2>
          <p className="text-gray-600 mt-2">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        <form onSubmit={createUser} className="space-y-4">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Full Name"
            placeholder="Enter your full name"
          />
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            placeholder="Enter your email"
          />
          <div className="relative">
          <Input
            value={password}
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Choose a strong password"
          />
          {showPassword ? (
                <AiOutlineEyeInvisible
                  className="text-gray-500 text-[23px] cursor-pointer absolute right-2 pl-1 top-[38px] text-center flex items-center"
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <AiFillEye
                  className="text-gray-500 text-[23px] cursor-pointer absolute right-2 pl-1 top-[38px] text-center flex items-center"
                  onClick={() => setShowPassword(true)}
                />
              )}
              </div>
          <Button type="submit" className="w-full" loading={loading} disabled={loading}>
            {loading ? "Signing Up..." : "Create Account"}
          </Button>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          <div className="mt-4">
            <Button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 hover:bg-gray-50"
              onClick={handleGoogleSignIn}
            >
              <FcGoogle className="text-xl" />
              Sign Up with Google
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
