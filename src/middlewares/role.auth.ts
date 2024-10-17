import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const roleAuthMiddleware = (requiredRole: string) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(' ')[1];        
        if (!token) {
            res.status(401).json({ message: 'User not logged in' });
            return;
        }

        try {
            const decoded = jwt.verify(token, JWT_SECRET) as any;
            const userId = decoded.id;
            const userRole = decoded.role;            

            if (userRole !== requiredRole) {
                res.status(403).json({ message: 'Access denied' });
                return;
            }

            req.user = { userId, role: userRole };
            next();
        } catch (error) {
            res.status(401).json({ message: 'Invalid token' });
        }
    };
};

export default roleAuthMiddleware;


declare module 'express' {

    export interface Request {

        user?: {

            userId: string;

            role: string;

        };

    }

}
