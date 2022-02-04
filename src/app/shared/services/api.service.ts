import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ToolsService} from './tools.service';
import {Api, Status} from '../configuration';
import * as _ from 'lodash';
import {Role, User} from '../interfaces/User';
import { Vehicle, VehicleObject } from '../interfaces/vehicle';
import { map } from 'rxjs/operators';
import { Brigade, BrigadeObject } from '../interfaces/brigade';

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
  getAllVehicle(): Observable<VehicleObject> {
    return this.http.get<any>(`${Api.API_LINK}api/Cars`);
  }
  getVehicleById(id): Observable<Vehicle> {
    return this.http.get<any>(`${Api.API_LINK}api/Cars/${id}`);
  }
  createNewVehicle(data): Observable<VehicleObject> {
    return this.http.post<any>(`${Api.API_LINK}api/Cars`, data);
  }
  updateNewVehicle(data): Observable<VehicleObject> {
    return this.http.put<any>(`${Api.API_LINK}api/Cars`, data);
  }
  deleteVehicle(id): Observable<VehicleObject> {
    return this.http.delete<any>(`${Api.API_LINK}api/Cars?id=${id}`);
  }
  createBrigade(data): Observable<any> {
    return this.http.post<any>(`${Api.API_LINK}api/Brigades`, data);
  }
  updateBrigade(data): Observable<any> {
    return this.http.put<any>(`${Api.API_LINK}api/Brigades`, data);
  }
  getBrigades(): Observable<BrigadeObject> {
    return this.http.get<any>(`${Api.API_LINK}api/Brigades`);
  }
  getBrigadesById(id): Observable<Brigade> {
    return this.http.get<any>(`${Api.API_LINK}api/Brigades/${id}`);
  }
}
