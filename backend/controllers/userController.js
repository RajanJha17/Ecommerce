import User from "../models/userModel.js";
import ErrorHandler from "../utils/handleError.js";
import { sendToken } from "../utils/jwtToken.js";

export const registerUser = async(req, res,next) => {
    try {
        const { name, email, password,avatar } = req.body;

        // Validate user input
        if (!name || !email || !password) {
            return next(new ErrorHandler("Please provide all required fields.", 400));
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new ErrorHandler("User already exists.", 400));
        }

        // Create new user
        const newUser = await User.create({
            name,
            email,
            password,
            avatar
        });

        sendToken(newUser, 201, res);

        // return res.status(201).json({
        //     success: true,
        //     message: "User registered successfully.",
        //     user: newUser,
        // });
    } catch (error) {
        console.error("Error registering user:", error.message);
        return next(new ErrorHandler("Server error. Please try again later.", 500));
    }

}


export const loginUser = async(req, res,next) => { 
    try {
        const { email, password } = req.body;

        // Validate user input
        if (!email || !password) {
            return next(new ErrorHandler("Please provide email and password.", 400));
        }

        // Check if user exists
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return next(new ErrorHandler("Invalid email or password.", 401));
        }

        // Check if password matches
        const isPasswordMatched = await user.comparePassword(password);
        if (!isPasswordMatched) {
            return next(new ErrorHandler("Invalid email or password.", 401));
        }
        sendToken(user, 200, res);
        // return res.status(200).json({
        //     success: true,
        //     message: "User logged in successfully.",
        //     user,
            
        // });
    } catch (error) {
        console.error("Error logging in user:", error.message);
        return next(new ErrorHandler("Server error. Please try again later.", 500));
    }

}


export const logoutUser = async(req, res,next) => {
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true
        });
        return res.status(200).json({
            success: true,
            message: "User logged out successfully."
        });
    } catch (error) {
        console.error("Error logging out user:", error.message);
        return next(new ErrorHandler("Server error. Please try again later.", 500));
    }
}
            