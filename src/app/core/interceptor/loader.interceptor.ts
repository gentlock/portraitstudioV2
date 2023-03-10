import { Injectable } from '@angular/core';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {delay, Observable} from 'rxjs';
import { finalize } from 'rxjs/operators';
import {LoaderService} from "../services/loader/loader.service";

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  constructor(private loaderService: LoaderService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.show();

    return next.handle(request).pipe(
      delay(1000),
      finalize(()=>{this.loaderService.hide();})
    );
  }
}
