import React from "react";
import { motion } from 'framer-motion';
import { FiSearch, FiUpload, FiHeart, FiLogOut, FiX, FiUser } from "react-icons/fi";

export default function Sidebar({ isOpen }) {
  return (
    <motion.aside
      initial={{ x: -250 }}
      animate={{ x: isOpen ? 0 : -250 }}
      transition={{ type: "spring", stiffness: 120 }}
      className="fixed left-0 top-0 h-full w-64 bg-gray-800 text-white p-5 pt-16 shadow-lg"
    >
      <ul className="space-y-4">
        <li className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded cursor-pointer">
          <FiSearch /> Search
        </li>
        <li className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded cursor-pointer">
          <FiUpload /> Upload
        </li>
        <li className="flex items-center gap-3 p-2 hover:bg-gray-700 rounded cursor-pointer">
          <FiHeart /> Favourites
        </li>
        <li className="flex items-center gap-3 p-2 hover:bg-red-600 rounded cursor-pointer">
          <FiLogOut /> Logout
        </li>
      </ul>
    </motion.aside>
  );
}