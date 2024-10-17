import { Request, Response } from 'express';
import LoanApplication from '../models/LoanApplication';

export const submitLoanApplication = async (req: Request, res: Response) => {
  try {
    const { applicantName, applicantEmail, loanAmount, loanPurpose, userId } = req.body;
    const loanApplication = new LoanApplication({ applicantName, applicantEmail, loanAmount, loanPurpose, userId });
    await loanApplication.save();
    res.status(200).send('Loan application submitted successfully');
  } catch (error) {
    res.status(500).send('Error submitting loan application');
  }
};

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    const data = await LoanApplication.find().populate('userId', 'username email');
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send('Error fetching dashboard data');
  }
};