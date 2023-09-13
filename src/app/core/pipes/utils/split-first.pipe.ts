import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Pipe({
  name: 'splitFirst',
})
export class SplitFirstPipe implements PipeTransform {
  transform(value: string, separator: string = ' '): string {
    if (!isNullOrUndefined(value) && value !== '') {
      const splits = value.split(separator);
      return splits.length > 0 ? splits[0] : '';
    } else {
      return '';
    }
  }
}
