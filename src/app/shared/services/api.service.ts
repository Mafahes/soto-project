import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ToolsService} from './tools.service';
import {Api, Status} from '../configuration';
import {map} from 'rxjs/operators';
import {Session} from "../interfaces/self";
import {Category, File2, RoomObject} from "../interfaces/room";
import {Cat} from "../interfaces/Cat";
import {Queue} from "./queue";
import {Window} from "../interfaces/window";
import {Tickets} from "../interfaces/myTickets";
import {Reason} from "../interfaces/reason";
import {User} from "../interfaces/User";
import {AdminStat, StatObject} from "../interfaces/stats";
import {SoundObject} from "../interfaces/Sound";
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private tool: ToolsService) { }
  logIn(data): Observable<any> {
    return this.http.post<any>(`${Api.API_LINK}auth/login-email`, data);
  }
  getSession(): Observable<Session[]> {
    return this.http.get<Session[]>(`${Api.API_LINK}api/sessions`)
      .pipe(
        map(e => e.map(e2 => ({...e2, pauses: [...e2.pause], pause: e2.pause.filter(e3 => e3.dateOver === null)})))
      );
  }
  stopSession(): Observable<any> {
    return this.http.get<any>(`${Api.API_LINK}api/sessions/stop`);
  }
  getRooms(): Observable<RoomObject> {
    return this.http.get<RoomObject>(`${Api.API_LINK}api/rooms`)
  }
  getStats(): Observable<StatObject> {
    return this.http.get<StatObject>(`${Api.API_LINK}api/sessions/stats`);
  }
  getAdminStats(start, finish): Observable<AdminStat> {
    return this.http.get<AdminStat>(`${Api.API_LINK}api/stats?start=${start}&finish=${finish}`)
      .pipe(
        map(e => {
          return {
            ...e,
            stats: e.stats.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
          }
        })
      );
  }
  createRoom(data): Observable<any> {
    return this.http.post<any>(`${Api.API_LINK}api/rooms`, data);
  }
  updateRoom(data): Observable<any> {
    return this.http.put<any>(`${Api.API_LINK}api/rooms`, data);
  }
  getWindows(id): Observable<Window[]> {
    return this.http.get<Window[]>(`${Api.API_LINK}api/rooms/windows?roomId=${id}`)
      .pipe(map(e => e.map((e2) => ({...e2, checked: false})))).pipe(
        map((e) => _.uniqBy(e, 'name'))
      );
  }
  getCatByRoom(id): Observable<Cat[]> {
    return this.http.get<Cat[]>(`${Api.API_LINK}api/rooms/categories?roomId=${id}`).pipe(
      map((e) => _.uniqBy(e, 'name'))
    );
  }
  startSession(data): Observable<any> {
    return this.http.post<any>(`${Api.API_LINK}api/sessions/start`, data);
  }
  pauseSession(): Observable<any> {
    return this.http.get<any>(`${Api.API_LINK}api/sessions/pause`);
  }
  unpauseSession(): Observable<any> {
    return this.http.get<any>(`${Api.API_LINK}api/sessions/unpause`);
  }
  getTicket(id): Observable<any> {
    return this.http.get<any>(`${Api.API_LINK}api/tickets/take?ticketId=${id}`);
  }
  registerTicket(id): Observable<Category> {
    return this.http.get<Category>(`${Api.API_LINK}api/tickets/register?serviceId=${id}`);
  }
  findTicket(text): Observable<any> {
    return this.http.post<any>(`${Api.API_LINK}api/tickets/find?name=${text}`, null);
  }
  getQueue(): Observable<Queue[]> {
    return this.http.get<Queue[]>(`${Api.API_LINK}api/sessions/queue`)
    //   .pipe(
    //   map(e => e.map(e2 => ({...e2, name: `${e2?.service?.letter || '-'}${e2.id}`})))
    // );
  }
  getMonitorTickets(id): Observable<Queue[]> {
    return this.http.get<Queue[]>(`${Api.API_LINK}api/tickets/monitor`)
    //   .pipe(
    //   map(e => e.map(e2 => ({...e2, name: `${e2?.service?.letter || '-'}${e2.id}`})))
    // );
  }
  getMyTickets(): Observable<Tickets[]> {
    return this.http.get<Tickets[]>(`${Api.API_LINK}api/tickets/my`);
  }
  getReasons(): Observable<Reason[]> {
    return this.http.get<Reason[]>(`${Api.API_LINK}api/reasonover`);
  }
  delReason(id): Observable<Reason[]> {
    return this.http.delete<Reason[]>(`${Api.API_LINK}api/reasonover?id=${id}`);
  }
  getPostpones(): Observable<Reason[]> {
    return this.http.get<Reason[]>(`${Api.API_LINK}api/reasonpostpone`);
  }
  delPostpone(id): Observable<Reason[]> {
    return this.http.delete<Reason[]>(`${Api.API_LINK}api/reasonpostpone?id=${id}`);
  }
  uploadFile(data): Observable<File2[]> {
    return this.http.post<File2[]>(`${Api.API_LINK}api/appfiles`, data);
  }
  getSounds(): Observable<SoundObject[]> {
    return this.http.get<SoundObject[]>(`${Api.API_LINK}api/sounds`);
  }
  getSoundById(id): Observable<Reason[]> {
    return this.http.get<Reason[]>(`${Api.API_LINK}api/sounds`);
  }
  createSound(data) {
    return this.http.post(`${Api.API_LINK}api/sounds`, data);
  }
  createUser(data) {
    return this.http.put(`${Api.API_LINK}api/users/admin/add`, data);
  }
  deleteSound(id) {
    return this.http.delete(`${Api.API_LINK}api/sounds/${id}`);
  }
  deleteRoom(id) {
    return this.http.delete(`${Api.API_LINK}api/rooms?id=${id}`);
  }
  getReasonRedirects(): Observable<Reason[]> {
    return this.http.get<Reason[]>(`${Api.API_LINK}api/reasonredirect`);
  }
  delReasonRedirects(id): Observable<Reason[]> {
    return this.http.delete<Reason[]>(`${Api.API_LINK}api/reasonredirect?id=${id}`);
  }
  overTicket(data): Observable<any> {
    return this.http.post<any>(`${Api.API_LINK}api/tickets/over`, data);
  }
  createOverReason(data): Observable<any> {
    return this.http.post<any>(`${Api.API_LINK}api/reasonover`, data);
  }
  createPostponeReason(data): Observable<any> {
    return this.http.post<any>(`${Api.API_LINK}api/reasonpostpone`, data);
  }
  createRedirectReason(data): Observable<any> {
    return this.http.post<any>(`${Api.API_LINK}api/reasonredirect`, data);
  }
  postponeTicket(data): Observable<any> {
    return this.http.post<any>(`${Api.API_LINK}api/tickets/postpone`, data);
  }
  redirectTicket(data): Observable<any> {
    return this.http.post<any>(`${Api.API_LINK}api/tickets/redirect`, data);
  }
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${Api.API_LINK}api/users/all`);
  }
  updateUser(data): Observable<any> {
    return this.http.put<any>(`${Api.API_LINK}api/users/edit`, data);
  }
  deleteUser(id): Observable<any> {
    return this.http.delete<any>(`${Api.API_LINK}api/users?id=${id}`);
  }
  nextTicket(): Observable<any> {
    return this.http.get<any>(`${Api.API_LINK}api/tickets/next`);
  }
}
