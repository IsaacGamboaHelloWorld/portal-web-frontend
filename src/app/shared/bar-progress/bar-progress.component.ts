import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-bar-progress',
  templateUrl: './bar-progress.component.html',
  styleUrls: ['./bar-progress.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class BarProgressComponent implements OnInit {
  @Input() valueProgress: number = 0;
  @Input() title: string = '';
  @Input() desc: string = '';
  @Input() max: number = 100;
  @Input() customStyle: object = {};
  constructor() {}

  ngOnInit(): void {}
}
