import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-div-p-calendar',
  templateUrl: './div-p-calendar.component.html',
  styleUrls: ['./div-p-calendar.component.css']
})
export class DivPCalendarComponent implements OnInit {

  @Input() uimd = '';

  constructor() { }

  ngOnInit() {
  }

}
