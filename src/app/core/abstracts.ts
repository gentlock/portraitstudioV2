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

export interface IAlbumsFeed {
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
