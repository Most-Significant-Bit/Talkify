import React, { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";

import { AiOutlineLogout } from "react-icons/ai";

import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import PodcastCard from "../components/PodcastCard";
import Navbar from "../components/Navbar";
import { MdOutlineModeEdit } from "react-icons/md";
import { useAuthStore } from "../store/authStore";
import { useNavigate, useParams } from "react-router-dom";

import { MdVerified } from "react-icons/md";

import { getFirstName } from "../utils/info";

import { CLIENT_URL } from "../utils/Data.js"

axios.defaults.withCredentials = true;

const Profile = () => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [user, setUser] = useState(null);
  const [userEpisodes, setUserEpisodes] = useState([]);
  const navigate = useNavigate();

  const fileInputRef = React.useRef(null);

  const { user: currentUser, checkAuth, logout, isLoading } = useAuthStore();

  const { userId } = useParams();

  const handleFollowToggle = async () => {
    await axios.put(`${CLIENT_URL}/api/user/follow/${user?._id}`);
    setIsFollowing((prev) => !prev);
    await checkAuth();
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const fetchData = async () => {
    try {
      const response = (await axios.get(`${CLIENT_URL}/api/user/details/${userId}`))
        .data.user;
      const data = await (
        await axios.get(`${CLIENT_URL}/api/episode/userEpisodes/${userId}`)
      ).data;
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

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await toast.promise(
        axios.put(
          `${CLIENT_URL}/api/user/update/avatar/${currentUser?._id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        ),
        {
          pending: "Uploading Profile Picture...",
          success: {
            render({ data }) {
              // Update the avatar after successful upload
              setUser((prev) => ({ ...prev, avatar: data.data.avatar }));
              return "Profile Picture Updated!!";
            },
          },
          error: {
            render({ data }) {
              console.error("Error uploading image", data);
              return "Error uploading profile picture";
            },
          },
        },
        {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        }
      );
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <Navbar />
      <div className="w-300 mt-15 min-h-screen text-white p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center p-10 mb-4">
          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div
              className="relative group w-24 h-24"
              onClick={() => {
                if (currentUser?._id === user?._id) {
                  fileInputRef.current.click();
                }
              }}
            >
              <img
                src={
                  user?.avatar ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNiF96dKTOvN0Ai2EJU-EPXQl6vTQCXB209g&s"
                }
                alt="Profile"
                className="w-full h-full rounded-full border-4 object-cover border-green-500 cursor-pointer"
              />
              {currentUser?._id === user?._id && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 hover:cursor-grab transition">
                  <MdOutlineModeEdit />
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageChange}
              />
            </div>

            <div className="flex flex-col items-start">
              <div className="flex items-center">
                <h1 className="text-3xl font-bold mr-4">{user?.name}</h1>
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
              Logout <AiOutlineLogout />
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
