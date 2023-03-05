import { Request, Response } from 'express';
import {IEmail} from "../../core/abstracts";
const nodemailer    = require("nodemailer");
const configuration = require('../../../../../conf/keys');



export async function sendEmail(req: Request, res: Response) {
  // const { firstname, lastname, email, password } = configuration.basicUser;
  try {
    let data: IEmail = req.body;
    let mailer = configuration.mailer;
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: mailer.transporter.host,
      port: mailer.transporter.port,
      secure: mailer.transporter.port, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });

    let info = await transporter.sendMail({
      from: `"${data.name}" <${data.email}>`, // sender address
      to: mailer.transporter.headers.my_email, // list of receivers
      subject: data.subject, // Subject line
      text: data.message, // plain text body
    });

    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    res.send(200).json( nodemailer.getTestMessageUrl(info) );

  } catch (err) {
    // console.log(err);
    res.send(500).json({err});
  }
}
