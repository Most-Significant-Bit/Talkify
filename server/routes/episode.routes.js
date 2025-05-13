import express from 'express';
import { getAllEpisodes, uploadEpisode, updateEpisode, deleteEpisode, getEpisodeById, favoriteEpisode, searchEpisodesByCategory, getUserEpisodes} from '../controllers/episode.controllers.js'
import { verifyToken } from '../middlewares/verifyToken.js';
import upload from '../middlewares/multer.js'

const router = express.Router();

router.post('/upload',verifyToken,upload.fields([
    {
        name: "thumbnail",
        maxCount: 1
    },
    {
        name: "video",
        maxCount: 1
    }
]),uploadEpisode);

router.get('/search',verifyToken,searchEpisodesByCategory)
router.put('/update/:id',verifyToken,upload.fields([
    {
        name: "thumbnail",
        maxCount: 1
    },
    {
        name: "video",
        maxCount: 1
    }
]),updateEpisode);
router.delete('/delete/:id',verifyToken,deleteEpisode);
router.get('/getAll',verifyToken,getAllEpisodes);
router.get('/userEpisodes/:userId',verifyToken,getUserEpisodes);
router.get('/:id',verifyToken,getEpisodeById);
router.put('/favorite/:id',verifyToken,favoriteEpisode)



export default router;