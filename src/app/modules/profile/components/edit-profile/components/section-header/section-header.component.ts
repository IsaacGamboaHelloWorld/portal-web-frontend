import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class SectionHeaderComponent {
  @Input() public iconPath: string;

  @Input() public title: string;

  constructor() {}
}
