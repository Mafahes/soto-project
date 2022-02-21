import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../../../shared/services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderById} from "../../../../shared/interfaces/OrderById";

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
        }
      }
    });
  }
  async onDelete(): Promise<void> {
    await this.api.deleteOrder(this.order.id).toPromise();
    this.router.navigate(['/dispatcher/carts']);
  }
}
