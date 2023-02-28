import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminModule } from './modules/admin/admin.module';
import { WebpageModule } from './modules/webpage/webpage.module';
import { DatePipe } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AdminModule,
    WebpageModule,
    HttpClientModule,
  ],
  providers: [
    DatePipe,
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: LoaderInterceptor,
    //   multi: true
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
