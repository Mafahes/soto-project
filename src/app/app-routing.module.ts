import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {LoginComponent} from './pages/login/login.component';
import {ErrorPageComponent} from "./pages/error-page/error-page.component";
import {BrigadeComponent} from "./pages/dispatcher/brigade/brigade.component";
import {CartsComponent} from "./pages/dispatcher/carts/carts.component";
import {AddCartComponent} from "./pages/dispatcher/carts/add-cart/add-cart.component";
import {UsersComponent} from "./pages/admin/users/users.component";
import { VehicleComponent } from './pages/admin/vehicle/vehicle.component';
import { NewVehicleComponent } from './pages/admin/vehicle/new-vehicle/new-vehicle.component';
import { NewBrigadeComponent } from './pages/dispatcher/brigade/new-brigade/new-brigade.component';

export class RouteList {
  static routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin', children: [
        { path: 'vehicle', pathMatch: 'full', component: VehicleComponent },
        { path: 'vehicle/create', pathMatch: 'full', component: NewVehicleComponent },
        { path: 'vehicle/:id', pathMatch: 'full', component: NewVehicleComponent },
      ]},
    { path: 'dispatcher', children: [
        { path: 'brigade', pathMatch: 'full', component: BrigadeComponent },
        { path: 'brigade/new', pathMatch: 'full', component: NewBrigadeComponent },
        { path: 'brigade/:id', pathMatch: 'full', component: NewBrigadeComponent },
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
