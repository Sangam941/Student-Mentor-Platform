import express from "express";
import { createStudent, editStudents, getAllStudent } from "../controllers/MentorController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import { adminAndMentor, mentorOnly } from "../middlewares/roleBasedAccess.js";

const router = express.Router();

router.post("/create-student", isAuthenticated, mentorOnly, upload.single('photo'), createStudent);
router.get("/get-all-students", isAuthenticated, adminAndMentor, getAllStudent)
router.put("/edit-student/:studentId", isAuthenticated, mentorOnly, editStudents);


export default router;
