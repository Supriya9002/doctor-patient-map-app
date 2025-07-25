import express from 'express';
import { addDoctor, findDoctorsNearby } from '../controllers/doctorController.js';

const router = express.Router();

router.post('/', addDoctor);
router.get('/search', findDoctorsNearby);

export default router;
