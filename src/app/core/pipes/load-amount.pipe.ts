import { Pipe, PipeTransform } from '@angular/core';
import { isNullOrUndefined } from 'util';

@Pipe({
  name: 'loadAmount',
})
export class LoadAmountPipe implements PipeTransform {
  constructor() {}

  transform(
    loading: boolean,
    amount: any,
    loaded: boolean = false,
    text: string = '',
    textLoading: string = '',
  ): string {
    if (loading && isNullOrUndefined(amount)) {
      return `- ${textLoading}...`;
    } else if (loaded || !isNullOrUndefined(amount)) {
      return `- ${text} ${amount}`;
    } else {
      return '';
    }
  }
}
