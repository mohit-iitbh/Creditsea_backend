"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../controllers/auth");
const role_auth_1 = __importDefault(require("../middlewares/role.auth"));
const loan_stats_1 = require("../controllers/admin/loan.stats");
const recent_loans_1 = require("../controllers/admin/recent.loans");
const recent_loans_2 = require("../controllers/user/recent.loans");
const loan_application_1 = require("../controllers/user/loan.application");
const router = express_1.default.Router();
router.post('/signup', auth_1.signup);
router.post('/login', auth_1.login);
router.get('/admin/stats', (0, role_auth_1.default)('admin'), loan_stats_1.getLoanStats);
router.get('/admin/recent-loans', (0, role_auth_1.default)('admin'), recent_loans_1.getRecentLoans);
router.get('/verifier/stats', (0, role_auth_1.default)('verifier'), loan_stats_1.getLoanStats);
router.get('/verifier/recent-loans', (0, role_auth_1.default)('verifier'), recent_loans_1.getRecentLoans);
router.get('/user/loans', (0, role_auth_1.default)('loan_user'), recent_loans_2.getUserRecentLoans);
router.post('/user/loan-application', (0, role_auth_1.default)('loan_user'), loan_application_1.submitLoanApplication);
//logout
router.post('/logout', auth_1.logout);
exports.default = router;
