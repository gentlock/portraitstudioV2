import { NextFunction, Request, Response } from 'express';
import { albumsSchema } from '../schemas';
// import {createDir} from "./utils";
import fs from 'fs';
const configuration = require('../../../../conf/config');

export async function db_fetch_all(req: Request, res: Response) {
  await albumsSchema
    .find({})
    .sort({ addDate: -1 })
    .then((result) => res.json(result))
    .catch((error) => {
      res.json({ error });
    });
}

export async function db_fetch_by_id(req: Request, res: Response) {
  let id = req.params.id;

  await albumsSchema
    .findById(id)
    .then((result) => res.json(result))
    .catch((error) => res.json({ error }));
}

export async function db_add_new(
  req: Request,
  res: Response,
  next: NextFunction
) {
  await albumsSchema
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
        fs.mkdirSync(configuration.uploadDir.pathAdress + '/' + result._id);
      } catch (err) {
        next(err);
      }
      res.json(result);
    })
    .catch((error) => res.json({ error }));
}

export async function db_update(req: Request, res: Response) {
  let id = req.params.id;

  if (!!id) {
    await albumsSchema
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
      .catch((error) => res.json({ error }));
  } else {
    return res.status(500).send({ error: 'brakuje numeru ID' });
  }
}

export async function db_delete(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let id = req.params.id;

  if (id) {
    await albumsSchema
      .findByIdAndDelete(id)
      .then((result) => {
        try {
          fs.rmSync(configuration.uploadDir.pathAdress + '/' + id, {
            recursive: true,
            force: true,
          });
        } catch (err) {
          next(err);
        }
        res.json(result);
      })
      .catch((error) => res.json({ error }));
  }
}
