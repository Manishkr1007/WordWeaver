import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "./Button";
import Input from "./Input";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Logo from "./Logo";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import authService from "../appwrite/auth";
import GoogleSignIn from "../utils/GoogleSignIn";

function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setError("");
    setLoading(true);
    try {
      const userData = await authService.createAccount(data);
      if (userData) {
        const currentUser = await authService.getCurrentUser();
        if (currentUser) {
          dispatch(login({ userData: currentUser }));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async (response) => {
    try {
      const { credential } = response;
      const userData = await authService.signInWithGoogle(credential);
      dispatch(login({ userData }));
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create an account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(create)} className="mt-8">
          <div className="space-y-5">
            <Input
              {...register("name", { required: true })}
              label="Full Name : "
              placeholder="Full Name"
            />
            <Input
              {...register("email", {
                required: true,
                validate: (value) => {
                  if (!value.includes("@")) {
                    return "Email must include @";
                  }
                  return true;
                },
              })}
              label="Email : "
              placeholder="Email Address"
              type="email"
            />
            <div className="relative">
              <Input
                {...register("password", { required: true })}
                label="Password : "
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full"
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
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
          </div>
        </form>
        <div className="flex justify-center mt-5">
          <GoogleLogin
            onSuccess={handleGoogleSignIn}
            onError={(error) => {
              console.error("Google Sign-In Error:", error);
              setError("Google Sign-In failed. Please try again.");
            }}
          >
            <Button
              type="button"
              className="flex items-center w-full justify-center space-x-2 border border-gray-300 p-3 rounded-md hover:bg-gray-200 transition-all"
            >
              <FcGoogle className="text-xl" />
              <span>Sign Up with Google</span>
            </Button>
          </GoogleLogin>
        </div>
      </div>
    </div>
  );
}

export default Signup;
