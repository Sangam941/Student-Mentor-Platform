import express from 'express';
import { adminLogin, createMentor } from '../controllers/AdminController.js';
import { adminOnly } from '../middlewares/roleBasedAccess.js';

const router = express.Router();

router.post('/admin-login', adminLogin);
router.post('/create-mentor', adminOnly, upload.single('photo'), createMentor);