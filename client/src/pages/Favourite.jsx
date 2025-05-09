import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar"; // Adjust path as needed
import PodcastCard from "../components/PodcastCard"; // Adjust path as needed

import axios from "axios";

const CLIENT_URL = "http://localhost:5000/api/user";

axios.defaults.withCredentials = true;

const MyFavorites = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = (await axios.get(`${CLIENT_URL}/showFavorites`)).data.favorites;
      console.log(res);
      setData(res);
    } catch (error) {
      console.error("Error fetching all data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-transparent pt-25 text-white">
        {/* Navbar at the top */}

        {/* Title */}
        <div className="px-6 py-4">
          <h1 className="text-3xl font-bold">My Favorites</h1>
        </div>

        {/* Podcast list */}
        <div className="px-6 pb-8 pt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data?.length > 0 ? (
            data?.map((item, index) => {
              // console.log("DATA ITEM:", index, item); // 👈 see what's inside!
              return <PodcastCard key={index} data={item} id={item?._id} />;
            })
          ) : (
            <p>No episodes found.</p>
          )}
          {/* {favorites && favorites.length > 0 ? (
          favorites.map((podcast, index) => (
            <PodcastCard key={index} podcast={podcast} />
          ))
        ) : (
          <p className="text-gray-400 text-center col-span-full">No favorite podcasts yet.</p>
        )} */}
        </div>
      </div>
    </>
  );
};

export default MyFavorites;
