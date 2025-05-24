import express from 'express';
import uploadUserProfile from '../config/profilePhoto.config.js';
import authenticateToken from '../Middlewares/auth.middleware.js';

// User Controller Methods
import UserDetail from '../Controllers/User/userDetails.controller.js';
import AllUsersLen from '../Controllers/User/allUsers.controller.js';
import UpdatePhoto from '../Controllers/User/userUpdatePhoto.controller.js';
import UpdateProfile from '../Controllers/User/userUpdateProfile.controller.js';
import UpdatePassword from '../Controllers/User/userUpdatePassword.controller.js';
import UserData from '../Controllers/User/userShowData.controller.js';

const router = express.Router();

// Get details of a user
router.get('/detail', authenticateToken, UserDetail);

// Get the count of all users
router.get('/all-users', AllUsersLen);

// Get data of a specific user by userId
router.get('/:userId', authenticateToken, UserData);

// Upload user profile photo
router.post('/upload-photo', uploadUserProfile.single('profileImgs'), UpdatePhoto);

// Update user profile information
router.post('/update-profile', authenticateToken, UpdateProfile);

// Change user password
router.post('/change-password', authenticateToken, UpdatePassword);

export default router;
