import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {LoginComponent} from './pages/login/login.component';
import {ErrorPageComponent} from "./pages/error-page/error-page.component";

export class RouteList {
  static routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: 'error' },
    { path: 'error', component: ErrorPageComponent }
  ];
}

@NgModule({
  imports: [RouterModule.forRoot(RouteList.routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
