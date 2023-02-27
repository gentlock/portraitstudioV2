import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminBaseComponent} from "./modules/admin/components/admin-base/admin-base.component";
import { WebpageBaseComponent} from "./modules/webpage/components/webpage-base/webpage-base.component";

const routes: Routes = [
  {
    path: 'admin', component: AdminBaseComponent,
    children: [
      {
        path: '', loadChildren: ()=>import('./modules/admin/admin.module').then(x=>x.AdminModule)
      }
    ]
  },
  {
   path: '', component: WebpageBaseComponent,
    children: [
      {
        path: '', loadChildren: ()=>import('./modules/webpage/webpage.module').then(x=>x.WebpageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true, anchorScrolling: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
