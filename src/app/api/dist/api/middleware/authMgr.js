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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.verifyCred = exports.createUser = void 0;
const configuration = require('../../../../../conf/keys');
const schemas_1 = require("../schemas");
const { TOKEN_KEY } = process.env;
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { firstname, lastname, email, password } = configuration.basicUser;
            const oldUser = yield schemas_1.authSchema.findOne({ email });
            if (oldUser) {
                return res.sendStatus(409).send("User Already Exist. Please Login");
            }
            let encryptedPassword = yield bcrypt.hash(password, 8);
            yield schemas_1.authSchema.create({
                firstname,
                lastname,
                email: email.toLowerCase(),
                password: encryptedPassword,
            });
        }
        catch (err) {
            console.log(err);
        }
        return res.send("User created"); // Success 200
    });
}
exports.createUser = createUser;
function verifyCred(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let { email, password } = req.body;
        let token = "";
        try {
            if (!(email && password)) {
                res.json({
                    message: "All input is required!",
                    token: token
                });
            }
            const user = yield schemas_1.authSchema.findOne({ email });
            if (user && (yield bcrypt.compare(password, user.password))) {
                token = jwt.sign({ user_id: user._id, email }, TOKEN_KEY, {
                    expiresIn: "2h",
                });
                user.token = token;
                yield user.save();
                res.json({
                    message: "Auth granted, welcome!",
                    token: token
                });
            }
            else {
                res.sendStatus(401).json({
                    message: "unauthorized!",
                    token: token
                });
            }
        }
        catch (err) {
            console.log(err);
        }
    });
}
exports.verifyCred = verifyCred;
function verifyToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.body.token;
        // || req.query.token || req.headers["x-access-token"];
        if (!token) {
            return res.sendStatus(403).send("A token is required for authentication"); // forbiden
        }
        try {
            jwt.verify(token, TOKEN_KEY);
        }
        catch (err) {
            return res.sendStatus(401).send("Invalid Token"); // unauthorized
        }
        return res.send("Validation success"); // Accepted 202
    });
}
exports.verifyToken = verifyToken;
