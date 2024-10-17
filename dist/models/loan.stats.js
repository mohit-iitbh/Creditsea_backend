"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const loanStatsSchema = new mongoose_1.default.Schema({
    activeUsers: { type: Number, required: true },
    borrowers: { type: Number, required: true },
    cashDisbursed: { type: Number, required: true },
    cashReceived: { type: Number, required: true },
    savings: { type: Number, required: true },
    repaidLoans: { type: Number, required: true },
    otherAccounts: { type: Number, required: true },
    loans: { type: Number, required: true },
});
const LoanStats = mongoose_1.default.model("LoanStats", loanStatsSchema);
exports.default = LoanStats;
