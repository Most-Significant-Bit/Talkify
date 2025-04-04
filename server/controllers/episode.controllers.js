import Episode from '../models/episode.model.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js'


export const uploadEpisode = async (req, res) => {
  try {
    const { title, description, category, tags } = req.body;
    console.table({ title, description, category, tags });

    const tagsArray = tags ? tags.split(',') : [];
    const creator = req.userId;

    console.log(req.files);

    let thumbnail = { url: "" };
    if (req.files?.thumbnail?.length > 0) {
      const thumbnailLocalPath = req.files.thumbnail[0].path;
      thumbnail = await uploadOnCloudinary(thumbnailLocalPath);
      console.log(thumbnailLocalPath);
    }

    let video = { url: "", duration: 0 };
    if (req.files?.video?.length > 0) {
      const videoLocalPath = req.files.video[0].path;
      video = await uploadOnCloudinary(videoLocalPath);
      console.log(videoLocalPath);
    }

    const episode = await Episode.create({
      title,
      createdBy: creator,
      description,
      category,
      tags: tagsArray,
      thumbnail: thumbnail.url || '',
      video: video.url || '',
      duration: video?.duration || 0
    });

    
      res.status(200).json(episode);
    

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


export const getAllEpisodes = async (req, res) => {
  try {
    const episodes = await Episode.find().populate("createdBy");
    res.status(200).json(episodes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export const getEpisodeById = async (req, res) => {
    try {
      const episode = await Episode.findById(req.params.id).populate("podcastId");
      if (!episode) return res.status(404).json({ message: "Episode not found" });
      res.json(episode);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
}

export const updateEpisode = async (req, res) => {
  try {
    const episodeId = req.params.id;
    const userId = req.userId;

    const episode = await Episode.findById(episodeId);
    if (!episode) {
      return res.status(404).json({ error: "Episode not found" });
    }

    if (episode.createdBy.toString() !== userId) {
      return res.status(403).json({ error: "Unauthorized to update this episode" });
    }

    const { title, description, category, tags } = req.body;
    const tagsArray = tags ? tags.split(',') : episode.tags;

    let thumbnail = episode.thumbnail;
    if (req.files?.thumbnail?.length > 0) {
      const thumbnailLocalPath = req.files.thumbnail[0].path;
      const uploadedThumbnail = await uploadOnCloudinary(thumbnailLocalPath);
      if (uploadedThumbnail?.url) {
        thumbnail = uploadedThumbnail.url;
      }
    }

    let video = episode.video;
    let duration = episode.duration;
    if (req.files?.video?.length > 0) {
      const videoLocalPath = req.files.video[0].path;
      const uploadedVideo = await uploadOnCloudinary(videoLocalPath);
      if (uploadedVideo?.url) {
        video = uploadedVideo.url;
        duration = uploadedVideo.duration || episode.duration;
      }
    }

    const updatedEpisode = await Episode.findByIdAndUpdate(
      episodeId,
      {
        title: title || episode.title,
        description: description || episode.description,
        category: category || episode.category,
        tags: tagsArray,
        thumbnail,
        video,
        duration,
      },
      { new: true }
    );

    res.status(200).json(updatedEpisode);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteEpisode = async (req, res) => {
  try {
    const episodeId = req.params.id;
    const userId = req.userId;

    console.log(episodeId);
  
    if (!episodeId) {
      return res.status(400).json({ message: "Episode ID is required" });
    }

    const episode = await Episode.findById(episodeId);
    if (!episode) {
      return res.status(404).json({ message: "Episode not found" });
    }

    if (episode.createdBy == userId) {
      const deletedEpisode = await Episode.findByIdAndDelete(episodeId);

      res.json({ message: "Episode deleted" });
    } else {
      res.status(403).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const getMyEpisodes = async (req,res) =>{
    try{
        const userId = req.userId;
        const episodes = await Episode.find({createdBy: userId});
        res.status(200).json(episodes);
    } catch(error){
        res.status(400).json({message: error.message});
    }
}