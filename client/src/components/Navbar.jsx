import React,{ useState } from "react";
import { FiUser } from "react-icons/fi";
import { motion } from "framer-motion";
import Logo from "../images/Logo1.png"
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { NavLink } from 'react-router-dom';




function Navbar() {

  const { user, error} = useAuthStore();
  

  return (
    <nav className="fixed top-0 left-0 h-22 w-full bg-gray-900 text-white p-4 flex justify-between items-center z-50">
      {/* Left Section */}
      <div className="text-3xl flex gap-2 font-bold font-[cursive] pl-5">
        <img src={Logo} className="h-10 w-8" alt="logo" />
        <Link to="/">Talkify</Link>
      </div>
      
      {/* Middle Section */}
      <ul className="flex space-x-6">
      <NavLink
  to="/dashboard"
  className={({ isActive }) =>
    isActive
      ? "text-green-400 font-semibold"
      : "text-white hover:text-green-300 transition"
  }
>
  Home
</NavLink>

<NavLink
  to="/favorites"
  className={({ isActive }) =>
    isActive
      ? "text-green-400 font-semibold"
      : "text-white hover:text-green-300 transition"
  }
>
  Favourites
</NavLink>
<NavLink
  to="/search"
  className={({ isActive }) =>
    isActive
      ? "text-green-400 font-semibold"
      : "text-white hover:text-green-300 transition"
  }
>
  Search
</NavLink>

<NavLink
  to="/contact"
  className={({ isActive }) =>
    isActive
      ? "text-green-400 font-semibold"
      : "text-white hover:text-green-300 transition"
  }
>
  Contact Us
</NavLink>

<NavLink
  to="/allUsers"
  className={({ isActive }) =>
    isActive
      ? "text-green-400 font-semibold"
      : "text-white hover:text-green-300 transition"
  }
>
  Users
</NavLink>

      </ul>
      
      {/* Right Section */}
      <div className="flex space-x-7 pr-6">
        <Link to="/upload" className="px-4 py-1 bg-transparent border-2 border-blue-600 rounded-full hover:bg-blue-500">Create</Link>
        <Link to={`/profile/${user._id}`} className="p-2 bg-green-700 rounded-full">
          <FiUser className="text-xl" />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar