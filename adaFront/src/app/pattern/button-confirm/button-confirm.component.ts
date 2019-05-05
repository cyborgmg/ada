import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-confirm',
  templateUrl: './button-confirm.component.html',
  styleUrls: ['./button-confirm.component.css']
})
export class ButtonConfirmComponent implements OnInit {

  @Input() btnid: string;
  @Input() dlgid: string;
  @Input() label: string;
  @Input() class: string;
  @Input() message: string;
  @Input() title: string;
  @Input() disabled: boolean;
  @Output() confiormClick: EventEmitter<{}> = new EventEmitter();


  // tslint:disable-next-line:no-inferrable-types
  display: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  confirmation() {
    this.confiormClick.emit();
    this.display = false;
  }

}
