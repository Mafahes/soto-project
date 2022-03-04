import {Component, OnDestroy, OnInit} from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { Brigade } from '../../../shared/interfaces/brigade';
import {CoordObject} from '../../../shared/interfaces/coords';
import {Status} from "../../../shared/configuration";
import { StorageService } from '../../../shared/injectables/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brigade',
  templateUrl: './brigade.component.html',
  styleUrls: ['./brigade.component.scss']
})
export class BrigadeComponent implements OnInit, OnDestroy {
  constructor(
    private api: ApiService,
    private storage: StorageService,
    private router: Router
  ) { }
  brigade: Brigade[] = [];
  map: any;
  coord: CoordObject[] = [];
  interval;
  bearing = 0;
  statuses = Status.brigadeStatus.filter((e) => e.value !== 0 && e.value !== 3);
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
    console.log(i.value);
    this.coord =
      i.value === null
        ? src
        : i.value === 2
        ? src.filter((e) => e.brigade.state === 3 || e.brigade.state === 2) // Не на смене
        : i.value === 'custom_1'
        ? src.filter((e) => e.freeSpace > 0 && e.brigade.state === 1) // Свободные бригады
        : src.filter((e) => e.brigade.state === i.value);
  }
  async ngOnInit(): Promise<void> {
    this.storage.user$.subscribe((e) => {
      if (e.roleName === 'Менеджер') {
        this.router.navigate(['/dispatcher/carts']);
      }
    });
    this.interval = setInterval(async () => {
      const src = await this.api.getCoords().toPromise();
      this.coord = this.currentFilter === null ? src : this.currentFilter === 2 ? src.filter((e) => e.brigade.state === 3 || e.brigade.state === 2) : this.currentFilter === 'custom_1' ? src.filter((e) => e.freeSpace > 0 && e.brigade.state === 1) : src.filter((e) => e.brigade.state === this.currentFilter);
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
