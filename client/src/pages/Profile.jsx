import React, { useEffect, useState } from "react";

import { AiOutlineLogout } from "react-icons/ai";

import axios from "axios";
import { CheckCircle2, Loader2 } from "lucide-react";
import PodcastCard from "../components/PodcastCard";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../store/authStore";
import { useNavigate, useParams } from "react-router-dom";
import { MdVerified } from "react-icons/md";

import { getFirstName } from "../utils/info";

const CLIENT_URL = "http://localhost:5000/api";

axios.defaults.withCredentials = true;

const Profile = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [user, setUser] = useState(null);
  const [userEpisodes, setUserEpisodes] = useState([]);
  const navigate = useNavigate();

  const { user: currentUser, checkAuth, logout, isLoading } = useAuthStore();

  const { userId } = useParams();

  const handleFollowToggle = async () => {
    await axios.put(`${CLIENT_URL}/user/follow/${user?._id}`);
    setIsFollowing((prev) => !prev);
    await checkAuth();
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const fetchData = async () => {
    try {
      const response = (await axios.get(`${CLIENT_URL}/user/details/${userId}`))
        .data.user;
      const data = await (
        await axios.get(`${CLIENT_URL}/episode/userEpisodes/${userId}`)
      ).data;
      console.log(data);
      setUser(response);
      setUserEpisodes(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors here
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId, isFollowing]);

  return isLoading ? (
    <Loader2 />
  ) : (
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
                <h1 className="text-3xl font-bold mr-4">{user?.name}</h1>
                {user?._id === currentUser?._id ? (
                  user?.isVerified ? (
                    <div className="flex items-center gap-1 text-green-400 mt-1">
                      <MdVerified className="text-green-500 text-2xl"/>
                    </div>
                  ) : (
                    <button className="bg-transparent border-2 border-green-500 hover:bg-green-500 px-4 py-1 rounded-full cursor-pointer text-white">
                      Verify Account
                    </button>
                  )
                ) : (
                  user?.isVerified && (
                    <div className="flex items-center gap-1 text-green-400 mt-1">
                      <MdVerified className="text-green-500 text-2xl"/>
                    </div>
                  )
                )}
              </div>

              {/* Toggle Follow Button */}
              {currentUser?._id !== user?._id ? (
                <button
                  onClick={handleFollowToggle}
                  className={`${
                    currentUser?.following_to?.includes(user?._id)
                      ? "bg-blue-700 hover:bg-blue-800 text-white"
                      : "bg-transparent border-2 border-blue-500  hover:bg-blue-500 text-white "
                  } px-4 py-1 mt-2 cursor-pointer rounded-full text-sm`}
                >
                  {currentUser?.following_to?.includes(user?._id)
                    ? "Following"
                    : "Follow"}
                </button>
              ) : (
                <></>
              )}
            </div>
          </div>

          {/* Logout */}
          {currentUser?._id === user?._id ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-transparent border-2 border-red-500 hover:bg-red-500 px-4 py-1 rounded-full cursor-pointer text-white"
            >
              Logout{" "}
              <AiOutlineLogout/>
            </button>
          ) : (
            <></>
          )}
        </div>

        {/* Stats Section */}
        <div className="flex justify-start gap-12 text-center mb-8 pl-6">
          <div>
            <p className="text-2xl font-semibold text-green-500">
              {user?.episodes_by_user.length}
            </p>
            <p className="text-gray-300">Podcasts</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-green-500">
              {user?.followers}
            </p>
            <p className="text-gray-300 ">Followers</p>
          </div>
          <div>
            <p className="text-2xl font-semibold text-green-500">
              {user?.following}
            </p>
            <p className="text-gray-300">Following</p>
          </div>
        </div>

        {/* Favorite Podcasts Section */}
        <div className="mb-8 pl-6">
          <h2 className="text-2xl font-bold mb-4">Favorite Podcasts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Repeat your PodcastCard component */}
            {user?.favorites.length > 0 ? (
              user?.favorites
                .sort((a, b) => a.favorites - b.favorites) // Sort in ascending order (lowest to highest)
                .slice(0, 6) // Get only the first 6 elements
                .map((item, index) => {
                  console.log(index, item);
                  return <PodcastCard key={index} data={item} id={item?._id} />;
                })
            ) : (
              <p>No episodes found.</p>
            )}
          </div>
        </div>

        {/* My Podcasts Section */}
        <div className="pl-6">
          <h2 className="text-2xl font-bold mb-4">
            {currentUser?._id !== user?._id
              ? `${getFirstName(user?.name)}'s`
              : "My"}{" "}
            Podcasts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {userEpisodes.length > 0 ? (
              userEpisodes.map((item, index) => {
                return <PodcastCard key={index} data={item} id={item?._id} />;
              })
            ) : (
              <p>No episodes found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
