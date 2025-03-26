// const express = require('express');
import express from "express";
import dotenv from "dotenv";
// import cors from 'cors';
import cookieParser from "cookie-parser";
import {connectDB} from "./db/connectDb.js";
import authRoutes from "./routes/auth.routes.js"

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

// app.use(cors({origin : "http://localhost:5173", credentials : true}));

app.use(express.json()); 
// allows us to parse incoming request from a form / post method
app.use(cookieParser());
// allows us parse incoming cookies


app.use("/api/auth", authRoutes);

app.listen(PORT, ()=>{
    connectDB();
    console.log("Server is running on port :",PORT);
});

// VioDkSj7XHQj1OmY
