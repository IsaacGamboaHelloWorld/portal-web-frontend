import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from 'util';

import { Operation } from '../../../../core/models/movement/operations';

@Pipe({
  name: 'searchTextMovement',
})
export class SearchTextMovementPipe implements PipeTransform {
  transform(value: any, dataFilter: string): Operation[] {
    if (
      !isNullOrUndefined(value) &&
      !isNullOrUndefined(dataFilter) &&
      dataFilter !== ''
    ) {
      const text = dataFilter.toLowerCase();
      return value.filter((data: Operation) =>
        data.transactionInformation.transactionType
          .toLowerCase()
          .includes(text),
      );
    } else {
      return value;
    }
  }
}
