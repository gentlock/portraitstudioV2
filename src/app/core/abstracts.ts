export enum msgStatus {
  SUCCESS,
  FAILURE,
}
interface IDBQueryOptions {
  pagination: boolean;
  select?: string | object;
  page: number;
  limit: number;
  sort?: object | string;
}
export type TDBQuery =  {
  query: {},
  options: IDBQueryOptions,
}
export interface IDBResult<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  page: number;
  totalPages: number;
  hasNextPage: boolean
  nextPage: number | null;
  hasPrevPage: boolean
  prevPage: number | null
}
export interface IEmail {
  'to_name': string;
  'to_email' : string;
  'from_name' : string;
  'from_email' : string;
  'subject': string;
  'message' : string;
}
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
  fetchQuery: string;
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
