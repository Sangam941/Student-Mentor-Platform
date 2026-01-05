import express from 'express';
import { loginUser } from '../controllers/AuthControllers.js';

const router = express.Router();

router.post('/login', loginUser)

export default router