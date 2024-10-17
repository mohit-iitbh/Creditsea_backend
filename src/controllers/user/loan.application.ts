import { Request, Response } from 'express';
import LoanApplication from '../../models/LoanApplication';

export const submitLoanApplication = async (req: Request, res: Response): Promise<void> => {
    try {
        const { loanAmount, loanPurpose, loanTenure, employmentStatus, address1, address2, } = req.body;
        const user = req.user!;

        if (!loanAmount || !loanPurpose || !loanTenure || !employmentStatus || !address1) {
            res.status(400).json({ message: 'All fields are required' });
            return;
        }

        const newApplication = new LoanApplication({
            userId: user.userId,
            loanAmount: loanAmount,
            loanPurpose: loanPurpose,
            loanTenure: loanTenure,
            employmentStatus: employmentStatus,
            loanStatus: 'Pending',
            address1: address1,
            address2: address2 ?? '',
            createdAt: new Date(),
        });

        await newApplication.save();

        res.status(201).json({ message: 'Loan application submitted successfully', application: newApplication });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error });
    }
};