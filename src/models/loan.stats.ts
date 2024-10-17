import mongoose from "mongoose";

const loanStatsSchema = new mongoose.Schema({
  activeUsers: { type: Number, required: true },
  borrowers: { type: Number, required: true },
  cashDisbursed: { type: Number, required: true },
  cashReceived: { type: Number, required: true },
  savings : { type: Number, required: true },
  repaidLoans: { type: Number, required: true },
  otherAccounts: { type: Number, required: true },
  loans: { type: Number, required: true },
});

const LoanStats = mongoose.model("LoanStats", loanStatsSchema);
export default LoanStats;