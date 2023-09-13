import { Component, Inject, Input, ViewEncapsulation } from '@angular/core';

import { Operation } from '@core/models/movement/operations';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-deposit-movement',
  templateUrl: './deposit-movement.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class DepositMovementComponent {
  @Input() movements: Operation[];
  @Input() filterText: string = '';

  public maxItemsPerPage: number = 10;
  public toggle: object = {};

  constructor(@Inject('isMobile') public isMobile: boolean) {}

  get hasMovements(): boolean {
    return !isNullOrUndefined(this.movements);
  }

  public showIncome(iconme: string, outcome: string): boolean {
    return +iconme > +outcome;
  }

  public showVal(_data: number | string): boolean {
    return +_data > 0;
  }
}
