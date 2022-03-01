import {Component, OnDestroy, OnInit} from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { Brigade } from '../../../shared/interfaces/brigade';
import {CoordObject} from '../../../shared/interfaces/coords';
import {Status} from "../../../shared/configuration";

@Component({
  selector: 'app-brigade',
  templateUrl: './brigade.component.html',
  styleUrls: ['./brigade.component.scss']
})
export class BrigadeComponent implements OnInit, OnDestroy {
  constructor(
    private api: ApiService
  ) { }
  brigade: Brigade[] = [];
  map: any;
  coord: CoordObject[] = [];
  interval;
  bearing = 0;
  statuses = Status.brigadeStatus;
  currentFilter = null;
  expanded = false;
  onMapLoad(map): void {
    this.map = map;
  }
  expand(): void {
    this.expanded = !this.expanded;
    setTimeout(() => this.map.resize(), 200);
  }
  onMapChange(e): void {
    this.bearing = this.map.getBearing();
  }
  async onFilterChange(i): Promise<void> {
    this.currentFilter = i.value;
    const src = await this.api.getCoords().toPromise();
    this.coord = i.value === null ? src : i.value === 0 ? src.filter((e) => e.freeSpace > 0 || e.brigade.state === i.value) : src.filter((e) => e.brigade.state === i.value);
  }
  async ngOnInit(): Promise<void> {
    this.interval = setInterval(async () => {
      const src = await this.api.getCoords().toPromise();
      this.coord = this.currentFilter === null ? src : this.currentFilter === 0 ? src.filter((e) => e.freeSpace > 0 || e.brigade.state === this.currentFilter) : src.filter((e) => e.brigade.state === this.currentFilter);
    }, 3000);
    const src = await this.api.getCoords().toPromise();
    this.coord = this.currentFilter === null ? src : src.filter((e) => e.brigade.state === this.currentFilter);
    this.api.getBrigades().subscribe((e) => {
      this.brigade = e.data;
    });
  }
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
