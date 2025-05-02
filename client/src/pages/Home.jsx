import React from 'react'
import { Link } from 'react-router-dom'
import Logo from "../images/Logo1.png"
import PlayBtn from "../images/playbtn.png"
import { useAuthStore } from "../store/authStore";

const Home = () => {

  const {isAuthenticated} = useAuthStore();

  return (
    <div className="min-h-screen w-full flex flex-col bg-gradient-to-r from-[#02353C] via-[#2EAF7D] to-[#3FDC09]">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-5 bg-transparent">
        {/* Left */}
        <div className="flex items-center space-x-3">
          <Link to="/">
            <img src={Logo} alt="Talkify Logo" className="h-12 w-10" />
          </Link>
          <Link to="/" className="text-white text-2xl font-bold font-[cursive]">
            Talkify
          </Link>
        </div>

        {/* Center */}
        <div className="hidden md:flex space-x-8 text-white text-lg">
          <a href="/dashboard">Dashboard</a>
          <a href="/favourites">Favourites</a>
          <a href="#">Contact Us</a>
          <a href="#">About</a>
        </div>

        {/* Right */}
        <div className='flex gap-2.5'>
          <a href='/login'>
          <button className="border-2 cursor-pointer border-white text-white px-4 py-2 rounded-full hover:bg-white hover:text-[#02353C] transition">
            Log In
          </button>
        </a>
        <a href='/signup'>
          <button className="border-2 border-purple-800 cursor-pointer bg-purple-800 text-white px-4 py-2 rounded-full hover:border-white hover:bg-white hover:text-[#02353C] transition">
            Sign Up
          </button>
        </a>
        </div>
        
      </nav>

      {/* Hero Section */}
      <div className="flex flex-1 flex-col md:flex-row items-center justify-between px-10 md:px-20">
        {/* Left Content */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Design <span className='text-green-600 text-6xl'>&</span> Technology that Transforms
          </h1>
          <p className="text-white text-lg max-w-lg">
            Building highly-polished digital products that transform business and accelerate the speed of innovation.
          </p>
          <a href={ isAuthenticated ? "/dashboard" : "/login"}>
          <button className="bg-transparent border-3 border-green-500 hover:bg-gradient-to-r from-green-400 to-green-500 text-white px-6 py-3 rounded-full text-lg cursor-pointer hover:scale-105 transition">
            LET'S GET STARTED
          </button>
          </a>
          
        </div>

        {/* Right Content */}
        <div className="flex-1 flex items-center justify-center mt-10 md:mt-0">
          <div className="relative">
            <img
              src={PlayBtn}
              alt="Play Button"
              className="w-100 h-100 cursor-pointer hover:scale-110 transition"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home