import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FreeDestinationDetail } from '@app/core/interfaces/free-destination.interface';
import { isNullOrUndefined } from 'util';
import { TYPE_STATUS_FREE_DESTINATION } from './../../../../core/constants/type_status_free_destination';

@Component({
  selector: 'app-smart-card-free-destiny',
  templateUrl: './smart-card-free-destiny.component.html',
  styleUrls: ['./smart-card-free-destiny.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class SmartCardFreeDestinyComponent implements OnInit {
  @Input() freeDestination: FreeDestinationDetail;

  constructor() {}

  ngOnInit(): void {}

  get hasData(): boolean {
    return !isNullOrUndefined(this.freeDestination);
  }

  get isInDue(): string {
    return TYPE_STATUS_FREE_DESTINATION.N;
  }

  get isInToday(): string {
    return TYPE_STATUS_FREE_DESTINATION.S;
  }
}
