import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-line-time',
  templateUrl: './line-time.component.html',
  styleUrls: ['./line-time.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class LineTimeComponent {
  @Input() step: number = 1;
  @Input() items: string[] = [];
  @Input() classIcon: string = 'icon-check';

  constructor() {}
}
