import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { Brigade } from '../../../shared/interfaces/brigade';
import {MapComponent} from "ngx-mapbox-gl";

@Component({
  selector: 'app-brigade',
  templateUrl: './brigade.component.html',
  styleUrls: ['./brigade.component.scss']
})
export class BrigadeComponent implements OnInit {

  constructor(
    private api: ApiService
  ) { }
  brigade: Brigade[] = [];
  map: MapComponent;
  onMapLoad(map): void {
    this.map = map;
  }
  ngOnInit(): void {
    this.api.getBrigades().subscribe((e) => {
      this.brigade = e.data;
    });
  }

}
