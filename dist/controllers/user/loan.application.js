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
exports.submitLoanApplication = void 0;
const LoanApplication_1 = __importDefault(require("../../models/LoanApplication"));
const submitLoanApplication = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { loanAmount, loanPurpose, loanTenure, employmentStatus, address1, address2, } = req.body;
        const user = req.user;
        if (!loanAmount || !loanPurpose || !loanTenure || !employmentStatus || !address1) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }
        const newApplication = new LoanApplication_1.default({
            userId: user.userId,
            loanAmount: loanAmount,
            loanPurpose: loanPurpose,
            loanTenure: loanTenure,
            employmentStatus: employmentStatus,
            loanStatus: 'Pending',
            address1: address1,
            address2: address2 !== null && address2 !== void 0 ? address2 : '',
            createdAt: new Date(),
        });
        yield newApplication.save();
        res.status(201).json({ message: 'Loan application submitted successfully', application: newApplication });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error });
    }
});
exports.submitLoanApplication = submitLoanApplication;
