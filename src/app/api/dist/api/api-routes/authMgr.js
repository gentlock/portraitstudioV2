"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMgr_1 = require("../middleware/authMgr");
const configuration = require('../../../../../conf/keys');
let router = express_1.default.Router();
let urls = configuration.api.endpointURLS.auth;
router.get(urls.createUser, authMgr_1.createUser);
router.post(urls.verifyCred, authMgr_1.verifyCred);
router.post(urls.verifyToken, authMgr_1.verifyToken);
module.exports = router;
