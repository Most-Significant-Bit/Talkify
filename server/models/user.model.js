import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    email : {type : String,required : true,unique : true,},
    password : {type : String,required : true},
    name :  {type : String,required : true},
    lastlogin : {type : Date,default : Date.now},
    isVerified : {type : Boolean,default : false},
    favorites:[{type: mongoose.Schema.Types.ObjectId,ref:"Episode"}],
    episodes_by_user: [{type: mongoose.Schema.Types.ObjectId,ref:"Episode"}],
    followers :{type: Number,default: 0},
    following: {type: Number,default: 0},
    followed_by: [{type: mongoose.Schema.Types.ObjectId,ref:"User"}],
    following_to: [{type: mongoose.Schema.Types.ObjectId,ref:"User"}],
    verificationToken  : String,
    verificationTokenExpiresAt : Date

}, {timestamps : true})

export const User = mongoose.model('User', userSchema);