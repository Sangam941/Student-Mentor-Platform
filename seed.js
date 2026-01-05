import dotenv from "dotenv";
import bcrypt from "bcrypt";
import connectDB from "./config/db.js";
import User from "./models/UserModel.js";
import UserModel from "./models/UserModel.js";

// Load env variables
dotenv.config();

const seedAdmin = async () => {
  try {
    // Connect DB
    await connectDB();

    const adminData = {
      "admin_Id" : "26ADM001",
      "email" : "admin@gmail.com",
      "password": "admin123",
      "role" : "admin"
    }

    // Check if admin already exists
    const adminExists = await User.findOne({ user_id: adminData.admin_Id });

    if (adminExists) {
      console.log("⚠️ Admin already exists. Seed skipped.");
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(adminData.password, 10);

    // Create admin
    await UserModel.create({
      user_id: adminData.admin_Id,
      email: adminData.email,
      password: hashedPassword,
      role: adminData.role
    });

    console.log("✅ Admin seeded successfully!");
    process.exit(0);

  } catch (error) {
    console.error("❌ Admin seed failed:", error.message);
    process.exit(1);
  }
};

seedAdmin();
