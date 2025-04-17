import React, { useState } from "react";

import { AiOutlineLogout } from "react-icons/ai";

import { CheckCircle2 } from "lucide-react";
import PodcastCard from "../components/PodcastCard"; // assuming you have this component
import Navbar from "../components/Navbar";

const isVerified = true; // Example flag, can be dynamic

const Profile = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollowToggle = () => {
    setIsFollowing((prev) => !prev);
  };

  return (
    <>
      <Navbar />
      <div className="w-300 mt-15 min-h-screen text-white p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center p-10 mb-4">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNiF96dKTOvN0Ai2EJU-EPXQl6vTQCXB209g&s" // Replace with dynamic image if needed
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-green-500"
            />
            <div className="flex flex-col items-start">
              <div className="flex items-center">
                <h1 className="text-3xl font-bold mr-4">Himadri</h1>
                {isVerified ? (
                  <div className="flex items-center gap-1 text-green-400 mt-1">
                    <CheckCircle2 className="w-5 h-5" /> Verified
                  </div>
                ) : (
                  <button className="bg-transparent border-2 border-green-500 hover:bg-green-500 px-4 py-1 rounded-full cursor-pointer text-white">
                    Verify Account
                  </button>
                )}
              </div>

              {/* Toggle Follow Button */}
              <button
                onClick={handleFollowToggle}
                className={`mt-2 flex items-center gap-2 px-4 py-1 rounded-full cursor-pointer text-white text-sm border-2 transition-all duration-200
      ${
        isFollowing
          ? "bg-blue-500 border-blue-500 hover:bg-transparent"
          : "bg-transparent border-blue-500 hover:bg-blue-500"
      }`}
              >
                {isFollowing ? "Following" : "Follow"}
              </button>
            </div>
          </div>

          {/* Logout */}
          <button className="flex items-center gap-2 bg-transparent border-2 border-red-500 hover:bg-red-500 px-4 py-1 rounded-full cursor-pointer text-white">
            Logout{" "}
            <AiOutlineLogout style={{ color: "red", fontSize: "20px" }} />
          </button>
        </div>

        {/* Stats Section */}
        <div className="flex justify-start gap-12 text-center mb-8 pl-6">
          <div>
            <p className="text-2xl font-semibold text-green-500">14</p>
            <p className="text-gray-300">Podcasts</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-green-500">0</p>
            <p className="text-gray-300 ">Followers</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-green-500">25</p>
            <p className="text-gray-300">Following</p>
          </div>
        </div>

        {/* Favorite Podcasts Section */}
        <div className="mb-8 pl-6">
          <h2 className="text-2xl font-bold mb-4">Favorite Podcasts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Repeat your PodcastCard component */}
            <PodcastCard />
            <PodcastCard />
            <PodcastCard />
          </div>
        </div>

        {/* My Podcasts Section */}
        <div className="pl-6">
          <h2 className="text-2xl font-bold mb-4">My Podcasts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <PodcastCard />
            <PodcastCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
