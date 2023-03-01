"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createError = require('http-errors');
// import path from 'path';
const mongoose_1 = __importDefault(require("mongoose"));
const fileUpload = require('express-fileupload');
const configuration = require('../../../conf/keys');
// DOTENV
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let authenticationRouter = require('./api-routes/authentication');
let portfolioRouter = require('./api-routes/portfolio');
let servicesRouter = require('./api-routes/services');
let dataMgrRouter = require('./api-routes/dataMgr');
// baza danych MongoDB
mongoose_1.default.set('strictQuery', false);
mongoose_1.default.connect('mongodb://' +
    configuration.db.host +
    ':' +
    configuration.db.port +
    '/' +
    configuration.db.database);
const app = (0, express_1.default)();
const port = process.env.PORT;
// app.set("configuration", configuration);
app.use(fileUpload());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(configuration.api.endpointURLS.authentication.basePath, authenticationRouter);
app.use(configuration.api.endpointURLS.portfolio.basePath, portfolioRouter);
app.use(configuration.api.endpointURLS.myservices.basePath, servicesRouter);
app.use(configuration.api.endpointURLS.dataMgr.basePath, dataMgrRouter);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
