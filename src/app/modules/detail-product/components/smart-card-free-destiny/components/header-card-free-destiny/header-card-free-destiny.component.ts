import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { FreeDestinationDetail } from './../../../../../../core/interfaces/free-destination.interface';

@Component({
  selector: 'app-header-card-free-destiny',
  templateUrl: './header-card-free-destiny.component.html',
  styleUrls: ['./header-card-free-destiny.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderCardFreeDestinyComponent implements OnInit {
  @Input() data: FreeDestinationDetail;

  constructor() {}

  ngOnInit(): void {}

  get hasData(): boolean {
    return !isNullOrUndefined(this.data);
  }
}
