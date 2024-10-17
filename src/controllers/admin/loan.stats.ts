import express, { Request, Response } from "express";
import LoanApplication from "../../models/LoanApplication";
import LoanStats from "../../models/loan.stats";

export const getLoanStats: express.RequestHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const stats = await LoanStats.find({});
        res.status(200).json(stats);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching loan stats' });
    }   
}
