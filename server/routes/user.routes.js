import express from "express";
import { verifyToken} from "../middlewares/verifyToken.js"
import {followUser, getDetails,updateAvatar,getUserFavorites} from '../controllers/user.controllers.js';
import upload from "../middlewares/multer.js";


const router = express.Router();
router.put('/follow/:id',verifyToken,followUser);
router.get('/details/:id',verifyToken,getDetails);
router.put('/update/avatar/:id',verifyToken,upload.single('avatar'),updateAvatar);
router.get('/showFavorites',verifyToken,getUserFavorites)
export default router;