import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebpageRoutingModule } from './webpage-routing.module';
import { WebpageEntryPointComponent } from './components/webpage-entry-point/webpage-entry-point.component';


@NgModule({
  declarations: [
    WebpageEntryPointComponent
  ],
  imports: [
    CommonModule,
    WebpageRoutingModule
  ]
})
export class WebpageModule { }
