import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "../../../shared/services/api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Category, RoomData} from "../../../shared/interfaces/room";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SignalRService} from "../../../shared/services/signal-r.service";
import {timer} from "rxjs";

@Component({
  selector: 'app-terminal-cat-list',
  templateUrl: './terminal-cat-list.component.html',
  styleUrls: ['./terminal-cat-list.component.scss']
})
export class TerminalCatListComponent implements OnInit, OnDestroy {
  roomCats: RoomData;
  roomId = 0;
  type = 1;
  interval;
  selectedCat: Category;
  currentDate = new Date();
  completed = false;
  loading = false;
  countDown = 5;
  ticket: any;
  selectedTicket = 0;
  constructor(
    private api: ApiService,
    private router: Router,
    private socket: SignalRService,
    private snackBar: MatSnackBar,
    private arouter: ActivatedRoute
  ) { }
  async ngOnInit(): Promise<void> {
    this.interval = setInterval(() => this.currentDate = new Date(), 1000);
    this.socket.dataTransferSub('Power').subscribe((e) => {
      this.ticket = null;
      this.completed = e.user.state;
    })
    this.arouter.paramMap.subscribe(async (i) => {
      this.roomId = i.get('id') === null ? null : parseInt(i.get('id'));
      this.roomCats = (await this.api.getRooms().toPromise()).data[0];
      this.selectedCat = this.roomCats.category[0];
      this.type = 2;
    })
  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }

  switchType(cat: Category): void {
    this.selectedCat = cat;
    this.type = 2;
  }
  getHelp() {
    this.socket.invokeMethod('Help', this.roomId);
  }
  async registerTicket(id): Promise<void> {
    if(this.loading) return;
    this.selectedTicket = id;
    this.loading = true;
    await new Promise((res, rej) => setTimeout(() => res(true), 500));
    this.ticket = await this.api.registerTicket(id).toPromise();
    this.selectedTicket = 0;
    this.completed = true;
    this.loading = false;
    var sub = timer(0, 1000).subscribe(() => --this.countDown)
    setTimeout(() => {
      this.completed = false;
      this.countDown = 5;
      this.ticket = null;
      sub.unsubscribe();
    }, 5000)
    // this.type = 1;
    // this.selectedCat = null;
    // this.snackBar.open('Услуга заказана', null, {
    //   duration: 2000,
    //   panelClass: ['snack-bar-white-card']
    // })
  }
}


