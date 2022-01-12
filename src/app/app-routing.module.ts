import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './pages/dashboard/dashboard.component';
import {LoginComponent} from './pages/login/login.component';
import {TicketListComponent} from "./pages/ticket-list/ticket-list.component";
import {SafetyBordComponent} from "./pages/safety-bord/safety-bord.component";
import {TerminalCatListComponent} from './pages/terminal/terminal-cat-list/terminal-cat-list.component';
import {ErrorPageComponent} from "./pages/error-page/error-page.component";

export class RouteList {
  static routes: Routes = [
    { path: '', component: DashboardComponent },
    { path: 'login', component: LoginComponent },
    { path: 'monitor/:id/list', component: TicketListComponent },
    { path: 'monitor/safety', component: SafetyBordComponent },
    { path: 'terminal', component: TerminalCatListComponent },
    { path: 'terminal/cats/', component: TerminalCatListComponent },
    { path: 'terminal/cats/:id', component: TerminalCatListComponent },
    { path: '**', redirectTo: 'error' },
    { path: 'error', component: ErrorPageComponent }
  ];
}

@NgModule({
  imports: [RouterModule.forRoot(RouteList.routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
