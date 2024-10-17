import { Request, Response } from 'express';
import LoanApplication from '../../models/LoanApplication'; // Adjust the path as necessary

export const getRecentLoans = async (req: Request, res: Response) => {
    try {
        const recentApplications = await LoanApplication.find({})
            .sort({ createdAt: -1 })
            .limit(10) 
            .populate('userId', 'username email') 
            .select('loanAmount loanPurpose loanTenure employmentStatus loanStatus createdAt'); 

        res.status(200).json(recentApplications);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving recent loan applications', error });
    }
};