import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { AdminComponent } from './components/admin/admin.component';
import { authGuard } from './guard/auth.guard';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'user', loadComponent: () => import("../app/components/user/user.component").then((m) => m.UserComponent), canActivate: [authGuard]
  },
  {
    path: 'admin', loadComponent: () => import("../app/components/admin/admin.component").then((m) => m.AdminComponent), canActivate: [authGuard]
  },
  {
    path: 'not-authorized', loadComponent: () => import("../app/components/not-authorized/not-authorized.component").then((m) => m.NotAuthorizedComponent), canActivate: [authGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
