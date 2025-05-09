import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
// export const followUser = async (req,res) =>{
//    try
//         {
//           const channelId = await User.findById(req.params.id)
//           const user = req.userId;

//           if(channelId._id == user){
//             return res.status(500).json({
//               error: "Cannot follow your own account"
//             })
//           }

//           if(channelId.followed_by.includes(user)){
//             return res.status(500).json({
//                 error: 'Already Followed'
//               })
//           }
//           channelId.followed_by.push(user)
//           channelId.followers += 1;
//           await channelId.save();

//           const userData =  await User.findById(user);
//           userData.following_to.push(channelId);
//           userData.following += 1;
//           await userData.save();

//           res.status(200).json({
//                 message: "Followed"
//           })


//         } catch(error){
//           console.log(error)
//           res.status(500).json({
//             message: error.message
//           })
//         }
// }

export const followUser = async (req, res) => {
  try {
      const currentUserId = req.userId;
      const targetUserId = req.params.id;

      if (currentUserId === targetUserId) {
          return res.status(400).json({ message: "You cannot follow/unfollow yourself" });
      }

      const currentUser = await User.findById(currentUserId);
      const targetUser = await User.findById(targetUserId);

      if (!targetUser) {
          return res.status(404).json({ message: "User not found" });
      }

      const isFollowing = currentUser.following_to.includes(targetUserId);

      if (isFollowing) {
          // Unfollow logic
          currentUser.following_to = currentUser.following_to.filter(id => id.toString() !== targetUserId);
          currentUser.following -= 1;

          targetUser.followed_by = targetUser.followed_by.filter(id => id.toString() !== currentUserId);
          targetUser.followers -= 1;

          await currentUser.save();
          await targetUser.save();

          return res.status(200).json({ message: "Unfollowed user successfully" });
      } else {
          // Follow logic
          currentUser.following_to.push(targetUserId);
          currentUser.following += 1;

          targetUser.followed_by.push(currentUserId);
          targetUser.followers += 1;

          await currentUser.save();
          await targetUser.save();

          return res.status(200).json({ message: "Followed user successfully" });
      }
  } catch (error) {
      res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


export const getDetails = async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
        .populate({
          path: 'favorites',
          populate: {
            path: 'createdBy'
          }
        });
  
      res.status(200).json({ user });
  
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };


export const updateAvatar = async (req, res) => {
    try {
      const userId = req.userId;
      const localFilePath = req.file?.path;
  
      if (!localFilePath) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      const cloudinaryResponse = await uploadOnCloudinary(localFilePath);
  
      if (!cloudinaryResponse) {
        return res.status(500).json({ error: 'Failed to upload image' });
      }
  
      const avatarUrl = cloudinaryResponse.url;
  
      const user = await User.findByIdAndUpdate(
        userId,
        { avatar: avatarUrl },
        { new: true }
      ).select('-password');
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json({
        message: 'Avatar updated successfully',
        avatar: avatarUrl,
        user,
      });
  
    } catch (error) {
      console.error('Error updating avatar:', error);
      res.status(500).json({ message: error.message });
    }
  };

export const getUserFavorites = async (req, res) => {
    try {
        const userId = req.userId; // Or use req.user.id if using auth middleware

        const user = await User.findById(userId)
        .populate({
          path: 'favorites',
          populate: {
            path: 'createdBy', // Populate createdBy inside each favorite
            model: 'User',      // Ensure this matches your User model name
          },
        })
        .select('favorites'); // Only return favorites field from the User
      

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ favorites: user.favorites });
    } catch (error) {
        console.error('Error fetching favorites:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select('-password -verificationToken -verificationTokenExpiresAt') // omit sensitive fields
      .populate('favorites', 'title') // populate favorite episodes, fetching only the 'title'
      .populate('episodes_by_user', 'title'); // populate user's own episodes

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching users.',
    });
  }
};
