import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../shared/services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { User } from '../../../../shared/interfaces/User';
import { VehicleObject } from '../../../../shared/interfaces/vehicle';

@Component({
  selector: 'app-new-brigade',
  templateUrl: './new-brigade.component.html',
  styleUrls: ['./new-brigade.component.scss']
})
export class NewBrigadeComponent implements OnInit {

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private arouter: ActivatedRoute
  ) { }
  form = this.fb.group({
    name: ['', Validators.required],
    autoId: 0,
  });
  users: User[] = [];
  vehicle: VehicleObject;
  ngOnInit(): void {
    forkJoin([
      this.api.getAllUsers(),
      this.api.getAllVehicle()
    ]).subscribe((e) => {
      this.users = e[0];
      this.vehicle = e[1];
    });
  }

}
