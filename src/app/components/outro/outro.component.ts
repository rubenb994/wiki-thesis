import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-outro',
  templateUrl: './outro.component.html',
  styleUrls: ['./outro.component.scss']
})
export class OutroComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  onClickGoToMap(): void {
    this.router.navigate(['map']);
  }

}
