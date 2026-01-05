import bcrypt from "bcrypt";
import StudentModel from "../models/StudentModel.js";
import MentorModel from "../models/MentorModel.js";
import UserModel from "../models/UserModel.js";
import getDataurl from "../utils/UrlGenerator.js"
import { v2 as cloudinary } from 'cloudinary'

// create student
export const createStudent = async (req, res) => {
    try {
        const { email, password, name, mentor_id } = req.body;

        const file = req.file;

        if (!file) {
            return res.status(400).json({ success: false, message: "No file uploaded" });
        }

        if (!email || !password || !name || !mentor_id) {
            return res.status(400).json({
                success: false,
                message: "All fields (email, password, name, mentor_id) are required"
            });
        }

        const fileUrl = getDataurl(file).content;

        const cloud = await cloudinary.uploader.upload(fileUrl, {
            folder: "Students_Profile_images"
        });

        // Check if mentor exists
        const mentor = await MentorModel.findOne({ mentor_id });
        if (!mentor) {
            return res.status(404).json({
                success: false,
                message: "Mentor not found"
            });
        }

        // Check if user already exists
        let existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Student already exists"
            });
        }

        // Generate student_id
        const count = await StudentModel.countDocuments();
        const student_id = `26STU${String(count + 1).padStart(3, "0")}`; // e.g., 26STU001

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user entry
        const user = await UserModel.create({
            user_id: student_id,
            email,
            password: hashedPassword,
            role: "student"
        });

        // Create student profile
        const newStudent = await StudentModel.create({
            student_id: student_id,
            email,
            password: hashedPassword,
            name,
            mentor_id,
            mentor: mentor._id
        });

        res.status(201).json({
            success: true,
            message: "Student created successfully",
            student: newStudent
        });

    } catch (error) {
        console.error("Error creating student:", error);
        res.status(500).json({
            success: false,
            message: "Error creating student",
            error: error.message
        });
    }
};

// fetch all the student
export const getAllStudent = async (req, res) => {
    try {
        const students = await StudentModel.find().populate("mentor", "mentor_id name contact");
        res.status(200).json({
            success: true,
            students
        });
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({
            success: false,
            message: "Error fetching students",
            error: error.message
        });
    }
};

// edit students
export const editStudents = async (req, res) => {
    try {
        const { studentId } = req.params;
        const updateData = req.body;

        // Find the student first
        const student = await StudentModel.findOne({ student_id: studentId });

        if (!student) {
            return res.status(404).json({
                success: false,
                message: "Student not found"
            });
        }
        
        // Check if the mentor trying to update is actually assigned to this student
        // Assumes req.user.mentor_id is set for authenticated mentor
        if (!req.user || req.user.user_id !== student.mentor_id) {
            return res.status(403).json({
                success: false,
                message: "You are not authorized to edit this student"
            });
        }

        // Update the student's data
        const updatedStudent = await StudentModel.findOneAndUpdate(
            { student_id: studentId },
            updateData,
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Student updated successfully",
            student: updatedStudent
        });
    } catch (error) {
        console.error("Error updating student:", error);
        res.status(500).json({
            success: false,
            message: "Error updating student",
            error: error.message
        });
    }
};
