import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebpageRoutingModule } from './webpage-routing.module';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { FaqComponent } from './pages/faq/faq.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { MyservicesComponent } from './pages/myservices/myservices.component';
import { ShareableModule } from '../../core/shareable.module';
import { WebpageBaseComponent } from './components/webpage-base/webpage-base.component';
import {MatTabsModule} from '@angular/material/tabs';
import { PrivGalleryComponent } from './pages/priv-gallery/priv-gallery.component';

@NgModule({
  declarations: [
    ContactComponent,
    AboutComponent,
    FaqComponent,
    PortfolioComponent,
    HomepageComponent,
    MyservicesComponent,
    WebpageBaseComponent,
    PrivGalleryComponent,
  ],
  imports: [CommonModule, WebpageRoutingModule, ShareableModule, MatTabsModule],
})
export class WebpageModule {}
