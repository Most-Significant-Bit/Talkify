import express from "express";
import { verifyToken } from "../middlewares/verifyToken.js"
import {followUser, getDetails} from '../controllers/user.controllers.js';

const router = express.Router();
router.put('/follow/:id',verifyToken,followUser);
router.get('/details/:id',verifyToken,getDetails);
export default router;