// CustomVideoPlayer.jsx
import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import { PauseIcon, PlayIcon, Volume2Icon, VolumeXIcon } from "lucide-react";
import { CgMiniPlayer } from "react-icons/cg";
import { RiFullscreenExitLine, RiFullscreenFill } from "react-icons/ri";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { CiSaveDown2 } from "react-icons/ci";
import { useEpisodeStore } from "../store/episodeStore";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

import axios from "axios";

axios.defaults.withCredentials = true;
const CLIENT_URL = "http://localhost:5000/api/episode";

const CustomVideoPlayer = () => {
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const volumeRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [duration, setDuration] = useState("00:00");
  const [speed, setSpeed] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const { id } = useParams();

  const { getEpisode, episode } = useEpisodeStore();
  // console.log(id);
  const { user: currentUser } = useAuthStore();

  const handleLikeChange = async () => {
    await axios.put(`${CLIENT_URL}/favorite/${id}`);
    setIsLiked((prev) => !prev);
  };

  useEffect(() => {
    getEpisode(id);

    const video = videoRef.current;

    const formatTime = (time) => {
      const mins = Math.floor(time / 60)
        .toString()
        .padStart(2, "0");
      const secs = Math.floor(time % 60)
        .toString()
        .padStart(2, "0");
      return `${mins}:${secs}`;
    };

    const updateTime = () => {
      setCurrentTime(formatTime(video.currentTime));
      if (progressRef.current) {
        const percentage = (video.currentTime / video.duration) * 100;
        progressRef.current.style.width = `${percentage}%`;
      }
    };

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", () => {
      setDuration(formatTime(video.duration));
    });

    return () => {
      video.removeEventListener("timeupdate", updateTime);
    };
  }, [isLiked]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    videoRef.current.volume = vol;
  };

  const handleProgressClick = (e) => {
    const video = videoRef.current;
    const rect = e.target.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    video.currentTime = percent * video.duration;
  };

  const toggleFullscreen = () => {
    const player = videoRef.current.parentElement;
    if (!document.fullscreenElement) {
      player.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const changeSpeed = (newSpeed) => {
    videoRef.current.playbackRate = newSpeed;
    setSpeed(newSpeed);
  };

  const toggleMiniPlayer = async () => {
    if (document.pictureInPictureElement) {
      await document.exitPictureInPicture();
    } else if (document.pictureInPictureEnabled) {
      try {
        await videoRef.current.requestPictureInPicture();
      } catch (error) {
        console.error("Failed to enter Picture-in-Picture mode.", error);
      }
    }
  };

  return (
    <div className="w-full h-200 mt-30 max-w-3xl mx-auto">
      <Navbar />
      <div className="relative aspect-video bg-black rounded-xl overflow-hidden border-4 border-green-500">
        <video
          ref={videoRef}
          src={episode?.video}
          className="w-full h-full object-cover cursor-pointer"
          onClick={togglePlay}
        ></video>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div
            className="w-full h-1 bg-white/30 cursor-pointer relative"
            onClick={handleProgressClick}
          >
            <div
              ref={progressRef}
              className="absolute top-0 left-0 h-full bg-green-500"
              style={{ width: "0%" }}
            ></div>
          </div>
          <div className="flex justify-between items-center mt-2 text-white">
            <div className="flex items-center gap-4">
              <button onClick={togglePlay} className="text-xl">
                {isPlaying ? <PauseIcon /> : <PlayIcon />}
              </button>
              {volume === 0 ? <VolumeXIcon /> : <Volume2Icon />}

              <input
                ref={volumeRef}
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="accent-green-500 w-24"
              />
              <span className="text-sm">
                {currentTime} / {duration}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <select
                className="bg-black text-white text-sm px-2 py-1 rounded-md"
                value={speed}
                onChange={(e) => changeSpeed(parseFloat(e.target.value))}
              >
                {[2, 1.5, 1, 0.75, 0.5].map((s) => (
                  <option key={s} value={s}>
                    {s}x
                  </option>
                ))}
              </select>
              <button onClick={toggleMiniPlayer} className="text-white">
                <CgMiniPlayer className="w-6 h-6" />
              </button>
              <button onClick={toggleFullscreen} className="text-lg">
                {isFullscreen === false ? (
                  <RiFullscreenFill className="w-6 h-6" />
                ) : (
                  <RiFullscreenExitLine className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex gap-1.5">
          <h2 className="text-xl font-bold text-white mr-4">
            {episode?.title}
          </h2>
          {episode?.tags.map((item, index) => (
            <h5 key={index} className="text-green-500 mt-1">{`#${item}`}</h5>
          ))}
        </div>

        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center gap-4">
            <div className="bg-green-600 text-white px-4 py-2 text-2xl rounded-full cursor-pointer">
              <img
                className="w-8 h-8"
                src="https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png"
                alt=""
              />
            </div>
            <a
              href={`/profile/${episode?.createdBy?._id}`}
              className="text-white font-medium cursor-pointer"
            >
              {episode?.createdBy?.name}
            </a>
            <button className="bg-green-700 hover:bg-green-800 text-white px-3 py-1 cursor-pointer rounded-lg text-sm">
              Follow
            </button>
          </div>
          <div className="flex items-center gap-2 mr-5">
            
            <button
              onClick={handleLikeChange}
              className="flex gap-1 items-center bg-green-600 hover:bg-green-700 cursor-pointer text-white px-3 py-1 rounded-lg text-sm"
            >
              {episode?.favorite_by?.includes(currentUser?._id) ? (
                <FcLike className="w-8 h-8" />
              ) : (
                <FcLikePlaceholder className="w-8 h-8 text-white" />
              )}
              <span className="text-white text-2xl">{episode?.favorites}</span>
            </button>

            <button className="bg-green-600 hover:bg-green-700 cursor-pointer text-white px-3 py-1 rounded-lg text-sm">
              <CiSaveDown2 className="w-8 h-8" />
            </button>
          </div>
        </div>
        <p className="mt-3 text-gray-300">{episode?.description}</p>
      </div>
    </div>
  );
};

export default CustomVideoPlayer;
