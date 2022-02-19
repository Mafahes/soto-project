import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {

  }

  private modeSelector: BehaviorSubject<any> = new BehaviorSubject(false);
  isDark$: Observable<boolean> = this.modeSelector.asObservable();

  // tslint:disable-next-line:typedef
  setData(type: string, newValue: any) {
    if (type === 'mode') {
     localStorage.setItem('mode', newValue);
     this.modeSelector.next(newValue);
    }
  }
}
