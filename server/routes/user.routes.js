import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js"
import {followUser, getDetails,updateAvatar} from '../controllers/user.controllers.js';
import upload from "../middlewares/multer.js";

const router = express.Router();
router.put('/follow/:id',verifyToken,followUser);
router.get('/details/:id',verifyToken,getDetails);
router.put('/update/avatar/:id',verifyToken,upload.single('avatar'),updateAvatar);
export default router;