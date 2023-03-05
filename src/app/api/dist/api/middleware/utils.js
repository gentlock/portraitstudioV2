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
exports.sendEmail = void 0;
const nodemailer = require("nodemailer");
const configuration = require('../../../../../conf/keys');
function sendEmail(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // const { firstname, lastname, email, password } = configuration.basicUser;
        try {
            let data = req.body;
            let mailer = configuration.mailer;
            let testAccount = yield nodemailer.createTestAccount();
            let transporter = nodemailer.createTransport({
                host: mailer.transporter.host,
                port: mailer.transporter.port,
                secure: mailer.transporter.port,
                auth: {
                    user: testAccount.user,
                    pass: testAccount.pass, // generated ethereal password
                },
            });
            let info = yield transporter.sendMail({
                from: `"${data.name}" <${data.email}>`,
                to: mailer.transporter.headers.my_email,
                subject: data.subject,
                text: data.message, // plain text body
            });
            // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            res.send(200).json(nodemailer.getTestMessageUrl(info));
        }
        catch (err) {
            // console.log(err);
            res.send(500).json({ err });
        }
    });
}
exports.sendEmail = sendEmail;
