'use strict';

import express, { Express, Request, Response } from 'express';
import {
  deleteFile,
  fetchGallery,
  setCoverPhoto,
  uploadData,
  uploadSingle,
} from '../middleware/dataMgr';
const configuration = require('../../../../conf/config');

// import dotenv from 'dotenv';
let router = express.Router();
let urls = configuration.api.endpointURLS.dataMgr;

router.put(urls.uploadData + '/:id/:useSchema', uploadData);
router.delete(urls.deleteFile + '/:id/:photoName/:useSchema', deleteFile);
router.get(urls.setCoverPhoto + '/:id/:photoName/:useSchema', setCoverPhoto);
router.get(urls.fetchGallery + '/:id/:useSchema', fetchGallery);
router.put(urls.uploadSingle + '/:id', uploadSingle);

module.exports = router;
