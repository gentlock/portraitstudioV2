import mongoose from 'mongoose';

const myserviceS = new mongoose.Schema({
  isActive: { type: Boolean, default: false },
  addDate: { type: Date, default: Date.now },
  name: String,
  subtitle: String,
  desc: String,
  priceList: String,
  gallery: [String],
  coverPhoto: String,
});

export const portfolioS = new mongoose.Schema({
  isActive: { type: Boolean, default: false },
  addDate: { type: Date, default: Date.now },
  name: String,
  desc: String,
  clientName: String,
  clientEmail: String,
  coverPhoto: String,
  accessCode: String,
  serviceId: String,
  clientInfo: String,
  downloadable: { filename: String, filesize: Number },
  gallery: [String],
});

export const portfolioSchema = mongoose.model('portfolio', portfolioS);
export const myservicesSchema = mongoose.model('myservices', myserviceS);
