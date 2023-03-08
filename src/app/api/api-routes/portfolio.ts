'use strict';

import express from 'express';
import {
  db_add_new,
  db_delete,
  db_fetch_all,
  db_fetch_by_id,
  db_update,
  fetch_query,
} from '../middleware/portfolio';
const configuration = require('../../../../../conf/keys');

// import dotenv from 'dotenv';
let router = express.Router();
let urls = configuration.api.endpointURLS.portfolio;

router.get(urls.getAll, db_fetch_all);
router.post(urls.fetchQuery, fetch_query);
router.get(urls.getAll + `/:filter`, db_fetch_all);
router.get(urls.getById + '/:id', db_fetch_by_id);
router.post(urls.addNew, db_add_new);
router.put(urls.update + '/:id', db_update);
router.delete(urls.remove + '/:id', db_delete);

module.exports = router;
