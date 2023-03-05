'use strict';

import express from 'express';
import {sendEmail} from "../middleware/utils";
const configuration = require('../../../../../conf/keys');

let router = express.Router();
let urls = configuration.api.endpointURLS.utils;

router.post(urls.sendEmail, sendEmail);

module.exports = router;


