import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ApiService} from './shared/services/api.service';
import {Api, ApiTypes} from './shared/configuration';
import {SignalRService} from './shared/services/signal-r.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Session} from "./shared/interfaces/self";
import {RouteList} from "./app-routing.module";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'less-adm';
  constructor(private activeRoute: ActivatedRoute,
              private signalR: SignalRService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private api: ApiService,
              private router: Router) {}
  route = '';
  routes = RouteList.routes;
  sessions: Session[] = [];
  sessionsInitialized = false;
  get isAdmin(): any {
    return this.route.includes('admin');
  }
  get isTerminal(): any {
    return this.route.includes('monitor') || this.route.includes('terminal');
  }
  get isEmpty(): any {
    if(this.route.includes('/admin/rooms')) {
      return false;
    }
    return this.route.includes('room');
  }
  initialized = false;
  getApiType(): string {
    return localStorage.getItem('apiType');
  }
  async getSessions(): Promise<Session[]> {
    return new Promise((res, rej) => {
      this.api.getSession().subscribe((e) => {
        this.sessions = JSON.parse(JSON.stringify(e)); // remove reference
        this.sessionsInitialized = true;
        console.log(e);
        res(e);
      });
    })}
  switchApi(type: boolean): void {
    if (type) {
      localStorage.setItem('apiType', 'prod');
      Api.API_LINK = ApiTypes.PROD;
    } else {
      localStorage.setItem('apiType', 'test');
      Api.API_LINK = ApiTypes.TEST;
    }
    window.location.reload();
  }
  async ngOnInit(): Promise<void> {
    if (!this.getApiType()) {
      localStorage.setItem('apiType', 'test');
      Api.API_LINK = ApiTypes.TEST;
    } else {
      switch (this.getApiType()) {
        case 'prod': {
          Api.API_LINK = ApiTypes.PROD;
          break;
        }
        case 'test': {
          Api.API_LINK = ApiTypes.TEST;
          break;
        }
      }
    }
    this.router.events.subscribe(async (e) => {
      if (e instanceof NavigationEnd) {
        if(e.url.includes('/room/session/')) {
          this.initialized = false;
          await this.signalR.startConnection();
          this.initialized = true;
        } else {
          await this.signalR.dropConnection();
        }
        console.log(e.url);
        this.checkAuth(e.url);
        this.route = e.url;
      }
    });
    this.parseUser();
  }
  async parseUser(): Promise<void> {
    if (!!localStorage.getItem('api_token')) {
        // setInterval(async () => {
        //   if(this.signalR.state() === null || this.signalR.state() !== 'Connected') {
        //     window.location.reload();
        //   }
        // }, 2000);
        this.initialized = true;
    } else {
        this.initialized = true;
    }
  }
  exit(): void {
    localStorage.removeItem('api_token');
    this.router.navigate(['/login']);
  }
  async checkAuth(route = '/'): Promise<void> {
    if (localStorage.getItem('api_token') === null) {
      if(!route.includes('terminal') && !route.includes('monitor')) {
        this.router.navigate(['/login']);
      }
    } else {
      await this.getSessions();
      if(route === '/') {
        if(this.sessions.length > 0) {
          this.router.navigate(['room/session/' + this.sessions[0].id]);
        } else {
          this.router.navigate(['/room/list']);
        }
      }
    }
  }
}
