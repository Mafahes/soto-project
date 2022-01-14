import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.scss']
})
export class AddCartComponent implements OnInit {

  constructor(
    private fb: FormBuilder
  ) { }
  form = this.fb.group({
    source: ['', Validators.required],
    secondName: ['', Validators.required],
    firstName: ['', Validators.required],
    patronymic: ['', Validators.required],
    sex: [true, Validators.required],
    age: [0, Validators.required],
    deathId: [0, Validators.required],
    address: ['', Validators.required],
    phoneContact: "",
    secondPhoneContact: "",
    passport: "",
    passportDate: "",
    cause: "",
    dateDeath: "",
  });
  arr = [
    {value: 1, a: 0},
    {value: 2, a: 1}
  ]
  ngOnInit(): void {
  }

}
