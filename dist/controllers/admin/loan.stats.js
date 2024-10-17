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
exports.getLoanStats = void 0;
const loan_stats_1 = __importDefault(require("../../models/loan.stats"));
const getLoanStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const stats = yield loan_stats_1.default.find({});
        res.status(200).json(stats);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching loan stats' });
    }
});
exports.getLoanStats = getLoanStats;
