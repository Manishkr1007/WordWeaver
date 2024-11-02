import { Link, useNavigate } from "react-router-dom";
import  { useState } from "react"; 
import Button from "./Button";
import Input from "./Input";
import Logo from "./Logo";
import { AiFillEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/authSlice";
import axios from "axios";
import { provider, auth, signInWithPopup } from "./Firebase"; 

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(
        `http://localhost:3000/auth/login`,
        { email: data.email, password: data.password },
        { withCredentials: true }
      );

      const { user, token } = response.data;
      if (user) {
        dispatch(authLogin({ userData: user, token }));
        localStorage.setItem('userData', JSON.stringify(user));
        setLoading(false);
        navigate("/"); 
      }
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      if (user) {
        const response = await axios.post("http://localhost:3000/auth/google-login", {
          email: user.email
        });
  
        const userData = response.data;
        localStorage.setItem('userData', JSON.stringify(userData));
        dispatch(authLogin({ userData }));
        navigate("/");
      }
    } catch (error) {
      console.error("Error during Google sign-in:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className={`m-auto sm:w-full max-w-lg bg-gray-100 rounded-xl p-1 sm:p-10 border border-black/10`}>
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
              {loading ? "Logging in..." : "LogIn"}
            </Button>
          </div>
        </form>

        {/* Google Sign-In Button */}
        <div className="flex justify-center mt-5">
          <Button
            type="button" // Make sure this button has type "button"
            className="flex items-center w-full justify-center space-x-2 border border-gray-300 p-3 rounded-md hover:bg-gray-200 transition-all"
            onClick={handleGoogleSignIn}
          >
            <FcGoogle className="text-xl" />
            <span>Sign In with Google</span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
