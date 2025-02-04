import express from 'express';
import authenticateToken from '../Middlewares/auth.middleware.js';
import Login from '../Controllers/SuperUser/login.controller.js';

// Management methods
import {
  managementUsers,
  managementAddUsers,
  managementDeleteUsers,
} from '../Controllers/SuperUser/userManagement.controller.js';

// TPO methods
import {
  tpoUsers,
  tpoAddUsers,
  tpoDeleteUsers,
} from '../Controllers/SuperUser/userTPO.controller.js';

// Student methods
import {
  studentUsers,
  studentAddUsers,
  studentDeleteUsers,
  studentApprove,
} from '../Controllers/SuperUser/userStudent.controller.js';

const router = express.Router();

// Login route
router.post('/login', Login);

// Management routes
router.get('/management-users', authenticateToken, managementUsers);
router.post('/management-add-user', authenticateToken, managementAddUsers);
router.post('/management-delete-user', authenticateToken, managementDeleteUsers);

// TPO routes
router.get('/tpo-users', authenticateToken, tpoUsers);
router.post('/tpo-add-user', authenticateToken, tpoAddUsers);
router.post('/tpo-delete-user', authenticateToken, tpoDeleteUsers);

// Student routes
router.get('/student-users', authenticateToken, studentUsers);
router.post('/student-add-user', authenticateToken, studentAddUsers);
router.post('/student-delete-user', authenticateToken, studentDeleteUsers);

// Approve student route
router.post('/student-approve', authenticateToken, studentApprove);

export default router;
