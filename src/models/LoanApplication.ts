import mongoose from 'mongoose';

const loanApplicationSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    loanAmount: { type: Number, required: true },
    loanPurpose: { type: String, required: true },
    loanTenure: { type: Number, required: true },
    employmentStatus: { type: String, required: true, enum: ['Employed', 'Unemployed', 'Self-Employed'] },
    loanStatus: { type: String, default: 'Pending', enum: ['Pending', 'Verified', 'Approved', 'Rejected'] },
    address1: { type: String, required: true },
    address2: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const LoanApplication = mongoose.model('LoanApplication', loanApplicationSchema);

export default LoanApplication;