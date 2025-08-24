import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import ErrorHandler from "../utils/handleError.js";



export const verifyUserAuth=async(req,res,next)=>{
    try {
        const token = req.cookies.token;
        if (!token) {
            return next(new ErrorHandler("Not authorized to access this route", 401));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        console.error("Error verifying user auth:", error.message);
        return next(new ErrorHandler("Not authorized to access this route", 401));
    }
}

export const roleBasedAccess=(roles)=>{
    return (req,res,next)=>{
        if(!req.user || !roles.includes(req.user.role)){
            return next(new ErrorHandler("Not authorized to access this route", 403));
        }
        next();
    }
}