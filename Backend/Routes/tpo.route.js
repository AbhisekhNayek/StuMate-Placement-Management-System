import express from 'express';
import authenticateToken from '../Middlewares/auth.middleware.js';

// TPO Controllers
import Login from '../Controllers/TPO/login.controller.js';
import PostJob from '../Controllers/TPO/postJob.controller.js';

// Job Controllers
import {
  AllJobs,
  DeleteJob,
  JobData,
  JobWithApplicants,
  StudentJobsApplied,
} from '../Controllers/User/allJobs.controller.js';

const router = express.Router();

// TPO Login Route
router.post('/login', Login);

// Post Job Listing Data
router.post('/post-job', authenticateToken, PostJob);

// Retrieve All Jobs
router.get('/jobs', AllJobs);

// Delete Job
router.post('/delete-job', authenticateToken, DeleteJob);

// View a Specific Job
router.get('/job/:jobId', authenticateToken, JobData);

// Get Job with Its Applicants
router.get('/job/applicants/:jobId', authenticateToken, JobWithApplicants);

// Get Jobs Applied by a Specific Student
router.get('/myjob/:studentId', authenticateToken, StudentJobsApplied);

export default router;
