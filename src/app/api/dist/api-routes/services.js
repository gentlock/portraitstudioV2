'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const services_1 = require("../middleware/services");
const configuration = require('../../../../conf/keys');
// import dotenv from 'dotenv';
let router = express_1.default.Router();
let urls = configuration.api.endpointURLS.myservices;
router.get(urls.getAll, services_1.db_fetch_all);
router.get(urls.getAll + `/:filter`, services_1.db_fetch_all);
router.get(urls.getById + '/:id', services_1.db_fetch_by_id);
router.post(urls.addNew, services_1.db_add_new);
router.put(urls.update + '/:id', services_1.db_update);
router.delete(urls.remove + '/:id', services_1.db_delete);
module.exports = router;
