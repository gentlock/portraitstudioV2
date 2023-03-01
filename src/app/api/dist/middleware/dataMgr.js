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
exports.uploadData = exports.uploadSingle = exports.fetchGallery = exports.deleteFile = exports.setCoverPhoto = void 0;
// import * as fs from "fs";
const configuration = require('../../../../conf/keys');
const schemas_1 = require("../schemas");
const schemas_2 = require("../schemas");
const fs_1 = __importDefault(require("fs"));
function setCoverPhoto(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = req.params.id;
        let photoName = req.params.photoName;
        let useSchema = req.params.useSchema;
        if (useSchema === 'portfolioSchema') {
            yield schemas_1.portfolioSchema
                .findByIdAndUpdate(id, { coverPhoto: photoName })
                .then((result) => res.json(result))
                .catch((error) => res.json({ error }));
        }
        else if (useSchema === 'myservicesSchema') {
            yield schemas_2.myservicesSchema
                .findByIdAndUpdate(id, { coverPhoto: photoName })
                .then((result) => res.json(result))
                .catch((error) => res.json({ error }));
        }
    });
}
exports.setCoverPhoto = setCoverPhoto;
function deleteFile(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = req.params.id;
        let photoName = req.params.photoName;
        let useSchema = req.params.useSchema;
        let upDir = configuration.uploadDir.pathAdress;
        if (useSchema === 'portfolioSchema') {
            yield schemas_1.portfolioSchema
                .updateOne({ _id: id }, {
                $unset: { coverPhoto: { $cond: { coverPhoto: photoName } } },
                $pull: { gallery: photoName },
            })
                .then((result) => {
                try {
                    fs_1.default.unlinkSync(upDir + `/${id}/` + photoName);
                }
                catch (err) {
                    res.json(err);
                }
            })
                .catch((err) => res.json(err));
        }
        else if (useSchema === 'myservicesSchema') {
            yield schemas_2.myservicesSchema
                .updateOne({ _id: id }, {
                $unset: { coverPhoto: { $cond: { coverPhoto: photoName } } },
                $pull: { gallery: photoName },
            })
                .then((result) => {
                try {
                    fs_1.default.unlinkSync(upDir + `/${id}/` + photoName);
                }
                catch (err) {
                    res.json(err);
                }
            })
                .catch((err) => res.json(err));
        }
    });
}
exports.deleteFile = deleteFile;
function fetchGallery(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = req.params.id;
        let useSchema = req.params.useSchema;
        // let data_schema: Model<any>;    data_schema = mongoose.model(useSchema, albumsSchema.schema);
        if (useSchema === 'portfolioSchema') {
            yield schemas_1.portfolioSchema
                .findById(id, { gallery: 1, coverPhoto: 1 })
                .then((result) => res.json(result))
                .catch((error) => res.json({ error }));
        }
        else if (useSchema === 'myservicesSchema') {
            yield schemas_2.myservicesSchema
                .findById(id, { gallery: 1, coverPhoto: 1 })
                .then((result) => res.json(result))
                .catch((error) => res.json({ error }));
        }
    });
}
exports.fetchGallery = fetchGallery;
function uploadSingle(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = req.params.id;
        let file = req.files.file;
        let uploadPath = configuration.uploadDir.pathAdress + `/${id}/` + file.name;
        yield file.mv(uploadPath, (err) => __awaiter(this, void 0, void 0, function* () {
            if (!err) {
                yield schemas_1.portfolioSchema.findByIdAndUpdate(id, {
                    downloadable: { filename: file.name, filesize: file.size },
                });
            }
            else {
                console.log(err);
                res.json({ err });
            }
        }));
    });
}
exports.uploadSingle = uploadSingle;
function uploadData(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let id = req.params.id;
        let useSchema = req.params.useSchema;
        let data = req.files;
        Object.values(data).forEach((item) => {
            let file = item;
            let uploadPath = configuration.uploadDir.pathAdress + `/${id}/` + file.name;
            // skopiowano wiele plikow
            if (!file.name) {
                Object.values(file).forEach((el) => {
                    let file2 = el;
                    let uploadPath2 = configuration.uploadDir.pathAdress + `/${id}/` + file2.name;
                    // console.log(el);
                    file2.mv(uploadPath2, (err) => __awaiter(this, void 0, void 0, function* () {
                        if (!err) {
                            if (useSchema === 'portfolioSchema') {
                                yield schemas_1.portfolioSchema.findByIdAndUpdate(id, {
                                    $push: { gallery: file2.name },
                                });
                            }
                            else if (useSchema === 'myservicesSchema') {
                                yield schemas_2.myservicesSchema.findByIdAndUpdate(id, {
                                    $push: { gallery: file2.name },
                                });
                            }
                        }
                    }));
                });
                // skopiowano jeden plik
            }
            else {
                // console.log(file);
                file.mv(uploadPath, (err) => __awaiter(this, void 0, void 0, function* () {
                    if (!err) {
                        if (useSchema === 'portfolioSchema') {
                            yield schemas_1.portfolioSchema.findByIdAndUpdate(id, {
                                $push: { gallery: file.name },
                            });
                        }
                        else if (useSchema === 'myservicesSchema') {
                            yield schemas_2.myservicesSchema.findByIdAndUpdate(id, {
                                $push: { gallery: file.name },
                            });
                        }
                    }
                }));
            }
        });
    });
}
exports.uploadData = uploadData;
