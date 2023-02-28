import mongoose from 'mongoose';

const carouselS = new mongoose.Schema({
  isActive: { type: Boolean, default: false },
  addDate: { type: Date, default: Date.now },
  name: String,
  subtitle: String,
  desc: String,
  photo: String,
});

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

const albumS = new mongoose.Schema({
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

export const albumsSchema = mongoose.model('albums', albumS);
export const carouselSchema = mongoose.model('carousel', carouselS);
export const myservicesSchema = mongoose.model('myservices', myserviceS);
