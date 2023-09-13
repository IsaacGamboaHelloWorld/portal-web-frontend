import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Pipe({
  name: 'creditCardHidden',
})
export class CreditCardHiddenPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!isNullOrUndefined(value) && !args) {
      let returnedData = '';
      const mask = value.toString().match(/(.{3,4})$/);
      const length2change = value.indexOf(mask[0]);
      const returnData = value.slice(0, length2change);
      returnedData = returnData.replace(/[0-9]/g, '*');
      value = returnedData + mask[0];
    } else if (args) {
      const maskInit = '****************';
      const blocks = 4;
      let resValue: string = Array(maskInit.length / blocks)
        .fill(
          Array(blocks)
            .fill(maskInit[0])
            .join(''),
        )
        .join(' ');
      for (let i = 0; i < value.length; i++) {
        resValue = `${resValue.substring(0, i)}${value[i]}${resValue.substring(
          i + 1,
        )}`;
      }
      value = resValue;
    }
    return value;
  }
}
