import UserModel from "../models/UserModel.js";
import bcrypt from 'bcrypt';
import generateToken from '../utils/GenerateToken.js'


// login user for all
export const loginUser = async (req, res) => {
    try {
        const { user_id, email, password } = req.body;

        if ((!user_id && !email) || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide user_id or email and password"
            });
        }

        const query = user_id ? { user_id } : { email };
        const user = await UserModel.findOne(query);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            });
        }

        // generate JWT
        const token = generateToken(user);

        res.status(200).json({
            success: true,
            message: "Logged in successfully",
            token,
            user
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Error logging in mentor",
            error: error.message
        });
    }
};
