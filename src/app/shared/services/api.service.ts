import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ToolsService} from './tools.service';
import {Api, Status} from '../configuration';
import * as _ from 'lodash';
import {Role, User} from "../interfaces/User";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient, private tool: ToolsService) { }
  logIn(data): Observable<any> {
    return this.http.post<any>(`${Api.API_LINK}Auth/Login`, data);
  }
  getAllUsers(): Observable<User[]> {
    return this.http.get<any>(`${Api.API_LINK}api/users/all`);
  }
  addUser(data): Observable<any> {
    return this.http.post<any>(`${Api.API_LINK}api/user/add`, data);
  }
  updateUser(data): Observable<any> {
    return this.http.put<any>(`${Api.API_LINK}api/users`, data);
  }
  deleteUser(id): Observable<any> {
    return this.http.delete<any>(`${Api.API_LINK}api/users?id=${id}`);
  }
  getAllRoles(): Observable<Role[]> {
    return this.http.get<any>(`${Api.API_LINK}Auth/Roles`);
  }
}
