import { Request, Response } from 'express';
import mongoose from 'mongoose';
import LoanApplication from '../../models/LoanApplication';

export const getUserRecentLoans = async (req: Request, res: Response) => {
    try {
        const userId = req.user!.userId;
        // Ensure userId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            res.status(400).json({ message: 'Invalid user ID' });
        }
        const recentApplications = await LoanApplication.find({ userId: req.user!.userId })
            .sort({ createdAt: -1 })
            .limit(10)
            .populate('userId', 'username email')
            .select('loanAmount loanPurpose loanTenure employmentStatus loanStatus createdAt');

        res.status(200).json(recentApplications);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving recent loan applications for the user', error });
    }
};