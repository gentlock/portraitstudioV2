import express from 'express';
import {createUser, verifyCred, verifyToken} from "../middleware/authMgr";
const configuration = require('../../../../conf/keys');

let router = express.Router();
let urls = configuration.api.endpointURLS.auth;

router.get(urls.createUser, createUser);
router.post(urls.verifyCred, verifyCred);
router.post(urls.verifyToken, verifyToken);

module.exports = router;
