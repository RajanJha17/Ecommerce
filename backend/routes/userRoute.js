import express from 'express';
import { deleteUser, getAllUsers, getSingleUser, getUserDetails, loginUser, logoutUser, registerUser, requestPasswordReset, resetPassword, updatePassword, updateProfile, updateUserRole } from '../controllers/userController.js';
import { roleBasedAccess, verifyUserAuth } from '../middleware/userAuth.js';

const userRouter=express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout',verifyUserAuth, logoutUser);
userRouter.post('/password/reset', requestPasswordReset);
userRouter.post('/password/reset/:token', resetPassword);
userRouter.get('/profile', verifyUserAuth, getUserDetails);
userRouter.put('/password/update', verifyUserAuth, updatePassword);
userRouter.put('/profile/update', verifyUserAuth, updateProfile);
userRouter.get('/admin/users', verifyUserAuth, roleBasedAccess('admin'), getAllUsers);
userRouter.get('/admin/users/:id', verifyUserAuth, roleBasedAccess('admin'), getSingleUser);
userRouter.put('/admin/users/:id/role', verifyUserAuth, roleBasedAccess('admin'), updateUserRole);
userRouter.delete('/admin/users/:id', verifyUserAuth, roleBasedAccess('admin'), deleteUser);

export default userRouter;
