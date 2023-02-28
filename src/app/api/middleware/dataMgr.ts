import { NextFunction, Request, Response } from 'express';
import { FileArray, UploadedFile } from 'express-fileupload';
// import * as fs from "fs";
const configuration = require('../../../../conf/config');
import { albumsSchema } from '../schemas';
import { myservicesSchema } from '../schemas';
import fs from 'fs';
import { HttpErrorResponse } from '@angular/common/http';

export async function setCoverPhoto(req: Request, res: Response) {
  let id = req.params.id;
  let photoName = req.params.photoName;
  let useSchema = req.params.useSchema;

  if (useSchema === 'albumsSchema') {
    await albumsSchema
      .findByIdAndUpdate(id, { coverPhoto: photoName })
      .then((result) => res.json(result))
      .catch((error) => res.json({ error }));
  } else if (useSchema === 'myservicesSchema') {
    await myservicesSchema
      .findByIdAndUpdate(id, { coverPhoto: photoName })
      .then((result) => res.json(result))
      .catch((error) => res.json({ error }));
  }
}

export async function deleteFile(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let id = req.params.id;
  let photoName = req.params.photoName;
  let useSchema = req.params.useSchema;
  let upDir = configuration.uploadDir.pathAdress;

  if (useSchema === 'albumsSchema') {
    await albumsSchema
      .updateOne(
        { _id: id },
        {
          $unset: { coverPhoto: { $cond: { coverPhoto: photoName } } },
          $pull: { gallery: photoName },
        }
      )
      .then((result) => {
        try {
          fs.unlinkSync(upDir + `/${id}/` + photoName);
        } catch (err) {
          res.json(err);
        }
      })
      .catch((err) => res.json(err));
  } else if (useSchema === 'myservicesSchema') {
    await myservicesSchema
      .updateOne(
        { _id: id },
        {
          $unset: { coverPhoto: { $cond: { coverPhoto: photoName } } },
          $pull: { gallery: photoName },
        }
      )
      .then((result) => {
        try {
          fs.unlinkSync(upDir + `/${id}/` + photoName);
        } catch (err) {
          res.json(err);
        }
      })
      .catch((err) => res.json(err));
  }
}

export async function fetchGallery(req: Request, res: Response) {
  let id = req.params.id;
  let useSchema = req.params.useSchema;
  // let data_schema: Model<any>;    data_schema = mongoose.model(useSchema, albumsSchema.schema);

  if (useSchema === 'albumsSchema') {
    await albumsSchema
      .findById(id, { gallery: 1, coverPhoto: 1 })
      .then((result) => res.json(result))
      .catch((error) => res.json({ error }));
  } else if (useSchema === 'myservicesSchema') {
    await myservicesSchema
      .findById(id, { gallery: 1, coverPhoto: 1 })
      .then((result) => res.json(result))
      .catch((error) => res.json({ error }));
  }
}

export async function uploadSingle(req: Request, res: Response) {
  let id = req.params.id;
  let file = req.files!.file as UploadedFile;

  let uploadPath = configuration.uploadDir.pathAdress + `/${id}/` + file.name;

  await file.mv(uploadPath, async (err) => {
    if (!err) {
      await albumsSchema.findByIdAndUpdate(id, {
        downloadable: { filename: file.name, filesize: file.size },
      });
    } else {
      console.log(err);
      res.json({ err });
    }
  });
}

export async function uploadData(req: Request, res: Response) {
  let id = req.params.id;
  let useSchema = req.params.useSchema;
  let data = req.files;

  Object.values(data!).forEach((item) => {
    let file = item as UploadedFile;
    let uploadPath = configuration.uploadDir.pathAdress + `/${id}/` + file.name;

    // skopiowano wiele plikow
    if (!file.name) {
      Object.values(file).forEach((el) => {
        let file2 = el as UploadedFile;
        let uploadPath2 =
          configuration.uploadDir.pathAdress + `/${id}/` + file2.name;

        // console.log(el);
        file2.mv(uploadPath2, async (err) => {
          if (!err) {
            if (useSchema === 'albumsSchema') {
              await albumsSchema.findByIdAndUpdate(id, {
                $push: { gallery: file2.name },
              });
            } else if (useSchema === 'myservicesSchema') {
              await myservicesSchema.findByIdAndUpdate(id, {
                $push: { gallery: file2.name },
              });
            }
          }
        });
      });
      // skopiowano jeden plik
    } else {
      // console.log(file);
      file.mv(uploadPath, async (err) => {
        if (!err) {
          if (useSchema === 'albumsSchema') {
            await albumsSchema.findByIdAndUpdate(id, {
              $push: { gallery: file.name },
            });
          } else if (useSchema === 'myservicesSchema') {
            await myservicesSchema.findByIdAndUpdate(id, {
              $push: { gallery: file.name },
            });
          }
        }
      });
    }
  });
}
