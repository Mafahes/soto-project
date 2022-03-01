import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import { User } from '../interfaces/User';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {

  }

  private modeSelector: BehaviorSubject<any> = new BehaviorSubject(false);
  isDark$: Observable<boolean> = this.modeSelector.asObservable();
  private user: BehaviorSubject<User> = new BehaviorSubject(null);
  user$: Observable<User> = this.user.asObservable();
  // tslint:disable-next-line:typedef
  setData(type: string, newValue: any) {
    if (type === 'mode') {
     localStorage.setItem('mode', newValue);
     this.modeSelector.next(newValue);
    }
    if (type === 'user') {
      this.user.next(newValue);
    }
  }
}
