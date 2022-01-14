import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {LoginComponent} from './pages/login/login.component';
import {ErrorPageComponent} from "./pages/error-page/error-page.component";
import {BrigadeComponent} from "./pages/dispatcher/brigade/brigade.component";
import {CartsComponent} from "./pages/dispatcher/carts/carts.component";
import {AddCartComponent} from "./pages/dispatcher/carts/add-cart/add-cart.component";
import {UsersComponent} from "./pages/admin/users/users.component";

export class RouteList {
  static routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dispatcher', children: [
        { path: 'brigade', pathMatch: 'full', component: BrigadeComponent },
        { path: 'carts', pathMatch: 'full', component: CartsComponent },
        { path: 'carts/add', pathMatch: 'full', component: AddCartComponent },
      ]},
    { path: 'admin', children: [
        { path: 'users', pathMatch: 'full', component: UsersComponent }
      ]},
    { path: '**', redirectTo: 'error' },
    { path: 'error', component: ErrorPageComponent },
  ];
}

@NgModule({
  imports: [RouterModule.forRoot(RouteList.routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
