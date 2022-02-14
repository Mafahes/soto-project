import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from "ng2-smart-table";
import {DatePipe} from "@angular/common";
import {ApiService} from "../../../shared/services/api.service";

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.scss']
})
export class CartsComponent implements OnInit {
  source: LocalDataSource;
  settings = {
    actions: false,
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
      }
    }
  };
  constructor(
    private datePipe: DatePipe,
    private api: ApiService
  ) {
    this.api.getOrders().subscribe((e) => {
      this.source = new LocalDataSource(e.data);
    });
  }

  ngOnInit(): void {
  }

}
