import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { LogsManagmentComponent } from './components/logs-managment/logs-managment.component';
import { MailingManagementComponent } from './components/mailing-management/mailing-management.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { ServiceDiscoveryComponent } from './components/service_discovery/service-discovery/service-discovery.component';
import { UserManagmentComponent } from './components/user-management/user-managment.component';

const routes: Routes = [
  {path:'',redirectTo:'/login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'home',component:DashboardComponent},
  {path:'service-discovery',component:ServiceDiscoveryComponent},
  {path:'users',component:UserManagmentComponent},
  {path:'mailing',component:MailingManagementComponent},
  {path:'logs',component:LogsManagmentComponent},
  {path:'**',component:PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
