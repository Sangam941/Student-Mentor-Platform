import express from 'express';
import { createMentor, getAllMentors } from '../controllers/AdminController.js';
import { adminOnly } from '../middlewares/roleBasedAccess.js';
import upload from '../middlewares/multer.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.post('/create-mentor', isAuthenticated, adminOnly, upload.single('photo'), createMentor);
router.get('/get-all-mentors', isAuthenticated, adminOnly, getAllMentors)

export default router