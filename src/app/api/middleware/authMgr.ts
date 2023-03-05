import { NextFunction, Request, Response } from 'express';
const configuration = require('../../../../conf/keys');
import { authSchema } from '../schemas';
const { TOKEN_KEY } = process.env;

let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');

export async function createUser(req: Request, res: Response) {
  try {
    const { firstname, lastname, email, password } = configuration.basicUser;

    const oldUser = await authSchema.findOne({ email });
    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    let encryptedPassword = await bcrypt.hash(password, 8);

    await authSchema.create({
      firstname,
      lastname,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword,
    });
  } catch (err) {
      console.log(err);
  }

  return res.status(200).send("User created"); // Success 200
}
export async function verifyCred(req: Request, res: Response) {
  let { email, password } = req.body;
  let token = "";

  try {
    const { email, password } = req.body;
    if (!(email && password)) {
      res.status(400).json(
        {
          message: "All input is required!",
          token: token
        });
    }

    const user = await authSchema.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      token = jwt.sign(
        { user_id: user._id, email },
        TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;
      await user.save();

    } else {
      res.status(401).json(
        {
          message: "unauthorized!",
          token: token
        });
    }
  } catch (err) {
    console.log(err);
  }

  res.status(200).json({
    message: "Auth granted, welcome!",
    token: token
  });
}
export async function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.body.token;
  // || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }

  try {
    jwt.verify(token, TOKEN_KEY);
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }

  return res.status(202).send("Validation success"); // Accepted 202
}
