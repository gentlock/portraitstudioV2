'use strict';
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
const configuration = require('../../../../../conf/keys');
const fs_1 = __importDefault(require("fs"));
function db_fetch_all(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield schemas_1.myservicesSchema
            .find({})
            .sort({ addDate: -1 })
            .then((result) => res.json(result))
            .catch((error) => {
            res.json({ error });
        });
    });
}
exports.db_fetch_all = db_fetch_all;
function db_fetch_by_id(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = req.params.id;
        yield schemas_1.myservicesSchema
            .findById(id)
            .then((result) => res.json(result))
            .catch((error) => res.json({ error }));
    });
}
exports.db_fetch_by_id = db_fetch_by_id;
function db_add_new(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield schemas_1.myservicesSchema
            .create({
            isActive: req.body.isActive || false,
            addDate: Date.now(),
            name: req.body.name,
            desc: req.body.desc,
            subtitle: req.body.subtitle,
            priceList: req.body.priceList,
            coverPhoto: '',
        })
            .then((result) => {
            try {
                // next(configuration.folders.uploadDir.pathAdress);
                fs_1.default.mkdirSync(configuration.uploadDir.pathAdress + '' + result._id);
            }
            catch (err) {
                next(err);
            }
            res.json(result);
        })
            .catch((error) => res.json({ error }));
    });
}
exports.db_add_new = db_add_new;
function db_update(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = req.params.id;
        if (!!id) {
            yield schemas_1.myservicesSchema
                .findByIdAndUpdate(id, {
                isActive: req.body.isActive,
                name: req.body.name,
                desc: req.body.desc,
                subtitle: req.body.subtitle,
                priceList: req.body.priceList,
            })
                .then((result) => res.json(result))
                .catch((error) => res.json({ error }));
        }
        else {
            return res.status(500).send({ error: 'brakuje numeru ID' });
        }
    });
}
exports.db_update = db_update;
function db_delete(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = req.params.id;
        if (id) {
            yield schemas_1.myservicesSchema
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
                .catch((error) => res.json({ error }));
        }
    });
}
exports.db_delete = db_delete;
