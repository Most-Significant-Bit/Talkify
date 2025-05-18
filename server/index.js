// const express = require('express');
import express from "express";
import 'dotenv/config';
import cors from 'cors';
import cookieParser from "cookie-parser";
import {connectDB} from "./db/connectDB.js";
import authRoutes from "./routes/auth.routes.js"
import episodeRoutes from "./routes/episode.routes.js"
import userRoutes from './routes/user.routes.js'
import searchRoutes from './routes/search.routes.js'
import path from "path"

const PORT = process.env.PORT || 5000;
const app = express();
const __dirname = path.resolve();

app.use(cors({origin : "https://talkify-frontend-rqid.onrender.com/", credentials : true}));

app.use(express.json()); 
// allows us to parse incoming request from a form / post method
app.use(cookieParser());
// allows us parse incoming cookies


app.use("/api/auth", authRoutes);
app.use("/api/episode",episodeRoutes);
app.use("/api",searchRoutes);
app.use("/api/user",userRoutes);

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
})

app.listen(PORT, ()=>{
    connectDB();
    console.log("Server is running on port :",PORT);
});

// VioDkSj7XHQj1OmY
