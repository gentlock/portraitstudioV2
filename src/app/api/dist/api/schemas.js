"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSchema = exports.myservicesSchema = exports.portfolioSchema = exports.portfolioS = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const authS = new mongoose_1.default.Schema({
    firstname: { type: String, default: null },
    lastname: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    token: { type: String, default: "" },
});
const myserviceS = new mongoose_1.default.Schema({
    isActive: { type: Boolean, default: false },
    addDate: { type: Date, default: Date.now },
    name: { type: String },
    subtitle: { type: String },
    desc: { type: String },
    priceList: { type: String },
    gallery: { type: [String] },
    coverPhoto: { type: String },
});
exports.portfolioS = new mongoose_1.default.Schema({
    isActive: { type: Boolean, default: false },
    addDate: { type: Date, default: Date.now },
    name: { type: String },
    desc: { type: String },
    clientName: { type: String },
    clientEmail: { type: String },
    coverPhoto: { type: String },
    accessCode: { type: String },
    serviceId: { type: String },
    clientInfo: { type: String },
    downloadable: { filename: String, filesize: Number },
    gallery: { type: [String] },
});
exports.portfolioS.plugin(mongoose_paginate_v2_1.default);
;
exports.portfolioSchema = mongoose_1.default.model('portfolio', exports.portfolioS);
exports.myservicesSchema = mongoose_1.default.model('myservices', myserviceS);
exports.authSchema = mongoose_1.default.model('auth', authS);
