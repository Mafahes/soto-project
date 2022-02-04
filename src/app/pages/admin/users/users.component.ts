import {Component, Inject, Input, OnInit} from '@angular/core';
import {LocalDataSource, ViewCell} from "ng2-smart-table";
import {DatePipe} from "@angular/common";
import {ApiService} from "../../../shared/services/api.service";
import {Role, User} from "../../../shared/interfaces/User";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(
    private datePipe: DatePipe,
    private api: ApiService,
    private dialog: MatDialog
  ) { }
  source: LocalDataSource;
  settings = {
    actions: false,
    columns: {
      dateDeath: {
        title: 'ФИО',
        valuePrepareFunction: (cell, row) => {
          return `${row.secondName || ''} ${row.firstName || ''} ${row.patronymic || ''}`;
        },
        filter: false
      },
      role: {
        title: 'Роль',
        valuePrepareFunction: (cell, row: User) => {
          return row?.role?.normalizedName || '-';
        },
        filter: false,
      },
      panels: {
        title: '',
        filter: false,
        renderComponent: UserPanelsComponent,
        type: 'custom'
      }
    }
  };
  ngOnInit(): void {
    this.parseData();
  }
  async parseData(): Promise<void> {
    this.api.getAllUsers().subscribe((e) => {
      this.source = new LocalDataSource(e)
    })
  }
  triggerDialog(type, data = null): void {
    const dialogRef = this.dialog.open(UserDialogManageComponent, {
      data: {
        type: type,
        data: data
      }
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if(!result) return;
      var obj
      if(type === 'add') {
        obj = {
          email: result.email,
          inits: `${result.secondName} ${result.firstName} ${result.patronymic}`,
          password: result.password,
          role: result.role
        }
        await this.api.addUser(obj).toPromise();
        this.api.getAllUsers().subscribe((e) => {
          this.source = new LocalDataSource(e)
        })
      }
      if(type === 'edit') {
        obj = {
          ...data,
          ...result,
          role: null,
          roleId: result.role
        }
        delete obj.role;
        await this.api.updateUser(obj).toPromise();
        this.api.getAllUsers().subscribe((e) => {
          this.source = new LocalDataSource(e)
        })
      }
      console.log(obj);
    });
  }

}
@Component({
  selector: 'app-user-panels',
  styleUrls: ['./users.component.scss'],
  template: `<div class="d-flex flex-row justify-content-end" style="gap: 20px">
    <svg-icon src="assets/icons/edit.svg" (click)="onEdit()" [svgStyle]="{ 'width.px':28 }"></svg-icon>
    <svg-icon src="assets/icons/delete.svg" (click)="onDelete()" [svgStyle]="{ 'width.px':28 }"></svg-icon>
  </div>`
})
export class UserPanelsComponent implements OnInit, ViewCell {
  constructor(
    private api: ApiService,
    private usrComp: UsersComponent
  ) {
  }

  @Input() value; // data from table
  @Input() rowData: User;

  ngOnInit(): void {
    console.log(this.usrComp.settings);
  }
  onEdit(): void {
    this.usrComp.triggerDialog('edit', this.rowData);
  }
  async onDelete(): Promise<void> {
    await this.api.deleteUser(this.rowData.nummer).toPromise();
    this.usrComp.parseData();
  }
}
@Component({
  selector: 'app-user-panels',
  styleUrls: ['./users.component.scss'],
  template: `<div class="dialog-container d-flex flex-column" style="gap: 20px">
    <div class="d-flex flex-row align-items-center justify-content-between">
      <span class="title">Добавить нового пользователя</span>
      <button [mat-dialog-close]="null" class="close-button">
        <svg-icon src="assets/icons/close.svg" [svgStyle]="{ 'width.px':12, 'height.px':12 }"></svg-icon>
      </button>
    </div>
    <div class="line w-100"></div>
    <form *ngIf="data.type === 'add'" [formGroup]="form">
      <div class="container-fluid">
        <div class="row mb-3">
          <div class="col-6">
            <div class="input-form-group">
              <span>Фамилия</span>
              <input formControlName="secondName"/>
            </div>
          </div>
          <div class="col-6">
            <div class="input-form-group">
              <span>E-Mail</span>
              <input formControlName="email"/>
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-6">
            <div class="input-form-group">
              <span>Имя</span>
              <input formControlName="firstName"/>
            </div>
          </div>
          <div class="col-6">
            <div class="input-form-group">
              <span>Пароль</span>
              <input type="password" formControlName="password"/>
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-6">
            <div class="input-form-group">
              <span>Отчетство (при наличии)</span>
              <input formControlName="patronymic"/>
            </div>
          </div>
          <div class="col-6">
            <div class="input-form-group">
              <span>Повторите пароль</span>
              <input type="password" formControlName="secPass"/>
            </div>
          </div>
        </div>
        <div class="row mb-5">
          <div class="col-6">
            <div class="input-form-group">
              <span>Роль</span>
              <ng-select [items]="roles" formControlName="role" bindLabel="normalizedName" bindValue="id" ></ng-select>
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-9">
          </div>
          <div class="col-3">
            <button class="add-button" [disabled]="!form.valid" [mat-dialog-close]="form.value">Добавить</button>
          </div>
        </div>
      </div>
    </form>
    <form *ngIf="data.type === 'edit'" [formGroup]="editForm">
      <div class="container-fluid">
        <div class="row mb-3">
          <div class="col-8">
            <div class="input-form-group">
              <span>Фамилия</span>
              <input formControlName="secondName"/>
            </div>
          </div>
          <div class="col-8 mt-3">
            <div class="input-form-group">
              <span>Имя</span>
              <input formControlName="firstName"/>
            </div>
          </div>
          <div class="col-8 mt-3">
            <div class="input-form-group">
              <span>Отчество</span>
              <input formControlName="patronymic"/>
            </div>
          </div>
          <div class="col-8 mt-3">
            <div class="input-form-group">
              <span>Роль</span>
              <ng-select [items]="roles" formControlName="role" bindLabel="normalizedName" bindValue="id" ></ng-select>
            </div>
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-9">
          </div>
          <div class="col-3">
            <button class="add-button" [disabled]="!editForm.valid" [mat-dialog-close]="editForm.value">Сохранить</button>
          </div>
        </div>
      </div>
    </form>
  </div>`
})
export class UserDialogManageComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: ApiService,
    private fb: FormBuilder
  ) {
  }
  editForm = this.fb.group({
    firstName: ['', Validators.required],
    secondName: ['', Validators.required],
    patronymic: '',
    role: [null, Validators.required]
  })
  form = this.fb.group({
    email: ['', Validators.required],
    firstName: ['', Validators.required],
    secondName: ['', Validators.required],
    patronymic: '',
    password: ['', Validators.required],
    secPass: ['', Validators.required],
    role: [null, Validators.required]
  })
  @Input() value; // data from table
  @Input() rowData;
  roles: Role[] = [];

  async ngOnInit(): Promise<void> {
    this.roles = await this.api.getAllRoles().toPromise();
    if(this.data.type === 'edit') {
      this.editForm.patchValue({
        ...this.data.data,
        role: this.data.data.roleId
      })
    }
  }
}
