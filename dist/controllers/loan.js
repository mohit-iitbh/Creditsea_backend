"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardData = exports.submitLoanApplication = void 0;
const LoanApplication_1 = __importDefault(require("../models/LoanApplication"));
const submitLoanApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { applicantName, applicantEmail, loanAmount, loanPurpose, userId } = req.body;
        const loanApplication = new LoanApplication_1.default({ applicantName, applicantEmail, loanAmount, loanPurpose, userId });
        yield loanApplication.save();
        res.status(200).send('Loan application submitted successfully');
    }
    catch (error) {
        res.status(500).send('Error submitting loan application');
    }
});
exports.submitLoanApplication = submitLoanApplication;
const getDashboardData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield LoanApplication_1.default.find().populate('userId', 'username email');
        res.status(200).json(data);
    }
    catch (error) {
        res.status(500).send('Error fetching dashboard data');
    }
});
exports.getDashboardData = getDashboardData;
