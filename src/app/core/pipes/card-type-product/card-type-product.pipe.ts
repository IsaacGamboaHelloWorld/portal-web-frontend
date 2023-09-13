import { Pipe, PipeTransform } from '@angular/core';
import { TYPE_PRODUCTS } from '@app/core/constants/type_products';
import { TYPE_ACCOUNTS } from '@app/core/constants/types_account';
import { isNullOrUndefined } from 'util';

@Pipe({
  name: 'cardTypeProduct',
})
export class CardTypeProductPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    if (!isNullOrUndefined(value)) {
      if (value === TYPE_ACCOUNTS.CREDIT_CARD) {
        return TYPE_PRODUCTS.CREDIT_CARD;
      }
    }
    return value;
  }
}
