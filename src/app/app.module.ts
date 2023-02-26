import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminEntryPointComponent} from "./modules/admin/components/admin-entry-point/admin-entry-point.component";
import { WebpageEntryPointComponent } from "./modules/webpage/components/webpage-entry-point/webpage-entry-point.component";

@NgModule({
  declarations: [
    AppComponent,
    AdminEntryPointComponent,
    WebpageEntryPointComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
