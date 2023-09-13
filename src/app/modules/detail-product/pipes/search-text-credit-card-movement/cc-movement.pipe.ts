import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from 'util';

import { CreditCardMovementInterface } from '@core/interfaces/creditCardMovement.interface';

@Pipe({
  name: 'ccMovement',
})
export class CcMovementPipe implements PipeTransform {
  transform(value: any, dataFilter: string): CreditCardMovementInterface[] {
    if (
      !isNullOrUndefined(value) &&
      !isNullOrUndefined(dataFilter) &&
      dataFilter !== ''
    ) {
      const text = dataFilter.toLowerCase();
      return value.filter((data: CreditCardMovementInterface) =>
        data.description.toLowerCase().includes(text),
      );
    } else {
      return value;
    }
  }
}
