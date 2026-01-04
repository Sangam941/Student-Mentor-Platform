import dotenv from 'dotenv';
import connectDB from './config/db.js';
import User from './models/UserModel.js';
import bcrypt from 'bcrypt';

// Load environment variables
dotenv.config();

// Seed admin user
const seedAdmin = async () => {
    try {
        // Connect to database
        await connectDB();

        // Admin user details
        const adminData = {
            user_id: 'ADM001',
            password: 'admin123', // Default password - change this if needed
            role: 'admin'
        };

        // Check if admin already exists
        const existingAdmin = await User.findOne({ user_id: adminData.user_id });

        if (existingAdmin) {
            return res.status(409).json({
                success: false,
                message: 'Admin user already exists',
                existingAdmin
            });
        }

        // Hash the password
        const password_hash = await bcrypt.hash(adminData.password, 10);

        // Create admin user
        const admin = await User.create({
            user_id: adminData.user_id,
            password_hash: password_hash,
            role: adminData.role
        });

        return res.status(201).json({
            success: true,
            message: 'Admin user created successfully',
            admin
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error seeding admin user',
            error: error.message
        });
    }
};

seedAdmin();