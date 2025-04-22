import { User } from "../models/user.model.js";

export const followUser = async (req,res) =>{
   try
        {
          const channelId = await User.findById(req.params.id)
          const user = req.userId;

          if(channelId._id == user){
            return res.status(500).json({
              error: "Cannot follow your own account"
            })
          }

          if(channelId.followed_by.includes(user)){
            return res.status(500).json({
                error: 'Already Followed'
              })
          }
          channelId.followed_by.push(user)
          channelId.followers += 1;
          await channelId.save();

          const userData =  await User.findById(user);
          userData.following_to.push(channelId);
          userData.following += 1;
          await userData.save();

          res.status(200).json({
                message: "Followed"
          })


        } catch(error){
          console.log(error)
          res.status(500).json({
            message: error.message
          })
        }
}

export const getDetails = async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        if(user);
        res.status(200).json({
          user
        })        

    } catch(error){
        console.log(error);
        res.status(500).json({
          message: error.message
        })
    }
}