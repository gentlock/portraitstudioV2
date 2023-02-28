'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const express_1 = __importDefault(require('express'));
const dataMgr_1 = require('../middleware/dataMgr');
const configuration = require('../../../../conf/keys.json');
// import dotenv from 'dotenv';
let router = express_1.default.Router();
let urls = configuration.api.endpointURLS.dataMgr;
router.put(urls.uploadData + '/:id/:useSchema', dataMgr_1.uploadData);
router.delete(
  urls.deleteFile + '/:id/:photoName/:useSchema',
  dataMgr_1.deleteFile
);
router.get(
  urls.setCoverPhoto + '/:id/:photoName/:useSchema',
  dataMgr_1.setCoverPhoto
);
router.get(urls.fetchGallery + '/:id/:useSchema', dataMgr_1.fetchGallery);
router.put(urls.uploadSingle + '/:id', dataMgr_1.uploadSingle);
module.exports = router;
