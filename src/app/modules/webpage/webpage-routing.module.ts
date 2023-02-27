import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./pages/homepage/homepage.component";
import {MyservicesComponent} from "./pages/myservices/myservices.component";
import {AboutComponent} from "./pages/about/about.component";
import {FaqComponent} from "./pages/faq/faq.component";
import {PortfolioComponent} from "./pages/portfolio/portfolio.component";
import {ContactComponent} from "./pages/contact/contact.component";

const routes: Routes = [
  {
    path: '',redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home', component: HomepageComponent
  },
  {
    path: 'myservices', component: MyservicesComponent
  },
  {
    path: 'about', component: AboutComponent
  },
  {
    path: 'faq', component: FaqComponent
  },
  {
    path: 'portfolio', component: PortfolioComponent
  },
  {
    path: 'contact', component: ContactComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebpageRoutingModule { }
