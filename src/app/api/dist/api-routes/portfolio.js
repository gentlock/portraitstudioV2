'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const portfolio_1 = require("../middleware/portfolio");
const configuration = require('../../../../conf/keys');
// import dotenv from 'dotenv';
let router = express_1.default.Router();
let urls = configuration.api.endpointURLS.portfolio;
router.get(urls.getAll, portfolio_1.db_fetch_all);
router.get(urls.getAll + `/:filter`, portfolio_1.db_fetch_all);
router.get(urls.getById + '/:id', portfolio_1.db_fetch_by_id);
router.post(urls.addNew, portfolio_1.db_add_new);
router.put(urls.update + '/:id', portfolio_1.db_update);
router.delete(urls.remove + '/:id', portfolio_1.db_delete);
module.exports = router;
