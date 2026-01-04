
import bcrypt from "bcryptjs";
import UserModel from "../models/UserModel";
import MentorModel from "../models/MentorModel";
import generateToken from "../utils/GenerateToken";


// login admin
export const adminLogin = async (req, res) => {
  const { user_id, password } = req.body;
  const user = await UserModel.findOne({ user_id });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  // generate JWT
  const token = generateToken(user);

  res.status(200).json({ 
    success: true,
    message: "Admin logged in successfully",
    token,
    user
  });
};


// create mentor
export const createMentor = async (req, res) => {
  try {
    const { email, password, name, contact } = req.body;

    const file = req.file;

        if (!file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        if (!email || !password || !name || !contact) {
            return res.status(400).json({ success: false, message: "All fields required" });
        }

        const fileUrl = UrlGenerator(file).content;

        const cloud = await cloudinary.uploader.upload(fileUrl, {
            folder: "Mentor_images"
        });

    // Check if email exists
    let existingUser = await UserModel.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    // Create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.create({
      user_id: `26MEN${(await mentor.countDocuments()) + 1}`.padStart(3, "0"), // e.g., 26MEN001
      email,
      password: hashedPassword,
      role: "mentor"
    });

    // Create mentor profile
    const newMentor = await MentorModel.create({
      mentor_id: user.user_id,
      user: user._id,
      name,
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
