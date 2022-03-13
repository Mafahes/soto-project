import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../../../shared/services/api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderById} from '../../../../shared/interfaces/OrderById';
import { Brigade, BrigadeObject } from '../../../../shared/interfaces/brigade';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Status } from '../../../../shared/configuration';

@Component({
  selector: 'app-view-cart',
  templateUrl: './view-cart.component.html',
  styleUrls: ['./view-cart.component.scss']
})
export class ViewCartComponent implements OnInit {

  constructor(
    private api: ApiService,
    private router: Router,
    private arouter: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }
  order: OrderById = null;
  sanitarField = '';
  driverField = '';
  carPlade = '';
  orderStatuses = Status.orderStatus.map((e, i) => ({i: i, v: e}));
  brigades: Brigade[] = [];
  selectedBrigade;
  calc = 'Загрузка времени прибытия...';
  onBrigadeChange(e: Brigade): void {
    this.sanitarField = e.medicals.map((m) => `${m.user.secondName} ${m.user.firstName} ${m.user.patronymic}`).join(', ');
    this.driverField = e.drivers.map((m) => `${m.user.secondName} ${m.user.firstName} ${m.user.patronymic}`).join(', ');
    this.carPlade = e.car.name;
  }
  ngOnInit(): void {
    this.arouter.paramMap.subscribe(async (e) => {
      if (!!e.get('id')) {
        this.order = await this.api.getOrderById(e.get('id')).toPromise();
        this.calc = this.order.brigadeId === null || !this.order ? 'Бригада не назначена' : (await this.api.calcBrigades(this.order.brigadeId, this.order.id).toPromise()).text;
        if (!this.order) {
          this.router.navigate(['/dispatcher/carts']);
        } else {
          try {
            this.sanitarField = this.order.brigade.medicals.map((m) => `${m.user.secondName} ${m.user.firstName} ${m.user.patronymic}`).join(', ');
            this.driverField = this.order.brigade.drivers.map((m) => `${m.user.secondName} ${m.user.firstName} ${m.user.patronymic}`).join(', ');
            this.carPlade = this.order.brigade.car.name;
          } catch (e) {
          }
          const src = await this.api.getBrigades(100).toPromise();
          this.selectedBrigade = this.order?.brigade?.id;
          this.brigades = src.data.map((i) => ({...i, name: `№: ${i.id}, Номер авто: ${i.car.modelCarCode} (${i.car.name})`}));
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
