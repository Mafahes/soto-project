import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ApiService} from "../../../../shared/services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DatePipe} from "@angular/common";
import {OrderById} from "../../../../shared/interfaces/OrderById";
@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.scss']
})
export class AddCartComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router,
    private arouter: ActivatedRoute,
    private datePipe: DatePipe
  ) { }
  form = this.fb.group({
    source: ['', Validators.required],
    secondName: ['', Validators.required],
    firstName: ['', Validators.required],
    patronymic: ['', Validators.required],
    sex: [null, Validators.required],
    age: [0, Validators.required],
    deathId: [null, Validators.required],
    address: ['', Validators.required],
    addressMorgue: '',
    secondPhoneContact: '',
    phoneContact: '',
    cause: '',
    dateDeath: '',
    addInformation: ''
  });
  validated = false;
  errors: string[];
  id = 0;
  arr = [
    {value: 1, a: 0},
    {value: 2, a: 1}
  ];
  ngOnInit(): void {
    this.arouter.paramMap.subscribe(async (e) => {
      if (!!e.get('id') && e.get('id') !== 'add') {
        // @ts-ignore
        const a: OrderById = await this.api.getOrderById(e.get('id')).toPromise().catch((ev) => {
          this.router.navigate(['/dispatcher/carts']);
        });
        this.form.patchValue({
          ...a,
          dateDeath: this.datePipe.transform(a.dateDeath, 'dd.mm.YYYY')
        });
        this.id = a.id;
        console.log(a);
      }
    });
  }
  async createOrder(): Promise<void> {
    var dateDeath = new Date(this.form.value.dateDeath);
    dateDeath.setHours(dateDeath.getHours() - 3);
    const obj = {
      ...this.form.value,
      dateDeath,
      sex: this.form.value.sex === 'true' ? true : this.form.value === 'false' ? false : null
    };
    console.log(obj);
    var resp = await this.api.validateOrder(obj).toPromise();
    this.validated = resp.state;
    this.errors = resp.errors;
    if(this.validated !== true) return;
    await this.api.createOrder(obj).toPromise();
    this.router.navigate(['/dispatcher/carts']);
  }
}
