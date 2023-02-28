import { Injectable } from '@angular/core';
import {IAlbumsFeed, IMyserviceFeed} from "../abstracts";
import { HttpClient } from '@angular/common/http';
import * as configuration from '../../../conf/keys.json';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  public conf = configuration;
  readonly basePath = this.conf.api.endpointURLS.myservices.basePath;
  readonly myservicesUrls = this.conf.api.endpointURLS.myservices;
  readonly prortfolioUrls     = this.conf.api.endpointURLS.portfolio;

  constructor(
    private http: HttpClient
  ) {}

  portfolioGetAll() {
    return this.http.get<IAlbumsFeed[]>(this.basePath+''+this.prortfolioUrls.getAll);
  }
  portfolioGetById(id: string) {
    return this.http.get<IAlbumsFeed>(this.basePath+''+this.prortfolioUrls.getById+`/${id}`);
  }
  portfolioAddNew(data: IAlbumsFeed) {
    return this.http.post<IAlbumsFeed>(this.basePath+''+this.prortfolioUrls.addNew, data);
  }
  portfolioUpdate(id: string, data: IAlbumsFeed) {
    return this.http.put<IAlbumsFeed>(this.basePath+''+this.prortfolioUrls.update+`/${id}`, data);
  }
  portfolioDel(id: string) {
    return this.http.delete<IAlbumsFeed>(this.basePath+''+this.prortfolioUrls.remove+`/${id}`);
  }


  myservicesGetAll() {
    return this.http.get<IMyserviceFeed[]>(this.basePath+''+this.myservicesUrls.getAll);
  }
  myservicesGetById(id: string) {
    return this.http.get<IMyserviceFeed>(this.basePath+''+this.myservicesUrls.getById+`/${id}`);
  }
  myservicesAddNew(data: IMyserviceFeed) {
    return this.http.post<IMyserviceFeed>(this.basePath+''+this.myservicesUrls.addNew, data);
  }
  myservicesUpdate(id: string, data: IMyserviceFeed) {
    return this.http.put<IMyserviceFeed>(this.basePath+''+this.myservicesUrls.update+`/${id}`, data);
  }
  myservicesDel(id: string) {
    return this.http.delete<IMyserviceFeed>(this.basePath+''+this.myservicesUrls.remove+`/${id}`);
  }
}
