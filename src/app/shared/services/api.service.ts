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
    return this.http.post<any>(`${Api.API_LINK}Auth/Login`, data);
  }
}
