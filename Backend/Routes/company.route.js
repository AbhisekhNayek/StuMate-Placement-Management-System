import express from 'express';
import authenticateToken from '../Middlewares/auth.middleware.js';
import {
    addCompany,
    companyDetail,
    allCompanyDetail,
    deleteCompany,
} from '../Controllers/Company/company.controller.js';

// Initialize the router
const router = express.Router();

// Routes for company operations
router.get('/company-detail', authenticateToken, allCompanyDetail);

router.post('/add-company', authenticateToken, addCompany);
router.post('/delete-company', authenticateToken, deleteCompany);

router.get('/company-data', companyDetail);



export default router;
