import {Component, Input, OnInit} from '@angular/core';
import {LocalDataSource, ViewCell} from "ng2-smart-table";
import {DatePipe} from "@angular/common";
import {ApiService} from "../../../shared/services/api.service";
import {UserPanelsComponent, UsersComponent} from "../../admin/users/users.component";
import {User} from "../../../shared/interfaces/User";
import {Cart} from "../../../shared/interfaces/cart";

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.scss']
})
export class CartsComponent implements OnInit {
  source: LocalDataSource;
  settings = {
    actions: false,
    pager: {
      display: true,
      perPage: 10
    },
    columns: {
      id: {
        title: '№',
        filter: false
      },
      dateDeath: {
        title: 'Дата и время',
        valuePrepareFunction: (cell, row) => {
          return this.datePipe.transform(cell, 'dd.MM.yyyy HH:mm');
        },
        filter: false
      },
      username: {
        title: 'Диспетчер',
        valuePrepareFunction: (cell, row) => {
          return '-';
        },
        filter: false
      },
      source: {
        title: 'Источник',
        filter: false
      },
      deathId: {
        title: 'Источник',
        filter: false
      },
      sex: {
        title: 'Пол',
        valuePrepareFunction: (cell, row) => {
          return cell ? 'муж.' : 'жен.';
        },
        filter: false
      },
      age: {
        title: 'Возраст',
        filter: false
      },
      panels: {
        title: '',
        filter: false,
        renderComponent: CartPanelsComponent,
        valuePrepareFunction: (row, cell) => {
          return {
            isCart: true,
            path: '/dispatcher/carts/' + row.id,
            data: row
          };
        },
        type: 'custom'
      }
    }
  };
  pages = [];
  currentPage = 1;
  constructor(
    private datePipe: DatePipe,
    private api: ApiService
  ) {
    this.api.getOrders().subscribe((e) => {
      this.pages = [];
      for(var i = 0; i < e.totalPages; i++) {
        this.pages.push(i + 1);
      }
      console.log(this.pages);
      console.log(Array.from(String(e.pageSize), Number));
      this.source = new LocalDataSource(e.data);
    });
  }
  async onPageChange(e): Promise<void> {
    const ord = await this.api.getOrders(e).toPromise();
    this.currentPage = e;
    this.source = new LocalDataSource(ord.data);
  }
  ngOnInit(): void {
  }

}
@Component({
  selector: 'app-cart-panels',
  styleUrls: ['./carts.component.scss'],
  template: `<div class="d-flex flex-row justify-content-end" style="gap: 20px">
    <svg-icon [routerLink]="'/dispatcher/carts/view/' + rowData.id" src="assets/icons/edit.svg" (click)="onEdit()" [svgStyle]="{ 'width.px':28 }"></svg-icon>
  </div>`
})
export class CartPanelsComponent implements OnInit, ViewCell {
  constructor(
    private api: ApiService
  ) {
  }

  @Input() value; // data from table
  @Input() rowData: Cart;

  ngOnInit(): void {
    console.log(this.value);
  }
  onEdit(): void {
  }
}
