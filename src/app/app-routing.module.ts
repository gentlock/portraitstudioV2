import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBaseComponent } from './modules/admin/components/admin-base/admin-base.component';
import { WebpageBaseComponent } from './modules/webpage/components/webpage-base/webpage-base.component';
import {LoginPageComponent} from "./modules/admin/pages/login-page/login-page.component";
import {authGuard} from "./core/services/auth/authGuard";

const routes: Routes = [
  {
    path: 'loginPage', component: LoginPageComponent,
  },
  {
    path: 'admin', component: AdminBaseComponent,
    children: [
      {
        path: '', loadChildren: () => import('./modules/admin/admin.module').then((x) => x.AdminModule),
      },
    ],
    canMatch: [authGuard()],
  },
  {
    path: '', component: WebpageBaseComponent,
    children: [
      {
        path: '', loadChildren: () => import('./modules/webpage/webpage.module').then((x) => x.WebpageModule),
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true, anchorScrolling: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
