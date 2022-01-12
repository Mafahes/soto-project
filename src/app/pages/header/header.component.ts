import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  date: Date;
  constructor() {
    this.date = new Date();
  }
  ngOnInit(): void {
    setInterval(() => {
      this.date = new Date();
    }, 1000);
  }
}
