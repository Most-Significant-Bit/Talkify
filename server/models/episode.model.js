import mongoose from "mongoose";

const episodeSchema = new mongoose.Schema({
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
    title: {type: String, required: true, unique: true},
    thumbnail: {type: String, required: true},
    description: {type: String},
    category: {type: String},
    video: {type: String, required: true},
    tags: [{type: String}],
    duration: { type: Number, required: true }, // in seconds
    favorite_by:[{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
    favorites:{type: Number, default: 0}
},{timestamps: true})

const Episode = mongoose.model("Episode",episodeSchema)

export default Episode;