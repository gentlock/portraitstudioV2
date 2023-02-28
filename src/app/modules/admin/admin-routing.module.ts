import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyservicesMgrComponent } from './pages/myservices-mgr/myservices-mgr.component';
import { PortfolioMgrComponent } from './pages/portfolio-mgr/portfolio-mgr.component';
import { SettingsComponent } from './pages/settings/settings.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'portfolio', pathMatch: 'full',
  },
  {
    path: 'myservices', component: MyservicesMgrComponent,
  },
  {
    path: 'portfolio', component: PortfolioMgrComponent,
  },
  {
    path: 'settings', component: SettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
