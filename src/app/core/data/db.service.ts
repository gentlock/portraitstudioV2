import { Injectable } from '@angular/core';
import {IPortfolioFeed, IMyserviceFeed} from "../abstracts";
import { HttpClient } from '@angular/common/http';
import * as configuration from '../../../conf/keys.json';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  public conf = configuration;

  constructor(
    private http: HttpClient
  ) {}

  getAll(url: string, filter?: string) {
    return this.http.get<any[]>(url+`/${filter}`);
  }
  getById(id: string, url: string) {
    return this.http.get<any>(url+`/${id}`);
  }
  recordAddNew(url: string, data:any) {
    return this.http.post<any>(url, data);
  }
  recordUpdate(id: string, url: string, data: any) {
    return this.http.put<any>(url+`/${id}`, data);
  }
  recordDel(id: string, url: string) {
    return this.http.delete<any>(url+`/${id}`);
  }

  uploadData(id: string, url: string, useSchema: string, myFiles: FormData) {
    return this.http.put<void>(url + `/${id}`+`/${useSchema}`, myFiles, {reportProgress: true, observe: 'events'});
  }

  uploadSingle(id: string, url: string, myFiles: FormData) {
    return this.http.put<void>(url+`/${id}`, myFiles, {reportProgress: true, observe: 'events'});
  }

  fetchGallery(id: string, url: string, useSchema: string) {
    return this.http.get<any>(url+`/${id}`+`/${useSchema}`);
  }

  deleteFile(id: string, url: string, photoName: string, collection: string) {
    return this.http.delete<void>(url + `/${id}/${photoName}/${collection}`);
  }

  setCoverPhoto(id: string, url: string, photoName: string, collection: string) {
    return this.http.get<void>(url + `/${id}/${photoName}/${collection}`);
  }
}
