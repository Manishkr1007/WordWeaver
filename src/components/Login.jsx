import { provider, auth, signInWithPopup } from "./firebase";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import Logo from "./Logo";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import GoogleSignIn from "../utils/GoogleSignIn";
import authService from "../appwrite/auth";
import { login as authLogin } from "../store/authSlice";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false); 
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, watch } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    setLoading(true);
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin({ userData }));
          setLoading(false);
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  // Google Sign-in
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user) {
        dispatch(authLogin({ userData: user }));
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle forgot password
  const handleForgotPassword = async (email) => {
    console.log("Attempting to send password reset email to:", email);
    try {
      await authService.resetPassword(email);
      setError("Check your email for a reset link.");
      setShowModal(false); 
    } catch (error) {
      console.error("Error sending password reset email:", error);
      setError(
        "Failed to send password reset email. Please check the email address."
      );
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`m-auto sm:w-full max-w-lg bg-gray-100 rounded-xl p-1 sm:p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email : "
              placeholder="Email Address"
              type="email"
              {...register("email", { required: true })}
            />
            <div className="relative">
              <Input
                label="Password : "
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                {...register("password", { required: true })}
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
            <Button
              type="submit"
              className="w-full"
              loading={loading}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Log In"}
            </Button>
            <div className="flex justify-between mt-3">
              <button
                type="button"
                onClick={() => setShowModal(true)} 
                className="text-primary hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <GoogleSignIn />
          </div>
        </form>

        {/* Google Sign-In Button */}
        <div className="flex justify-center mt-5">
          <Button
            type="button"
            className="flex items-center w-full justify-center space-x-2 border border-gray-300 p-3 rounded-md hover:bg-gray-200 transition-all"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle className="text-xl" />
            <span>Sign In with Google</span>
          </Button>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded shadow-lg">
            <h3 className="text-lg font-bold">Reset Password</h3>
            <p className="mt-2">Enter your email to receive a reset link.</p>
            <Input
              label="Email : "
              placeholder="Email Address"
              type="email"
              {...register("resetEmail", { required: true })}
            />
            <div className="mt-4 flex justify-end">
              <Button
                type="button"
                onClick={() => setShowModal(false)} 
                className="mr-2 border border-gray-300 rounded-md p-2"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={() => {
                  handleForgotPassword(watch("resetEmail")); 
                }}
                className="text-white bg-primary rounded-md p-2"
              >
                Send Reset Link
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
