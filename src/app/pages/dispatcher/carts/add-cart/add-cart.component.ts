import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ApiService} from "../../../../shared/services/api.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.scss']
})
export class AddCartComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
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
    dateDeath: ''
  });
  validated = false;
  errors: string[];
  arr = [
    {value: 1, a: 0},
    {value: 2, a: 1}
  ];
  ngOnInit(): void {
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
