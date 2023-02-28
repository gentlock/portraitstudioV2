"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myservicesSchema = exports.portfolioSchema = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const myserviceS = new mongoose_1.default.Schema({
    isActive: { type: Boolean, default: false },
    addDate: { type: Date, default: Date.now },
    name: String,
    subtitle: String,
    desc: String,
    priceList: String,
    gallery: [String],
    coverPhoto: String,
});
const portfolioS = new mongoose_1.default.Schema({
    isActive: { type: Boolean, default: false },
    addDate: { type: Date, default: Date.now },
    name: String,
    desc: String,
    clientName: String,
    clientEmail: String,
    coverPhoto: String,
    accessCode: String,
    serviceId: String,
    clientInfo: String,
    downloadable: { filename: String, filesize: Number },
    gallery: [String],
});
exports.portfolioSchema = mongoose_1.default.model('albums', portfolioS);
exports.myservicesSchema = mongoose_1.default.model('myservices', myserviceS);
