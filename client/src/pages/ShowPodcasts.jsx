// src/pages/ShowPodcasts.jsx
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import PodcastCard from "../components/PodcastCard";
import Navbar from "../components/Navbar";
import axios from "axios";

import { CLIENT_URL } from "../utils/Data.js"

const ShowPodcasts = () => {
  const { category } = useParams();
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const res =
          category === "mostpopular"
            ? await axios.get(`${CLIENT_URL}/api/episode/getAll`)
            : await axios.get(`${CLIENT_URL}/api/episode/search/?category=${category}`);

        const data =
          category === "mostpopular"
            ? res.data.sort((a, b) => b.favorites - a.favorites)
            : res.data;

        setEpisodes(data);
      } catch (error) {
        console.error("Error fetching episodes:", error);
        setEpisodes([]);
      }
    };

    fetchCategoryData();
  }, [category]);

  return (
    <>
      <Navbar />
      <div className="p-30 w-full h-screen">
        <h1 className="text-white text-3xl font-bold mb-6 capitalize">
          {category === "mostpopular" ? "Most Popular" : `${category} Podcasts`}
        </h1>

        {episodes.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            {episodes.map((item, index) => (
              <PodcastCard key={index} data={item} id={item._id} />
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No episodes found.</p>
        )}
      </div>
    </>
  );
};

export default ShowPodcasts;

