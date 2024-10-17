import express from 'express';
import { login, logout, signup } from '../controllers/auth';
import roleAuthMiddleware from '../middlewares/role.auth';
import { getLoanStats } from '../controllers/admin/loan.stats';
import { getRecentLoans } from '../controllers/admin/recent.loans';
import { getUserRecentLoans } from '../controllers/user/recent.loans';
import { submitLoanApplication } from '../controllers/user/loan.application';
const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.get('/admin/stats',roleAuthMiddleware('admin'),  getLoanStats);
router.get('/admin/recent-loans',roleAuthMiddleware('admin'), getRecentLoans);
router.get('/verifier/stats',roleAuthMiddleware('verifier'),  getLoanStats);
router.get('/verifier/recent-loans',roleAuthMiddleware('verifier'), getRecentLoans);
router.get('/user/loans', roleAuthMiddleware('loan_user'), getUserRecentLoans);
router.post('/user/loan-application', roleAuthMiddleware('loan_user'), submitLoanApplication);


//logout
router.post('/logout', logout);
export default router;