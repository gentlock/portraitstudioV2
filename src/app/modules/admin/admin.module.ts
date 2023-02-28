import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SettingsComponent } from './pages/settings/settings.component';
import { PortfolioMgrComponent } from './pages/portfolio-mgr/portfolio-mgr.component';
import { MyservicesMgrComponent } from './pages/myservices-mgr/myservices-mgr.component';
import { HomeComponent } from './pages/home/home.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopbarComponent } from './components/topbar/topbar.component';
import { ShareableModule } from '../../core/shareable.module';
import { AdminBaseComponent } from './components/admin-base/admin-base.component';

@NgModule({
  declarations: [
    SettingsComponent,
    PortfolioMgrComponent,
    MyservicesMgrComponent,
    HomeComponent,
    SidebarComponent,
    TopbarComponent,
    AdminBaseComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, ShareableModule],
})
export class AdminModule {}
