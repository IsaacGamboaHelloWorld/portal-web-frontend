import { Component, Inject, Input, ViewEncapsulation } from '@angular/core';
import { Operation } from '@core/models/movement/operations';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-current-movement',
  templateUrl: './current-movement.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class CurrentMovementComponent {
  @Input() movements: Operation[];
  @Input() filterText: string = '';

  public toggle: object = {};

  constructor(@Inject('isMobile') public isMobile: boolean) {}

  get hasMovements(): boolean {
    return !isNullOrUndefined(this.movements);
  }

  public showIncome(iconme: string, outcome: string): boolean {
    return parseInt(iconme, 10) > parseInt(outcome, 10);
  }

  public showVal(_data: number | string): boolean {
    if (+_data > 0) {
      return true;
    }
  }
}
