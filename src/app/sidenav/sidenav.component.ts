import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {AppComponent} from '../app.component';
import {Routes} from '../shared/configuration';
import {OneSignalService} from 'ngx-onesignal';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ApiService} from '../shared/services/api.service';
import {StorageService} from "../shared/injectables/storage.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  apiType = '';
  routes = Routes.routeList;
  subscribed = false;
  isDark = false;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  ngOnInit(): void {
    this.apiType = this.app.getApiType();
    this.subscribed = this.onesignal.isSubscribe;
    this.storage.isDark$.subscribe((e) => {
      this.isDark = e;
    });
    this.onesignal.isSubscribe$.subscribe((e) => {
      this.subscribed = e;
    });
  }
  onModeChange(): void {
    this.storage.setData('mode', !this.isDark);
  }
  constructor(
    public readonly onesignal: OneSignalService,
    private breakpointObserver: BreakpointObserver,
    private snackBar: MatSnackBar,
    private storage: StorageService,
    private api: ApiService,
    public app: AppComponent) {
    (window as any).ngxOnesignal = this.onesignal;
  }
  async sub(): Promise<void> {
    // await this.api.setPush(this.onesignal.userId).toPromise();
    this.snackBar.open(`Уведомления включены`, null, { duration: 2000 });
    this.onesignal.subscribe();
  }
  async unsub(): Promise<void> {
    // await this.api.setPush('').toPromise();
    this.snackBar.open(`Уведомления отключены`, null, { duration: 2000 });
    this.onesignal.unsubscribe();
  }
}
