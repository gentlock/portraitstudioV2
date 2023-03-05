import { Injectable } from '@angular/core';
import {DbService} from "../data/db.service";
import { HttpClient } from '@angular/common/http';
import {IEmail} from "../abstracts";

@Injectable({
  providedIn: 'root'
})
export class MailService {
  utilsBase = "";
  mailerURL = "";

  constructor(
    private dbService: DbService,
    private http: HttpClient,
  ) {
    this.utilsBase = dbService.conf.api.endpointURLS.utils.basePath;
    this.mailerURL = dbService.conf.api.endpointURLS.utils.sendEmail;
  }

  sendEmail(data: IEmail) {
    return this.http.post<any>(this.utilsBase + this.mailerURL, data);
  }
}
