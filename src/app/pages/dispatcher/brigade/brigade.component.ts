import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { ApiService } from '../../../shared/services/api.service';
import { Brigade } from '../../../shared/interfaces/brigade';
import { CoordObject } from '../../../shared/interfaces/coords';
import { Status } from '../../../shared/configuration';
import { StorageService } from '../../../shared/injectables/storage.service';
import { Router } from '@angular/router';
import {debounceTime, distinctUntilChanged, filter, tap} from "rxjs/operators";
import {fromEvent} from "rxjs";

@Component({
  selector: 'app-brigade',
  templateUrl: './brigade.component.html',
  styleUrls: ['./brigade.component.scss'],
})
export class BrigadeComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private api: ApiService,
    private storage: StorageService,
    private router: Router
  ) {}
  brigade: Brigade[] = [];
  map: any;
  coord: CoordObject[] = [];
  interval;
  bearing = 0;
  page = 0;
  total = [];
  statuses = Status.brigadeStatus.filter((e) => e.value !== 0 && e.value !== 3);
  currentFilter = null;
  expanded = false;
  @ViewChild('search') input: ElementRef;
  ngAfterViewInit(): void {
    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(800),
        distinctUntilChanged(),
        tap(async (text) => {
          this.brigade = (await this.api.getBrigades(5, this.page, this.input.nativeElement.value).toPromise()).data;
        })
      )
      .subscribe();
  }
  onMapLoad(map): void {
    this.map = map;
    // const layers = map.getStyle().layers;
    // const labelLayerId = layers.find(
    //   (layer) => layer.type === 'symbol' && layer.layout['text-field']
    // ).id;
    // map.addLayer(
    //   {
    //     'id': 'add-3d-buildings',
    //     'source': 'composite',
    //     'source-layer': 'building',
    //     'filter': ['==', 'extrude', 'true'],
    //     'type': 'fill-extrusion',
    //     'minzoom': 15,
    //     'paint': {
    //       'fill-extrusion-color': '#aaa',
    //
    //       // Use an 'interpolate' expression to
    //       // add a smooth transition effect to
    //       // the buildings as the user zooms in.
    //       'fill-extrusion-height': [
    //         'interpolate',
    //         ['linear'],
    //         ['zoom'],
    //         15,
    //         0,
    //         15.05,
    //         ['get', 'height']
    //       ],
    //       'fill-extrusion-base': [
    //         'interpolate',
    //         ['linear'],
    //         ['zoom'],
    //         15,
    //         0,
    //         15.05,
    //         ['get', 'min_height']
    //       ],
    //       'fill-extrusion-opacity': 0.6
    //     }
    //   },
    //   labelLayerId
    // );
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
        : i.value === 1
        ? src.filter((e) => e.space - e.freeSpace > 0)
        : i.value === 2
        ? src.filter((e) => e.brigade.state === 3 || e.brigade.state === 2) // Не на смене
        : i.value === 'custom_1'
        ? src.filter((e) => e.freeSpace === e.space && e.brigade.state === 1) // Свободные бригады
        : src.filter((e) => e.brigade.state === i.value);
  }
  async onPageChange(e): Promise<void> {
    this.brigade = (await this.api.getBrigades(5, e).toPromise()).data;
    this.page = e;
  }
  async ngOnInit(): Promise<void> {
    this.storage.user$.subscribe((e) => {
      if (e?.roleName === 'Менеджер') {
        this.router.navigate(['/dispatcher/carts']);
      }
    });
    this.interval = setInterval(async () => {
      const src = await this.api.getCoords().toPromise();
      this.coord =
        this.currentFilter === null
          ? src
          : this.currentFilter === 1
          ? src.filter((e) => e.space - e.freeSpace > 0)
          : this.currentFilter === 2
          ? src.filter((e) => e.brigade.state === 3 || e.brigade.state === 2)
          : this.currentFilter === 'custom_1'
          ? src.filter((e) => e.freeSpace === e.space && e.brigade.state === 1)
          : src.filter((e) => e.brigade.state === this.currentFilter);
    }, 3000);
    const src = await this.api.getCoords().toPromise();
    this.coord =
      this.currentFilter === null
        ? src
        : src.filter((e) => e.brigade.state === this.currentFilter);
    this.api.getBrigades(5).subscribe((e) => {
      this.brigade = e.data;
      this.total = [];
      for (let i = 0; i < e.totalRecords; i++) {
        this.total.push(i + 1);
      }
    });
  }
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
