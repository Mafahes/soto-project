import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../../shared/services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderById} from "../../../../shared/interfaces/OrderById";
import { Brigade, BrigadeObject } from '../../../../shared/interfaces/brigade';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss']
})
export class ViewCartComponent implements OnInit {

  constructor(
    private api: ApiService,
    private router: Router,
    private arouter: ActivatedRoute
  ) { }
  order: OrderById = null;
  sanitarField = '';
  driverField = '';
  brigades: Brigade[] = [];
  selectedBrigade;
  ngOnInit(): void {
    this.arouter.paramMap.subscribe(async (e) => {
      if (!!e.get('id')) {
        this.order = await this.api.getOrderById(e.get('id')).toPromise();
        console.log(this.order);
        if (!this.order) {
          this.router.navigate(['/dispatcher/carts']);
        } else {
          this.sanitarField = this.order.brigade.medicals.map((m) => `${m.user.secondName} ${m.user.firstName} ${m.user.patronymic}`).join(', ');
          this.driverField = this.order.brigade.drivers.map((m) => `${m.user.secondName} ${m.user.firstName} ${m.user.patronymic}`).join(', ');
          const src = await this.api.getBrigades().toPromise();
          this.selectedBrigade = this.order.brigade.id;
          this.brigades = src.data.map((i) => ({...i, name: `ID: ${i.id}, Номер авто: ${i.car.modelCarCode}`}));
        }
      }
    });
  }
  async onDelete(): Promise<void> {
    await this.api.deleteOrder(this.order.id).toPromise();
    this.router.navigate(['/dispatcher/carts']);
  }
  async onSave(): Promise<void> {
    await this.api.editOrder({...this.order, history: [], user: null, brigade: null, brigadeId: this.selectedBrigade}).toPromise();
    this.router.navigate(['/dispatcher/carts']);
  }
}
