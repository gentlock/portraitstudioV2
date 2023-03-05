'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const utils_1 = require("../middleware/utils");
const configuration = require('../../../../../conf/keys');
let router = express_1.default.Router();
let urls = configuration.api.endpointURLS.utils;
router.post(urls.sendEmail, utils_1.sendEmail);
module.exports = router;
