"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db_delete = exports.db_update = exports.db_add_new = exports.db_fetch_by_id = exports.db_fetch_all = void 0;
const schemas_1 = require("../schemas");
const fs_1 = __importDefault(require("fs"));
const mongoose_1 = require("mongoose");
// import ObjectId = module
const configuration = require('../../../../../conf/keys');
function db_fetch_all(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let filter = req.params.filter;
        if (mongoose_1.Types.ObjectId.isValid(req.params.filter)) {
            yield schemas_1.portfolioSchema
                .find({ serviceId: filter })
                .sort({ addDate: -1 })
                .then((result) => res.json(result))
                .catch((error) => {
                res.sendStatus(500).send(error);
            });
        }
        else {
            yield schemas_1.portfolioSchema
                .find({})
                .sort({ addDate: -1 })
                .then((result) => res.json(result))
                .catch((error) => {
                res.sendStatus(500).send(error);
            });
        }
    });
}
exports.db_fetch_all = db_fetch_all;
function db_fetch_by_id(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = req.params.id;
        yield schemas_1.portfolioSchema
            .findById(id)
            .then((result) => res.json(result))
            .catch((error) => res.sendStatus(500).send(error));
    });
}
exports.db_fetch_by_id = db_fetch_by_id;
function db_add_new(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield schemas_1.portfolioSchema
            .create({
            isActive: req.body.isActive || false,
            addDate: Date.now(),
            name: req.body.name,
            clientName: req.body.clientName,
            clientEmail: req.body.clientEmail,
            coverPhoto: '',
            accessCode: req.body.accessCode,
            serviceId: req.body.serviceId,
            clientInfo: req.body.clientInfo,
            desc: req.body.desc,
            fileToDownload: '',
        })
            .then((result) => {
            try {
                // next(configuration.folders.uploadDir.pathAdress);
                fs_1.default.mkdirSync(configuration.uploadDir.pathAdress + '/' + result._id);
            }
            catch (err) {
                next(err);
            }
            res.json(result);
        })
            .catch((error) => res.sendStatus(500).send(error));
    });
}
exports.db_add_new = db_add_new;
function db_update(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = req.params.id;
        if (!!id) {
            yield schemas_1.portfolioSchema
                .findByIdAndUpdate(id, {
                isActive: req.body.isActive,
                name: req.body.name,
                clientName: req.body.clientName,
                clientEmail: req.body.clientEmail,
                accessCode: req.body.accessCode,
                serviceId: req.body.serviceId,
                clientInfo: req.body.clientInfo,
                desc: req.body.desc,
            })
                .then((result) => res.json(result))
                .catch((error) => res.sendStatus(500).send(error));
        }
        else {
            return res.sendStatus(400).send('brakuje numeru ID');
        }
    });
}
exports.db_update = db_update;
function db_delete(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = req.params.id;
        if (id) {
            yield schemas_1.portfolioSchema
                .findByIdAndDelete(id)
                .then((result) => {
                try {
                    fs_1.default.rmSync(configuration.uploadDir.pathAdress + '/' + id, {
                        recursive: true,
                        force: true,
                    });
                }
                catch (err) {
                    next(err);
                }
                res.json(result);
            })
                .catch((error) => res.sendStatus(500).send(error));
        }
        else {
            return res.sendStatus(400).send('brakuje numeru ID');
        }
    });
}
exports.db_delete = db_delete;
