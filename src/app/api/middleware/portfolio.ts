'use strict';

import { NextFunction, Request, Response } from 'express';
import { portfolioSchema} from '../schemas';
import fs from 'fs';
import {Types} from "mongoose";
const configuration = require('../../../../../conf/keys');

export async function fetch_query(req: Request, res: Response) {
  let { query, options } = req.body;

  await portfolioSchema.paginate(query, options, function(err, result) {
    if(!err) {
      // console.log(result);
      res.json(result);
    } else {
      res.sendStatus(500).send(err);
    }
  })
}
export async function db_fetch_all(req: Request, res: Response) {
  let filter = req.params.filter;

  if(Types.ObjectId.isValid( req.params.filter )) {
    await portfolioSchema
      .find({serviceId: filter})
      .sort({ addDate: -1 })
      .then((result) => res.json(result))
      .catch((error) => {
        res.sendStatus(500).send(error);
      });

  } else {
    await portfolioSchema
      .find({})
      .sort({ addDate: -1 })
      .then((result) => res.json(result))
      .catch((error) => {
        res.sendStatus(500).send(error);
      });
  }
}

export async function db_fetch_by_id(req: Request, res: Response) {
  let id = req.params.id;

  await portfolioSchema
    .findById(id)
    .then((result) => res.json(result))
    .catch((error) => res.sendStatus(500).send(error));
}

export async function db_add_new(
  req: Request,
  res: Response,
  next: NextFunction
) {
  await portfolioSchema
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
    .catch((error) => res.sendStatus(500).send(error));
}

export async function db_update(req: Request, res: Response) {
  let id = req.params.id;

  if (!!id) {
    await portfolioSchema
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
  } else {
    return res.sendStatus(400).send('brakuje numeru ID');
  }
}

export async function db_delete(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let id = req.params.id;

  if (id) {
    await portfolioSchema
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
      .catch((error) => res.sendStatus(500).send(error));
  } else {
    return res.sendStatus(400).send('brakuje numeru ID');
  }
}
