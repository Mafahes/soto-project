import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ApiService} from './shared/services/api.service';
import {Api, ApiTypes} from './shared/configuration';
import {SignalRService} from './shared/services/signal-r.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Session} from "./shared/interfaces/self";
import {RouteList} from "./app-routing.module";
import {StorageService} from "./shared/injectables/storage.service";

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
              private storage: StorageService,
              private router: Router) {}
  route = '';
  routes = RouteList.routes;
  sessions: Session[] = [];
  sessionsInitialized = false;
  get isAdmin(): any {
    return this.route.includes('admin');
  }
  initialized = false;
  getApiType(): string {
    return localStorage.getItem('apiType');
  }
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
    this.storage.isDark$.subscribe((e) => {
      console.log(e);
    });
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
}
