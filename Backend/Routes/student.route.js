import express from 'express';

// Multer configurations for file uploads
import uploadResume from '../Config/uploadResume.config.js';
import uploadOfferLetter from '../Config/uploadOffer.config.js';

// Middleware
import authenticateToken from '../Middlewares/auth.middleware.js';

// Student controllers
import Signup from '../Controllers/Student/signup.controller.js';
import Login from '../Controllers/Student/login.controller.js';
import UploadResume from '../Controllers/Student/resume.controller.js';
import {
  UploadOfferLetter,
  DeleteOfferLetter,
} from '../Controllers/Student/offerLetter.controller.js';
import {
    applyToJob,
    checkAlreadyApplied,
} from '../Controllers/Student/applyJob.controller.js';
import  UpdateJobStatus  from '../Controllers/Student/updateJobStatus.controller.js';
import {
    getInternships,
    updateInternship,
    deleteInternship,
} from '../Controllers/Student/internship.controller.js';
import {
  StudentDataYearBranchWise,
  NotifyStudentStatus,
} from '../Controllers/Student/studentData.controller.js';

// Initialize router
const router = express.Router();

// Signup and login routes
router.post('/signup', Signup);
router.post('/login', Login);

// Resume and offer letter routes
router.post('/upload-resume', uploadResume.single('resume'), UploadResume);
router.post('/upload-offer-letter', uploadOfferLetter.single('offerLetter'), UploadOfferLetter);
router.post('/delete-offer-letter/:jobId/:studentId', DeleteOfferLetter);

// Job application routes
router.put('/job/:jobId/:studentId', applyToJob);
router.get('/check-applied/:jobId/:studentId', checkAlreadyApplied);

// Job status routes
router.post('/update-status/:jobId/:studentId', UpdateJobStatus);

// Internship routes
router.get('/internship', getInternships);
router.post('/update-internship', updateInternship);
router.post('/delete-internship', deleteInternship);

// TPO and management-specific routes
router.get('/all-students-data-year-and-branch', authenticateToken, StudentDataYearBranchWise);
router.get('/notify-interview-hired', authenticateToken, NotifyStudentStatus);

// Export the router
export default router;
