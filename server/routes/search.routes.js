import express from 'express';

const router = express.Router();

import { searchEpisodes} from '../controllers/episode.controllers.js'
import { verifyToken } from '../middlewares/verifyToken.js';

router.get('/find',verifyToken,searchEpisodes);

export default router;