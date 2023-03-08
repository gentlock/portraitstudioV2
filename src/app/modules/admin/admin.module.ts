import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SettingsComponent } from './pages/settings/settings.component';
import { PortfolioMgrComponent } from './pages/portfolio-mgr/portfolio-mgr.component';
import { MyservicesMgrComponent } from './pages/myservices-mgr/myservices-mgr.component';
import { ShareableModule } from '../../core/shareable.module';
import { AdminBaseComponent } from './components/admin-base/admin-base.component';
import { TableBarComponent } from './components/table-bar/table-bar.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { UploadComponent } from "./components/upload/upload.component";
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { SendemailComponent } from './components/sendemail/sendemail.component';
import { MsgBoxComponent } from './components/msg-box/msg-box.component';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    SettingsComponent,
    PortfolioMgrComponent,
    MyservicesMgrComponent,
    AdminBaseComponent,
    TableBarComponent,
    UploadComponent,
    LoginPageComponent,
    SendemailComponent,
    MsgBoxComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ShareableModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSelectModule,
    MatDialogModule,
    MatPaginatorModule,
  ],
  exports: []
})
export class AdminModule {}
