import Episode from '../models/episode.model.js';
import {User} from '../models/user.model.js';
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

      await User.findByIdAndUpdate(
        creator,
        {
          $addToSet: {episodes_by_user: episode._id}
        }
      )
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
      const episode = await Episode.findById(req.params.id).populate("createdBy");
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

// export const deleteEpisode = async (req, res) => {
//   try {
//     const episodeId = req.params.id;
//     const userId = req.userId;

//     console.log(episodeId);
  
//     if (!episodeId) {
//       return res.status(400).json({ message: "Episode ID is required" });
//     }

//     const episode = await Episode.findById(episodeId);
//     if (!episode) {
//       return res.status(404).json({ message: "Episode not found" });
//     }

//     if (episode.createdBy == userId) {
//       const deletedEpisode = await Episode.findByIdAndDelete(episodeId);

//       res.json({ message: "Episode deleted" });
//     } else {
//       res.status(403).json({ message: "Unauthorized" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

export const deleteEpisode = async (req, res) => {
  try {
    const episodeId = req.params.id;
    const userId = req.userId;

    if (!episodeId) {
      return res.status(400).json({ message: "Episode ID is required" });
    }

    const episode = await Episode.findById(episodeId);
    if (!episode) {
      return res.status(404).json({ message: "Episode not found" });
    }

    if (episode.createdBy.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    // Delete the episode
    await Episode.findByIdAndDelete(episodeId);

    // Remove episode reference from the user's episodes_by_user
    await User.findByIdAndUpdate(userId, {
      $pull: { episodes_by_user: episodeId }
    });

    // Remove episode from all users' favorites
    await User.updateMany(
      { favorites: episodeId },
      { $pull: { favorites: episodeId } }
    );

    res.status(200).json({ message: "Episode deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};





export const getUserEpisodes = async (req,res) =>{
    try{
        const userId = req.params.userId;
        const episodes = await Episode.find({createdBy: userId}).populate('createdBy');
        res.status(200).json(episodes);
    } catch(error){
        res.status(400).json({message: error.message});
    }
}

// export const favoriteEpisode = async (req, res) => {
//   try {
//     const user = req.userId;
//     const episode = await Episode.findById(req.params.id);

//     if (!episode) {
//       return res.status(404).json({ error: 'Episode not found' });
//     }

//     const userIdStr = user.toString();
//     const alreadyFavorited = episode.favorite_by.some(u => u.toString() === userIdStr);

//     if (alreadyFavorited) {
//       // Remove user from favorite_by and decrement favorites
//       episode.favorite_by = episode.favorite_by.filter(u => u.toString() !== userIdStr);
//       episode.favorites = Math.max(0, episode.favorites - 1); // prevent negative count
//       await episode.save();

//       return res.status(200).json({
//         message: 'Disliked'
//       });
//     }

//     // Add episode to user's favorites
//     user.favorites.push(episode. _id);

//     // Add user to favorite_by and increment favorites
//     episode.favorite_by.push(user);
//     episode.favorites += 1;
//     await episode.save();

//     res.status(200).json({
//       message: 'Liked'
//     });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: error.message
//     });
//   }
// };

export const favoriteEpisode = async (req, res) => {
  try {
    const userId = req.userId;
    const episodeId = req.params.id;

    const episode = await Episode.findById(episodeId);
    const user = await User.findById(userId);

    if (!episode) {
      return res.status(404).json({ error: 'Episode not found' });
    }

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const alreadyFavorited = user.favorites.some(
      fav => fav.toString() === episodeId
    );

    if (alreadyFavorited) {
      // Unlike: Remove episode from user's favorites and user from episode's favorite_by
      user.favorites = user.favorites.filter(
        fav => fav.toString() !== episodeId
      );
      episode.favorite_by = episode.favorite_by.filter(
        uid => uid.toString() !== userId
      );
      episode.favorites = Math.max(0, episode.favorites - 1);

      await Promise.all([user.save(), episode.save()]);

      return res.status(200).json({ message: 'Disliked' });
    }

    // Like: Add episode to user's favorites and user to episode's favorite_by
    user.favorites.push(episodeId);
    episode.favorite_by.push(userId);
    episode.favorites += 1;

    await Promise.all([user.save(), episode.save()]);

    res.status(200).json({ message: 'Liked' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


export const searchEpisodesByCategory = async (req, res) => {
    const category  = req.query.category;

    if (!category) {
        return res.status(400).json({ error: "Category is required in query parameters." });
    }

    try {
        const episodes = await Episode.aggregate([
          {
            $match: {
              category: { $regex: new RegExp(`^${category}$`, 'i') }
            }
          }
        ])

        if (episodes.length === 0) {
            return res.status(404).json({ message: "No episodes found for the given category." });
        }

        res.status(200).json(episodes);
    } catch (error) {
        console.error("Error searching episodes by category:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
