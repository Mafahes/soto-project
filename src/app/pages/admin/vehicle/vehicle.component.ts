import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/interfaces/User';
import { UserPanelsComponent } from '../users/users.component';
import { ApiService } from '../../../shared/services/api.service';
import { VehicleObject } from '../../../shared/interfaces/vehicle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {

  constructor(
    private api: ApiService,
    private router: Router
  ) { }
  vehObj: VehicleObject;
  settings = {
    actions: {
      columnTitle: '',
      custom: [
        {
          name: 'edit',
          title: '<span>Просмотр</span>'
        },
        {
          name: 'del',
          title: '<span>Удалить</span>'
        }
      ],
      add: false,
      edit: false,
      delete: false
    },
    columns: {
      name: {
        title: 'Наименование',
        filter: false
      },
      typeCarName: {
        title: 'Тип автомобиля',
        filter: false
      },
      modelCarName: {
        title: 'Модель автомобиля',
        filter: false
      },
    }
  };
  async ngOnInit(): Promise<void> {
    this.vehObj = await this.api.getAllVehicle().toPromise();
  }
  async onEvent(e): Promise<void> {
    switch (e.action) {
      case 'edit': {
        this.router.navigate(['/admin/vehicle/' + e.data.id]);
        break;
      }
      case 'del': {
        await this.api.deleteVehicle(e.data.id).toPromise();
        this.vehObj = await this.api.getAllVehicle().toPromise();
        break;
      }
    }
  }

}
