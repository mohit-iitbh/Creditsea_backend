"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.signup = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
}
// Signup function
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = new User_1.default({ username, password: hashedPassword, role, email, number });
        yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ message: 'User created successfully', token: token, role: newUser.role });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});
exports.signup = signup;
// Login function
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: 'Please provide all required fields' });
        return;
    }
    try {
        const user = yield User_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({ message: 'Invalid credentials' });
            return;
        }
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ message: 'Login successful', token });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', role: user.role, token });
    }
    catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});
exports.login = login;
// Logout function
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        res.status(400).json({ message: 'Token not provided' });
        return;
    }
    try {
        jsonwebtoken_1.default.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(400).json({ message: 'Invalid token' });
                return;
            }
            // Here we can invalidate the token by setting its expiration to a past date
            const expiredToken = jsonwebtoken_1.default.sign({ id: decoded.id, role: decoded.role }, JWT_SECRET, { expiresIn: '1s' });
            res.status(200).json({ message: 'Logout successful', token: expiredToken });
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error logging out', error });
    }
});
exports.logout = logout;
