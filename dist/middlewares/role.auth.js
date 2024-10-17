"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const roleAuthMiddleware = (requiredRole) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not defined');
    }
    return (req, res, next) => {
        var _a;
        const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: 'User not logged in' });
            return;
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            const userId = decoded.id;
            const userRole = decoded.role;
            if (userRole !== requiredRole) {
                res.status(403).json({ message: 'Access denied' });
                return;
            }
            req.user = { userId, role: userRole };
            next();
        }
        catch (error) {
            res.status(401).json({ message: 'Invalid token' });
        }
    };
};
exports.default = roleAuthMiddleware;
