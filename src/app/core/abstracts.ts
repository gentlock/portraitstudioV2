
export interface IAuth {
  email: string;
  password: string;
}
export interface IAuthResp {
  message: string,
  token: string
}
export interface apiUrls {
  basePath: string;
  getAll: string;
  getById: string;
  addNew: string;
  update: string;
  remove: string;
}

export interface IMyserviceFeed {
  _id?: string;
  isActive: boolean;
  addDate?: Date;
  name: string;
  subtitle: string;
  desc: string;
  priceList: string;
  coverPhoto?: string;
  gallery?: string[];
}

export interface IPortfolioFeed {
  _id?: string;
  isActive: boolean;
  downloadable?: { filename: string; filesize: number };
  addDate?: Date;
  name: string;
  clientName: string;
  clientEmail: string;
  desc: string;
  accessCode: string;
  serviceId: string;
  clientInfo: string;
  gallery?: string[];
  coverPhoto?: string;
}
