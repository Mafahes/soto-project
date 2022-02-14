import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { Brigade } from '../../../shared/interfaces/brigade';
import {MapComponent} from "ngx-mapbox-gl";
import {forkJoin} from "rxjs";
import {CoordObject} from "../../../shared/interfaces/coords";

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
  coord: CoordObject[] = [];
  interval;
  onMapLoad(map): void {
    this.map = map;
  }
  async ngOnInit(): Promise<void> {
    // this.interval = setInterval(async () => {
    //   this.coord = await this.api.getCoords().toPromise();
    // }, 100000);
    this.coord = await this.api.getCoords().toPromise();
    this.api.getBrigades().subscribe((e) => {
      this.brigade = e.data;
    });
  }
}
