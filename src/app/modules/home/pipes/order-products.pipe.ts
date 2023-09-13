import { Pipe, PipeTransform } from '@angular/core';
import { ORDER_PRODUCTS } from '@core/constants/order_products';
import { isNullOrUndefined } from 'util';

@Pipe({
  name: 'orderProducts',
})
export class OrderProductsPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    if (!isNullOrUndefined(value)) {
      const productsOrdered = value
        .filter((item) => ORDER_PRODUCTS.indexOf(item.key) !== -1)
        .sort(
          (a, b) =>
            ORDER_PRODUCTS.indexOf(a['key']) - ORDER_PRODUCTS.indexOf(b['key']),
        )
        .concat(
          value.filter((item) => ORDER_PRODUCTS.indexOf(item.key) === -1),
        );

      return productsOrdered;
    } else {
      return [];
    }
  }
}
