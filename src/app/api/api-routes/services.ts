'use strict';

import express, { Express, Request, Response } from 'express';
import {
  db_add_new,
  db_delete,
  db_fetch_all,
  db_fetch_by_id,
  db_update,
} from '../middleware/services';
const configuration = require('../../../../conf/keys');

// import dotenv from 'dotenv';
let router = express.Router();
let urls = configuration.api.endpointURLS.myservices;

router.get(urls.getAll, db_fetch_all);
router.get(urls.getAll + `/:filter`, db_fetch_all);
router.get(urls.getById + '/:id', db_fetch_by_id);
router.post(urls.addNew, db_add_new);
router.put(urls.update + '/:id', db_update);
router.delete(urls.remove + '/:id', db_delete);

module.exports = router;
