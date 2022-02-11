import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../shared/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-vehicle',
  templateUrl: './new-vehicle.component.html',
  styleUrls: ['./new-vehicle.component.scss']
})
export class NewVehicleComponent implements OnInit {

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private arouter: ActivatedRoute
  ) { }
  form = this.fb.group({
    id: 0,
    uid: '',
    name: ['', Validators.required],
    code: ['', Validators.required],
    modelCarName: ['', Validators.required],
    modelCarCode: ['', Validators.required],
    typeCarName: ['', Validators.required],
    typeCarDescription: ['', Validators.required],
    numberPlaces: null
  });
  ngOnInit(): void {
    this.arouter.paramMap.subscribe(async (e) => {
      if (!!e.get('id') && e.get('id') !== 'new') {
        const val = await this.api.getVehicleById(e.get('id')).toPromise();
        this.form.patchValue({
          id: parseInt(e.get('id'), 10),
          ...val
        });
      }
    });
  }
  createVehicle(): void {
    if (this.form.get('id').value !== 0) {
      this.api.updateNewVehicle(this.form.value).subscribe((e) => {
        this.router.navigate(['/admin/vehicle']);
      });
      return;
    }
    this.api.createNewVehicle(this.form.value).subscribe((e) => {
      this.router.navigate(['/admin/vehicle']);
    });
  }
}
