import bcrypt from "bcrypt";
import UserModel from "../models/UserModel.js";
import MentorModel from "../models/MentorModel.js";
import getDataurl from "../utils/UrlGenerator.js";
import { v2 as cloudinary } from 'cloudinary';


// create mentor
export const createMentor = async (req, res) => {
  try {
    const { email, password, name, contact, role } = req.body;

    const file = req.file;

    if (!file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    if (!email || !password || !name || !contact || !role) {
      return res.status(400).json({ success: false, message: "All fields required" });
    }

    const fileUrl = getDataurl(file).content;
    

    const cloud = await cloudinary.uploader.upload(fileUrl, {
      folder: "Mentor_Profile_images"
    });

    // Check if email exists
    let existingUser = await UserModel.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Mentor already exists" });

    const count = await MentorModel.countDocuments();

    // Create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      user_id: `26MEN${String(count + 1).padStart(3, "0")}`, // e.g., 26MEN001
      password: hashedPassword,
      email,
      role: "mentor"
    });
    
    // Create mentor profile
    const newMentor = await MentorModel.create({
      mentor_id: user.user_id,
      name,
      email,
      password: hashedPassword,
      contact,
      photo: {
        id: cloud.public_id,
        url: cloud.secure_url
      },
    });

    res.status(201).json({
      success: true,
      message: "Mentor created successfully",
      newMentor
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error creating mentor",
      error: error.message
    });
  }
};

// fetch all the mentors
export const getAllMentors = async (req, res) => {
  try {
    const mentors = await MentorModel.find({}).select("-password");
    res.status(200).json({
      success: true,
      message: "Mentors fetched successfully",
      mentors
    });
  } catch (error) {
    console.error("Error fetching mentors:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch mentors",
      error: error.message
    });
  }
};

