import React from 'react'
import Header from '../components/Header/Header'
import { Link } from 'react-router-dom'


const Not_Found = () => {
    return (
        <div>
        
        
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
          <h1 className="text-9xl font-bold text-red-500">404</h1>
          <p className="mt-4 text-xl text-gray-700">Oops! The page you’re looking for doesn’t exist.</p>
          <Link 
            to="/" 
            className="mt-8 px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
          >
            Go Back Home
          </Link>
        </div>
        </div>
      )
}

export default Not_Found
