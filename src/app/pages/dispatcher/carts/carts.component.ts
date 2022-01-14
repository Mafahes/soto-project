import { Component, OnInit } from '@angular/core';
import {LocalDataSource} from "ng2-smart-table";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.scss']
})
export class CartsComponent implements OnInit {
  source: LocalDataSource;
  obj = {
    "id": 1,
    "source": "string",
    "secondName": "string",
    "firstName": "string",
    "patronymic": "string",
    "sex": true,
    "age": 0,
    "deathId": "string",
    "address": "string",
    "phoneContact": "string",
    "secondPhoneContact": "string",
    "passport": "string",
    "passportDate": "2022-01-13T11:07:20.948Z",
    "cause": "string",
    "dateDeath": "2022-01-13T11:07:20.948Z",
    "isDelete": true
  }
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
          return 'Петров Владимир Александрович';
        },
        filter: false
      },
      source: {
        title: 'Источник',
        valuePrepareFunction: (cell, row) => {
          return 'Звонок';
        },
        filter: false
      },
      deathId: {
        title: 'Источник',
        valuePrepareFunction: (cell, row) => {
          return 'Ношин Иван Иванович';
        },
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
    private datePipe: DatePipe
  ) {
    this.source = new LocalDataSource([
      this.obj, this.obj, this.obj, this.obj, this.obj, this.obj, this.obj, this.obj, this.obj, this.obj, this.obj, this.obj, this.obj
    ]);
  }

  ngOnInit(): void {
  }

}
