import { Component, Inject, Input, ViewEncapsulation } from '@angular/core';
import { isNullOrUndefined } from 'util';

import { CreditCardMovementInterface } from '@core/interfaces/creditCardMovement.interface';

@Component({
  selector: 'app-credit-card-movement',
  templateUrl: './credit-card-movement.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CreditCardMovementComponent {
  @Input() movementsCC: CreditCardMovementInterface[];
  @Input() filterText: string = '';

  public toggle: object = {};

  constructor(@Inject('isMobile') public isMobile: boolean) {}

  get hasMovements(): boolean {
    return !isNullOrUndefined(this.movementsCC);
  }

  public showIncome(iconme: string, outcome: string): boolean {
    return parseInt(iconme, 10) > parseInt(outcome, 10);
  }

  public showVal(_data: number | string): boolean {
    return +_data > 0;
  }
}
