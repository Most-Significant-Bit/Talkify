import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDebounce } from "../utils/hooks/useDebounce.js";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Category } from "../utils/Data";
import { Link } from "react-router-dom";
import { DefaultCard } from "../components/DefaultCard.jsx";
import PodcastCard from "../components/PodcastCard.jsx";
import { CircularProgress } from "@mui/material";
import Navbar from "../components/Navbar.jsx";

import { CLIENT_URL } from "../utils/Data.js"

axios.defaults.withCredentials = true;

const Search = () => {
  const [searched, setSearched] = useState("");
  const [searchedPodcasts, setSearchedPodcasts] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useDebounce(searched, 500);

  useEffect(() => {
    const fetchResults = async () => {
      if (!debouncedSearch.trim()) {
        setSearchedPodcasts([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const res = await axios.get(`${CLIENT_URL}/api/find/?q=${debouncedSearch}`);
        setSearchedPodcasts(res.data?.data || []);
      } catch (err) {
        console.error("Search error:", err);
        setSearchedPodcasts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedSearch]);

  return (
    <div className="flex flex-col h-screen overflow-y-auto p-24">
      <Navbar />

      {/* Search Bar */}

      <div className="w-full flex justify-center pt-5">
        <div className="w-[700px] flex items-center gap-2 px-4 py-3 border border-green-400 rounded-full text-gray-400 bg-transparent">
          <SearchOutlinedIcon className="text-inherit" />
          <input
            type="text"
            placeholder="Search podcasts, artists, episodes..."
            className="flex-1 bg-transparent outline-none text-sm text-white placeholder:text-gray-400"
            value={searched}
            onChange={(e) => setSearched(e.target.value)}
          />
        </div>
      </div>

      {/* Browse All or Search Results */}
      {searched.trim() === "" ? (
        <div className="p-10">
          <h2 className="text-2xl font-semibold text-white mb-3">Browse All</h2>
          <div className="flex flex-wrap gap-4">
            {Category.map((category) => (
              <Link
                key={category.name}
                to={`/showpodcasts/${category.name.toLowerCase()}`}
                className="no-underline"
              >
                <DefaultCard category={category} />
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <>
          {loading ? (
            <div className="flex justify-center items-center h-64 w-full">
              <CircularProgress />
            </div>
          ) : (
            <div className="flex flex-wrap gap-4 pt-5">
              {searchedPodcasts.length === 0 ? (
                <p className="text-white">No Podcasts Found</p>
              ) : (
                searchedPodcasts.map((podcast, index) => (
                  <PodcastCard key={index} data={podcast} />
                ))
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Search;
