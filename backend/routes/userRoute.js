import express from 'express';
import { loginUser, logoutUser, registerUser } from '../controllers/userController.js';
import { verifyUserAuth } from '../middleware/userAuth.js';

const userRouter=express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout',verifyUserAuth, logoutUser);

export default userRouter;
