import { Injectable } from '@angular/core';
import {DbService} from "../data/db.service";
import {HttpClient} from "@angular/common/http";
import {IAuth, IAuthResp} from "../abstracts";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  readonly authURL;
  constructor(
    private http: HttpClient,
    public dbService: DbService,
  ) {
    this.authURL = dbService.conf.api.endpointURLS.auth;
  }
  attachToken(token: string) {
    localStorage.setItem('token', token);
  }

  verifyCred(data: IAuth) {
    let url = this.authURL.basePath + this.authURL.verifyCred;

    return this.http.post<IAuthResp>(url, data);
  }

  verifyToken(token: string) {
    let url = this.authURL.basePath + this.authURL.verifyToken;

    return this.http.post<IAuthResp>(url, token);
  }
}
