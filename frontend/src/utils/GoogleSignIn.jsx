// Add the google client id in the env varaibles to make the functionality working
import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Cookies from 'js-cookie';
// import AuthContext from "../context/AuthContext";
import googleIcon from '../assets/google_icon.jpg';
import { useNavigate } from 'react-router-dom';

const GoogleSignIn = () => {
  // const { update } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const token = response.access_token;
        // Send Google access token to the backend for verification
        const { data } = await axios.post(`${API_URL}/oauth/google-login`, { token });

        Cookies.set('token', data.token, { expires: 1 });
        // update();
        navigate('/home');
      } catch (error) {
        console.error("Google login failed", error);
        alert("Google login failed. Please try again.");
      }
    },
    onError: () => {
      console.log('Login Failed');
    },
  });

  return (
    <button
      onClick={() => handleGoogleLogin()}
      className='w-full flex items-center justify-center bg-white border border-black/40 rounded-md my-4 p-4 cursor-pointer'
    >
      <img src={googleIcon} className='h-6 mr-2' alt="Google Icon" />
      Sign in with Google
    </button>
  );
};

export default GoogleSignIn;
