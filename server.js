import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import { v2 as cloudinary } from 'cloudinary'
import AdminRoute from './routes/AdminRoute.js'
import AuthRoute from './routes/AuthRoute.js'
import MentorRoute from './routes/MentorRoute.js'

// Load environment variables
dotenv.config();
connectDB();

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", AuthRoute)
app.use("/api/admin", AdminRoute)
app.use("/api/mentor", MentorRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

