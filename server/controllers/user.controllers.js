import { User } from "../models/user.model.js";

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


export const getDetails = async (req,res)=>{
    try{
        const channelDetails = await User.findById(req.params.id);
        if(channelDetails);
        res.status(200).json({
          channelDetails
        })        

    } catch(error){
        console.log(error);
        res.status(500).json({
          message: error.message
        })
    }
}