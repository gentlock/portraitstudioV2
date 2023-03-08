import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import {IPortfolioFeed} from "../core/abstracts";

const authS = new mongoose.Schema({
  firstname: { type: String, default: null },
  lastname: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  token: { type: String, default: "" },
});

const myserviceS = new mongoose.Schema({
  isActive: { type: Boolean, default: false },
  addDate: { type: Date, default: Date.now },
  name: { type: String },
  subtitle: { type: String },
  desc: { type: String },
  priceList: { type: String },
  gallery:  { type: [String] },
  coverPhoto: { type: String },
});

export const portfolioS = new mongoose.Schema({
  isActive: { type: Boolean, default: false },
  addDate: { type: Date, default: Date.now },
  name: { type: String },
  desc: { type: String },
  clientName: { type: String },
  clientEmail: { type: String },
  coverPhoto: { type: String },
  accessCode: { type: String },
  serviceId: { type: String },
  clientInfo: { type: String },
  downloadable: { filename: String, filesize: Number },
  gallery: { type: [String] },
});

portfolioS.plugin(mongoosePaginate);
myserviceS.plugin(mongoosePaginate);
interface docExt extends mongoose.Document {};

export const portfolioSchema = mongoose.model<docExt, mongoose.PaginateModel<docExt>>('portfolio', portfolioS);
export const myservicesSchema = mongoose.model<docExt, mongoose.PaginateModel<docExt>>('myservices', myserviceS);
export const authSchema = mongoose.model('auth', authS);
