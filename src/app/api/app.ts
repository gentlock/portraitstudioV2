import express, { Express, Request, Response } from 'express';
import { HttpErrorResponse } from '@angular/common/http';
const createError = require('http-errors');
const fileUpload = require('express-fileupload');
const configuration = require('../../../conf/keys');

require('dotenv').config();
require("./db").connect();

let authMgrRouter = require('./api-routes/authMgr');
let portfolioRouter = require('./api-routes/portfolio');
let servicesRouter = require('./api-routes/services');
let dataMgrRouter = require('./api-routes/dataMgr');

const app: Express = express();
const port = process.env.PORT;

// app.set("configuration", configuration);
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(configuration.api.endpointURLS.auth.basePath, authMgrRouter);
app.use(configuration.api.endpointURLS.portfolio.basePath, portfolioRouter);
app.use(configuration.api.endpointURLS.myservices.basePath, servicesRouter);
app.use(configuration.api.endpointURLS.dataMgr.basePath, dataMgrRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err: HttpErrorResponse, req: Request, res: Response) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
