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
exports.getUserRecentLoans = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const LoanApplication_1 = __importDefault(require("../../models/LoanApplication"));
const getUserRecentLoans = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        // Ensure userId is a valid ObjectId
        if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
            res.status(400).json({ message: 'Invalid user ID' });
        }
        const recentApplications = yield LoanApplication_1.default.find({ userId: req.user.userId })
            .sort({ createdAt: -1 })
            .limit(10)
            .populate('userId', 'username email')
            .select('loanAmount loanPurpose loanTenure employmentStatus loanStatus createdAt');
        res.status(200).json(recentApplications);
    }
    catch (error) {
        res.status(500).json({ message: 'Error retrieving recent loan applications for the user', error });
    }
});
exports.getUserRecentLoans = getUserRecentLoans;
