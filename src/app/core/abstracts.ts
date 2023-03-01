// export interface configuration {
//   "db": {
//     "host": string;
//     "port": string;
//     "database": string;
// },
//   "uploadDir": {
//   "pathAdress": string;
// },
//   "api": {
//   "endpointURLS": {
//     "dataMgr": {
//       "basePath": string;
//         "uploadData": string;
//         "deleteData": string;
//         "deleteFile": string;
//         "fetchGallery": string;
//         "setCoverPhoto": string;
//         "uploadSingle": string;
//     },
//     "myservices": {
//       "basePath": string;
//         "getAll": string;
//         "getById": string;
//         "addNew": string;
//         "update": string;
//         "remove": string;
//     },
//     "portfolio": {
//       "basePath": string;
//         "getAll": string;
//         "getById": string;
//         "addNew": string;
//         "update": string;
//         "remove": string;
//     },
//     "authentication": {
//       "basePath": string;
//     }
//   }
// }
// }

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
