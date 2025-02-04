import express from 'express';
import authenticateToken from '../Middlewares/auth.middleware.js';

// Management controllers
import { login } from '../Controllers/Management/login.controller.js';
import { getTPOUsers } from '../Controllers/Management/topUser.controller.js';
import { deleteTPO } from '../Controllers/Management/deleteTPO.controller.js';
import {
    addTPO,
    addManagement,
    addStudent,
} from '../Controllers/Management/addUser.controller.js';
import {
    sendNotice,
    getAllNotices,
    deleteNotice,
    getNotice,
} from '../controllers/Management/notice.controller.js';

// Initialize the router
const router = express.Router();

// Routes for management operations
router.post('/login', login);

// TPO-related routes
router.get('/tpo-users', authenticateToken, getTPOUsers);
router.post('/delete-tpo', authenticateToken, deleteTPO);

// Add users (management, TPO, and students)
router.post('/add-tpo', authenticateToken, addTPO);
router.post('/add-management', authenticateToken, addManagement);
router.post('/add-student', authenticateToken, addStudent);

// Notice-related routes
router.post('/send-notice', authenticateToken, sendNotice);
router.get('/get-all-notices', authenticateToken, getAllNotices);
router.get('/get-notice', getNotice);
router.post('/delete-notice', deleteNotice);

// Export the router as default
export default router;
