import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebpageRoutingModule } from './webpage-routing.module';
import { WebpageEntryPointComponent } from './components/webpage-entry-point/webpage-entry-point.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { FaqComponent } from './pages/faq/faq.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { MyservicesComponent } from './pages/myservices/myservices.component';


@NgModule({
  declarations: [
    WebpageEntryPointComponent,
    ContactComponent,
    AboutComponent,
    FaqComponent,
    PortfolioComponent,
    HomepageComponent,
    ProjectsComponent,
    MyservicesComponent
  ],
  imports: [
    CommonModule,
    WebpageRoutingModule
  ]
})
export class WebpageModule { }
