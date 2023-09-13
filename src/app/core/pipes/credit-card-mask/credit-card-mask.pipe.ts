import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Pipe({
  name: 'creditCardMask',
})
export class CreditCardMaskPipe implements PipeTransform {
  transform(value: string = ''): string {
    if (!isNullOrUndefined(value) && value !== '') {
      if (value.length <= 8) {
        return value.replace(/([0-9]{4})([0-9*])/, '$1 $2');
      } else if (value.length >= 9 && value.length <= 13) {
        return value.replace(/([0-9]{4})([0-9]{4})([0-9*])/, '$1 $2 $3');
      } else {
        return value.replace(
          /([0-9]{4})([0-9]{4})([0-9]{4})([0-9*])/,
          '$1 $2 $3 $4',
        );
      }
    } else {
      return '';
    }
  }
}
