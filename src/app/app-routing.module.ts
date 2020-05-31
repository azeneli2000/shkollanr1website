import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeshqipComponent } from './homeshqip/homeshqip.component';
import { HomeanglishtComponent } from './homeanglisht/homeanglisht.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { ViewerComponent } from './viewer/viewer.component';
import { StafiCikliUletComponent } from './stafi-cikli-ulet/stafi-cikli-ulet.component';


const routes: Routes = [{path :'', component : HomeanglishtComponent},
                         {path : 'admin',  component : AdminComponent ,},
                         {path : 'en', component : HomeshqipComponent},
                         {path : 'login', component : LoginComponent},
                         {path : 'pdf', component : ViewerComponent},
                         {path : 'pdf/:id', component : ViewerComponent},
                         {path : 'cu', component : StafiCikliUletComponent}]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
