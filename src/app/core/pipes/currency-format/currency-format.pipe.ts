import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Pipe({
  name: 'currencyFormat',
})
export class CurrencyFormatPipe extends CurrencyPipe implements PipeTransform {
  // @ts-ignore
  transform(
    value: any,
    smallDecimal: boolean = false,
    classDecimal: string = '',
    showDecimal: boolean = true,
  ): string {
    value = isNullOrUndefined(value) ? 0 : value;
    if (!isNullOrUndefined(value) && value !== '') {
      const transformed = super
        .transform(value)
        .replace(/[\.,]/g, (n) => (n === '.' ? ',' : '.'));
      return isDecimal(transformed, smallDecimal, classDecimal, showDecimal);
    } else {
      return value;
    }
  }
}

function isDecimal(
  value: string,
  decimal: boolean,
  classD: string,
  showDecimal: boolean,
): string {
  if (decimal) {
    const newCurrency = value.split(',');
    return `${newCurrency[0]}<p class="decimal-numbers ${classD}">,${newCurrency[1]}</p>`;
  } else {
    return showDecimal ? value : value.split(',')[0];
  }
}
