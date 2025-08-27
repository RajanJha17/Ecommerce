import User from "../models/userModel.js";
import ErrorHandler from "../utils/handleError.js";
import { sendToken } from "../utils/jwtToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import crypto from "crypto";

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

export const requestPasswordReset=async(req, res,next)=>{
    try {
        const { email } = req.body;

        // Validate user input
        if (!email) {
            return next(new ErrorHandler("Please provide email.", 400));
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return next(new ErrorHandler("User not found.", 404));
        }

        // Generate password reset token
        const resetToken = user.generatePasswordResetToken();
        await user.save({validateBeforeSave: false});
        const resetPasswordUrl=`https://ecommerce-jiot.onrender.com/api/v1/password/reset/${resetToken}`;


        const message=`Use the following link to reset your password: ${resetPasswordUrl}. \n\n . This link will expire in 30 minutes. \n\n if you did not request this email, please ignore it.`;

        // Send reset token to user's email
        await sendEmail({
            email: user.email,
            subject: "Password Reset Request",
            message: message
        });



        return res.status(200).json({
            success: true,
            message: "Password reset token sent to email.",
            resetPasswordUrl
        });
    } catch (error) {
        user.resetPasswordToken=undefined;
        user.resetPasswordExpires=undefined;
        await user.save({validateBeforeSave: false});
        console.error("Error requesting password reset:", error.message);
        return next(new ErrorHandler("Server error. Please try again later.", 500));
    }
}


export const resetPassword=async(req, res,next)=>{
    try {
        const { password, confirmPassword } = req.body;

        // Validate user input
        if (!password || !confirmPassword) {
            return next(new ErrorHandler("Please provide new password and confirm password.", 400));
        }

        if (password !== confirmPassword) {
            return next(new ErrorHandler("Passwords do not match.", 400));
        }

        const resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest("hex");

        // Find user by reset token
        const user = await User.findOne({
            resetPasswordToken: resetPasswordToken,
            resetPasswordExpires: { $gt: Date.now() }
        });
        if (!user) {
            return next(new ErrorHandler("Invalid or expired reset token.", 400));
        }

        // Update user's password
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        // Send success response
        return res.status(200).json({
            success: true,
            message: "Password reset successfully."
        });
    } catch (error) {
        console.error("Error resetting password:", error.message);
        return next(new ErrorHandler("Server error. Please try again later.", 500));
    }
}

export const getUserDetails = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return next(new ErrorHandler("User not found.", 404));
        }
        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error("Error fetching user profile:", error.message);
        return next(new ErrorHandler("Server error. Please try again later.", 500));
    }
}


export const updatePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword, confirmPassword } = req.body;

        // Validate user input
        if (!oldPassword || !newPassword || !confirmPassword) {
            return next(new ErrorHandler("Please provide old password, new password and confirm password.", 400));
        }

        if (newPassword !== confirmPassword) {
            return next(new ErrorHandler("Passwords do not match.", 400));
        }

        const user = await User.findById(req.user.id).select("+password");
        if (!user) {
            return next(new ErrorHandler("User not found.", 404));
        }

        // Check if old password is correct
        const isMatch = await user.comparePassword(oldPassword);
        if (!isMatch) {
            return next(new ErrorHandler("Old password is incorrect.", 401));
        }

        // Update password
        user.password = newPassword;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password updated successfully."
        });
    } catch (error) {
        console.error("Error updating password:", error.message);
        return next(new ErrorHandler("Server error. Please try again later.", 500));
    }
}


export const updateProfile = async (req, res, next) => {
    try {
        const { name, email } = req.body;

        // Validate user input
        if (!name || !email) {
            return next(new ErrorHandler("Please provide name and email.", 400));
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return next(new ErrorHandler("User not found.", 404));
        }

        // Update user profile
        user.name = name;
        user.email = email;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            user
        });
    } catch (error) {
        console.error("Error updating profile:", error.message);
        return next(new ErrorHandler("Server error. Please try again later.", 500));
    }
}


export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json({
            success: true,
            users
        });
    } catch (error) {
        console.error("Error fetching all users:", error.message);
        return next(new ErrorHandler("Server error. Please try again later.", 500));
    }
}


export const getSingleUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return next(new ErrorHandler("User not found.", 404));
        }
        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error("Error fetching user:", error.message);
        return next(new ErrorHandler("Server error. Please try again later.", 500));
    }
}

export const updateUserRole = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { role } = req.body;

        // Validate user input
        if (!role) {
            return next(new ErrorHandler("Please provide a role.", 400));
        }

        const user = await User.findById(id);
        if (!user) {
            return next(new ErrorHandler("User not found.", 404));
        }

        // Update user role
        user.role = role;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "User role updated successfully.",
            user
        });
    } catch (error) {
        console.error("Error updating user role:", error.message);
        return next(new ErrorHandler("Server error. Please try again later.", 500));
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return next(new ErrorHandler("User not found.", 404));
        }

        await user.remove();

        return res.status(200).json({
            success: true,
            message: "User deleted successfully."
        });
    } catch (error) {
        console.error("Error deleting user:", error.message);
        return next(new ErrorHandler("Server error. Please try again later.", 500));
    }
}
