import express from 'express';
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User'; 

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
}

// Signup function
export const signup: express.RequestHandler = async (req: Request, res: Response): Promise<void> => {

    const { username, password, email, number, role } = req.body;
    console.log(req.body);

    if (!username || !password || !role || !email || !number) {
        res.status(400).json({ message: 'Please provide all required fields' });
        return;
    }

    if (!['loan_user', 'admin', 'verifier'].includes(role)) {
        res.status(400).json({ message: 'Invalid role' });
        return;
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword, role, email, number });
        await newUser.save();
        const token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: 'User created successfully', token: token, role: newUser.role });

    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

// Login function
export const login: express.RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: 'Please provide all required fields' });
        return;
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET as string, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
        return;
        }

        const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful', role: user.role, token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};
// Logout function
export const logout: express.RequestHandler = async (req: Request, res: Response): Promise<void> => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        res.status(400).json({ message: 'Token not provided' });
        return;
    }

    try {
        jwt.verify(token, JWT_SECRET as string, (err, decoded) => {
            if (err) {
                res.status(400).json({ message: 'Invalid token' });
                return;
            }

            // Here we can invalidate the token by setting its expiration to a past date
            const expiredToken = jwt.sign({ id: (decoded as any).id, role: (decoded as any).role }, JWT_SECRET as string, { expiresIn: '1s' });

            res.status(200).json({ message: 'Logout successful', token: expiredToken });
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging out', error });
    }
};