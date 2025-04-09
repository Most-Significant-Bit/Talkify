import React,{ useState } from "react";
import { FiUser } from "react-icons/fi";
import { motion } from "framer-motion";
import Logo from "../images/Logo.png"
import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";


function Navbar() {
  return (
    <nav className="fixed top-0 left-0 h-21 w-full bg-gray-900 text-white p-4 flex justify-between items-center z-50">
      {/* Left Section */}
      <div className="text-3xl font-bold font-[cursive] pl-5">
        <Link to="/">Talkify</Link>
      </div>
      
      {/* Middle Section */}
      <ul className="flex space-x-6">
        <li><Link to="/dashboard" className="hover:text-gray-400">Home</Link></li>
        <li><Link to="/search" className="hover:text-gray-400">Search</Link></li>
        <li><Link to="/favourites" className="hover:text-gray-400">Favourites</Link></li>
        <li><Link to="/about" className="hover:text-gray-400">About</Link></li>
      </ul>
      
      {/* Right Section */}
      <div className="flex space-x-7 pr-6">
        <Link to="/upload" className="px-4 py-1 bg-blue-600 rounded hover:bg-blue-500">Create</Link>
        <Link to="/profile" className="p-2 bg-green-700 rounded-full">
          <FiUser className="text-xl" />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar