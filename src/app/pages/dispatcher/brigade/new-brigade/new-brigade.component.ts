import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../shared/services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { User } from '../../../../shared/interfaces/User';
import { VehicleObject } from '../../../../shared/interfaces/vehicle';
import {MatSnackBar} from "@angular/material/snack-bar";
import {Brigades1c} from "../../../../shared/interfaces/brigades1c";

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
    private arouter: ActivatedRoute,
    private snackBar: MatSnackBar
  ) { }
  form = this.fb.group({
    id: 0,
    autoId: null
  });
  users: User[] = [];
  driversSource: User[] = [];
  medicalsSource: User[] = [];
  brigade1c: Brigades1c[] = [];
  selectedBrigade1c: Brigades1c;
  vehicle: VehicleObject;
  drivers: any[] = [];
  medicals: any[] = [];
  loaded = false;
  ngOnInit(): void {
    this.arouter.paramMap.subscribe(async (e) => {
      if (!!e.get('id') && e.get('id') !== 'new') {
        const val = await this.api.getBrigadesById(e.get('id')).toPromise();
        const val2 = await this.api.get1cBrigades().toPromise();
        this.form.patchValue({
          id: val.id,
          name: val.name,
          autoId: val.autoId,
        });
        this.drivers = val.drivers.map((e2) => e2.nummerUser);
        this.medicals = val.medicals.map((e2) => e2.nummerUser);
        this.brigade1c = val2;
        this.selectedBrigade1c = val2.find((i) => i.code === val.code);
      }
    });
    forkJoin([
      this.api.getAllUsers(),
      this.api.getAllVehicle()
    ]).subscribe((e2) => {
      this.users = e2[0].map((e) => ({...e, firstName: `${e.secondName || ''} ${e.firstName || ''} ${e.patronymic || ''} - (${e.roleName})`})).filter(e => !!e.firstName.trim());
      this.driversSource = this.users.filter((e) => e.roleName === 'Водитель');
      this.medicalsSource = this.users.filter((e) => e.roleName === 'Санитар');
      this.vehicle = e2[1];
      this.loaded = true;
    });
  }
  async checkUser(id: User): Promise<void> {
    const state: any = await this.api.checkBrigadeMember(id.nummer).toPromise();
    if (state.state === false) {
      this.snackBar.open(`Внимание: ${id.firstName || '-'} ${id.patronymic} находится в другой бригаде!`, null, { duration: 1500 });
    }
  }
  async createBrigade(): Promise<void> {
    if(this.form.get('id').value !== 0) {
      await this.api.updateBrigade({
        ...this.form.value,
        drivers: this.drivers.map((e) => ({ nummerUser: e })),
        medicals: this.medicals.map((e) => ({ nummerUser: e })),
        ...this.selectedBrigade1c
      }).toPromise();
      this.router.navigate(['/dispatcher/brigade']);
      return;
    }
    await this.api.createBrigade({
      ...this.form.value,
      drivers: this.drivers.map((e) => ({ nummerUser: e })),
      medicals: this.medicals.map((e) => ({ nummerUser: e })),
      code: this.selectedBrigade1c.uid,
      name: this.selectedBrigade1c.code
    }).toPromise();
    this.router.navigate(['/dispatcher/brigade']);
  }
}
