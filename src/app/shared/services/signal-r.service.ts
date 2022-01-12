import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import {Observable, throwError} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private hubConnection: signalR.HubConnection;
  startConnection = async () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://electronicqueue.3dcafe.ru/workspace')
      .build();
    return this.hubConnection
      .start();
  }
  dropConnection = async () => {
    if((this.hubConnection?.state || '') === 'Connected') {
      return this.hubConnection.stop();
    } else {
      return new Promise((r, j) => r(true));
    }
  }
  state = () => this.hubConnection?.state ?? null;
  invoke = async () => {
    if (await this.hubConnection.state === 'Connected') {
      return this.hubConnection.invoke('SendMessage', 'test');
    } else {
      throwError('Сокеты не подключены');
    }
  }
  invokeMethod = async (event, args) => {
    if (await this.hubConnection.state === 'Connected') {
      return this.hubConnection.invoke(event, args);
    } else {
      throwError('Сокеты не подключены');
    }
  }
  dataTransferSub(method, isTimer = true): Observable<any> {
    if(isTimer) {
      return new Observable((obs) => {
        if(method === 'Power' || method === 'Help') {

        } else {
          setInterval(() => obs.next(null), 2000);
        }
      });
    } else {
      return new Observable((obs) => {
        if (this.hubConnection.state === 'Connected') {
          this.hubConnection.on(method, (user, message) => {
            obs.next({user, message});
          });
        } else {
          obs.error('Сокеты потерпели крушение');
        }
      });
    }
  }
  // public addTransferChartDataListener = () => {
  //   this.hubConnection.on('transferchartdata', (data) => {
  //     this.data = data;
  //     console.log(data);
  //   });
  // }
}
