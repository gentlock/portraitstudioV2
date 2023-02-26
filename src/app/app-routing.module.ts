import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminEntryPointComponent} from "./modules/admin/components/admin-entry-point/admin-entry-point.component";
import {
  WebpageEntryPointComponent
} from "./modules/webpage/components/webpage-entry-point/webpage-entry-point.component";

const routes: Routes = [
  {
    path: 'admin', component: AdminEntryPointComponent,
    children: [
      {
        path: '', loadChildren: ()=>import('./modules/admin/admin.module').then(x=>x.AdminModule)
      }
    ]
  },
  {
   path: '', component: WebpageEntryPointComponent,
    children: [
      {
        loadChildren: ()=>import('./modules/webpage/webpage.module').then(x=>x.WebpageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
