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
import {CartObject} from "../interfaces/cart";
import {CoordObject} from "../interfaces/coords";
import {OrderById} from "../interfaces/OrderById";
import {Brigades1c} from "../interfaces/brigades1c";
import { Calc } from '../interfaces/calc';

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
  getSelf(): Observable<User> {
    return this.http.get<any>(`${Api.API_LINK}api/user/0`);
  }
  addUser(data): Observable<any> {
    return this.http.post<any>(`${Api.API_LINK}api/user/add`, data);
  }
  getOrders(page = 1, field: string = null, type = null): Observable<CartObject> {
    return this.http.get<CartObject>(`${Api.API_LINK}api/Orders?pageNumber=${page}${field !== null ? `&OrderByField=${field.charAt(0).toUpperCase() + field.slice(1)}` : ``}${type !== null ? `&Desc=${type === 'desc'}` : ``}`).pipe(
      map((e) => ({...e, data: e.data.map((e2) => ({...e2, dateAdd: new Date(e2.dateAdd).toISOString()}))}))
    );
  }
  get1cBrigades(): Observable<Brigades1c[]> {
    return this.http.get<Brigades1c[]>(`${Api.API_LINK}api/Brigades/1c`);
  }
  deleteOrder(id): Observable<any> {
    return this.http.delete<any>(`${Api.API_LINK}api/Orders?id=${id}`);
  }
  editOrder(data): Observable<any> {
    return this.http.put<any>(`${Api.API_LINK}api/Orders`, data);
  }
  getOrderById(id): Observable<OrderById> {
    return this.http.get<OrderById>(`${Api.API_LINK}api/Orders/${id}`).pipe(
      map((e) => {
       try {
         var obj = {
           ...e,
           history: e.history.filter((e2) => !!e2.orderInHistory).map((e2, i) => {
             return {
               ...e2,
               diff: Object.keys((i > 0 ? e.history.filter((e2) => !!e2.orderInHistory)[i - 1].orderInHistory : e)).reduce((diff, key) => {
                 if((i > 0 ? e.history.filter((e2) => !!e2.orderInHistory)[i - 1].orderInHistory : e)[key] === e2.orderInHistory[key]) return diff;
                 return {
                   ...diff,
                   [key]: e2.orderInHistory[key]
                 };
               }, {})
             };
           })
         };
         return obj;
       } catch (e) {
         console.log(e);
         return null;
       }
      })
    );
  }
  createOrder(data): Observable<any> {
    return this.http.post<any>(`${Api.API_LINK}api/Orders`, data);
  }
  validateOrder(data): Observable<any> {
    return this.http.post<any>(`${Api.API_LINK}api/Orders/validate`, data);
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
  checkBrigadeMember(id): Observable<BrigadeObject> {
    return this.http.get<any>(`${Api.API_LINK}api/Brigades/check-user/${id}`);
  }
  getBrigades(): Observable<BrigadeObject> {
    return this.http.get<any>(`${Api.API_LINK}api/Brigades`);
  }
  calcBrigades(brigadeId, orderId): Observable<Calc> {
    return this.http.get<any>(`${Api.API_LINK}api/Positions/calc?brigadeId=${brigadeId}&orderId=${orderId}`);
  }
  getCoords(): Observable<CoordObject[]> {
    return this.http.get<CoordObject[]>(`${Api.API_LINK}api/Positions`);
      // .pipe(
      // map((e) => e.map((e2) => ({...e2, brigade: {...e2.brigade, freeSpaces: }})))
    // );
  }
  getBrigadesById(id): Observable<Brigade> {
    return this.http.get<any>(`${Api.API_LINK}api/Brigades/${id}`);
  }
}
