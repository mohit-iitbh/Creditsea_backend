"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const loanApplicationSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    loanAmount: { type: Number, required: true },
    loanPurpose: { type: String, required: true },
    loanTenure: { type: Number, required: true },
    employmentStatus: { type: String, required: true, enum: ['Employed', 'Unemployed', 'Self-Employed'] },
    loanStatus: { type: String, default: 'Pending', enum: ['Pending', 'Verified', 'Approved', 'Rejected'] },
    address1: { type: String, required: true },
    address2: { type: String },
    createdAt: { type: Date, default: Date.now },
});
const LoanApplication = mongoose_1.default.model('LoanApplication', loanApplicationSchema);
exports.default = LoanApplication;
