import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from "../../shared/services/api.service";
import {Queue} from "../../shared/services/queue";
import * as _ from 'lodash';
import {SignalRService} from "../../shared/services/signal-r.service";
import {forkJoin} from "rxjs";
import {map} from "rxjs/operators";
@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private api: ApiService,
    private arouter: ActivatedRoute,
    private socket: SignalRService
  ) {}
  interval: any;
  queue: Queue[][] = [];
  queueSrc: Queue[][] = [];
  q: Queue[] = [];
  selectedItem: any;
  selectedPage = 0;
  audio = new Audio();
  //NEW ADDED TICKET - STARTS
  addedTicket: Queue;
  isActiveAddedTicket = false;
  selectedActiveItem: any;
  selectedActivePage = 0;
  //NEW ADDED TICKET - ENDS
  async notifyTicket(q: Queue) {
    this.addedTicket = q;
    this.isActiveAddedTicket = true;
    await new Promise((r) => {
      setTimeout(() => {
        this.isActiveAddedTicket = false;
        this.addedTicket = null;
        r(true);
      }, 3000)
    })
  }
  async playSounds(arr: Queue[]): Promise<void> {
    var sounds = await this.api.getSounds().toPromise();
    for (const i of arr.filter((e) => e.session !== null)) {
      this.notifyTicket(i);
      if(!!sounds.find((e) => e.name === i.name)) {
        this.audio.src = sounds.find((e) => e.name === i.name).file.fullUrl;
        this.audio.load();
        await new Promise(r => {
          this.audio.play();
          this.audio.onended = r;
        });
      }
      if(!!i?.session?.windows?.audio?.fullUrl) {
        this.audio.src = i.session.windows.audio.fullUrl;
        this.audio.load();
        await this.audio.play();
      }
    }
  }
  async getQueue(init = false): Promise<void> {
    await new Promise((res, rej) => {
      this.arouter.paramMap.subscribe(async (e) => {
        var src = await this.api.getQueue().pipe(
          map(i => i.filter(e2 => e2.roomId === parseInt(e.get('id'))))
        ).toPromise();
        var a = _.chunk((src), 5);
        if(_.differenceBy(src, _.flattenDeep(this.queue), 'session.id').length > 0 && !!this.queue.length) {
          this.playSounds(_.differenceBy(src, _.flattenDeep(this.queue), 'session.id'));
        }
        if(!_(this.queue).differenceWith(a, _.isEqual).isEmpty()) {
          this.selectedPage = 0;
          this.selectedItem = 0;
        }
          this.queue = a;
          this.q = src;
          this.queueSrc = _.chunk((src.filter((e) => !!e?.session)), 5);
        if(this.queue.length === 0) {
          this.selectedItem = null;
          this.selectedPage = 0;
        }
        res(true);
      })
    })
  }
  async parseData(init = false): Promise<void> {
    await this.getQueue(init);
    // setTimeout(() => this.router.navigate(['/safety']), 14000);
    if(init) {
      this.interval = setInterval(() => {
        if(this.queueSrc.length === 0) {
          this.selectedActivePage = 0;
          this.selectedActiveItem = 0;
          return;
        }
        if((this.selectedActiveItem + 1) === this.queue[this.selectedActivePage].length) {
          this.selectedActivePage = this.queue.length === (this.selectedActivePage + 1) ? 0 : this.selectedActivePage + 1;
          this.selectedActiveItem = 0;
          return;
        }
        this.selectedActiveItem = this.selectedActiveItem === undefined ? 0 : this.selectedActiveItem + 1 === this.queue[this.selectedActivePage].length ? 0 : this.queue[this.selectedActivePage].length < this.selectedActivePage + 1 ? 0 : this.selectedActivePage + 1;
        //-------------------
        if(this.queue.length === 0) {
          this.selectedPage = 0;
          this.selectedItem = 0;
          return;
        }
        if((this.selectedItem + 1) === this.queue[this.selectedPage].length) {
          this.selectedPage = this.queue.length === (this.selectedPage + 1) ? 0 : this.selectedPage + 1;
          this.selectedItem = 0;
          return;
        }
        this.selectedItem = this.selectedItem === undefined ? 0 : this.selectedItem + 1 === this.queue[this.selectedPage].length ? 0 : this.queue[this.selectedPage].length < this.selectedItem + 1 ? 0 : this.selectedItem + 1;
      }, 3000);
    }
  }
  ngOnInit(): void {
    this.parseData(true);
    this.socket.startConnection().then((e) => {
      this.socket.dataTransferSub('ReCall', false).subscribe((i) => {
        if(!!this.q.find((e) => e.id === i.user)) {
          this.playSounds([this.q.find((e) => e.id === i.user)]);
        }
      })
    })
    this.socket.dataTransferSub('work').subscribe(async (e: any) => {
      this.parseData();
    });
  }
  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  select(i: any): void {
    this.selectedItem = i;
  }

}
