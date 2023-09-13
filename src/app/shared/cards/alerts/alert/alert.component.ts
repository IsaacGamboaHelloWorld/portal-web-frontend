import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class AlertComponent implements OnInit {
  @Input() loading: boolean;
  @Input() data: any;

  constructor() {}

  ngOnInit(): void {}
}
