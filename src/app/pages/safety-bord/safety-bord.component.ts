import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-safety-bord',
  templateUrl: './safety-bord.component.html',
  styleUrls: ['./safety-bord.component.scss']
})
export class SafetyBordComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    setTimeout(() => this.router.navigate(['/list']), 3000)
  }

}
