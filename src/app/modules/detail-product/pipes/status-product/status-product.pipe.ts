import { Pipe, PipeTransform } from '@angular/core';
import { TYPE_ACCOUNTS } from '@core/constants/types_account';
import { isNullOrUndefined } from 'util';
import {
  TYPE_STATUS_PRODUCTS,
  TYPE_STATUS_PRODUCTS_RESPONSE,
} from '../../../../core/constants/type_status_products';
import {
  TYPE_STATUS_FREE_DESTINATION,
  TYPE_STATUS_FREE_DESTINATION_RESPONSE,
} from './../../../../core/constants/type_status_free_destination';

@Pipe({
  name: 'statusProduct',
})
export class StatusProductPipe implements PipeTransform {
  transform(value: any, typeAccount: string = ''): any {
    if (typeAccount === TYPE_ACCOUNTS.FREE_DESTINATION) {
      return this._checkValueFreeDestination(value);
    } else {
      return this._checkValueProduct(value);
    }
  }

  private _checkValueFreeDestination(value: any): any {
    if (!isNullOrUndefined(value)) {
      if (value === TYPE_STATUS_FREE_DESTINATION.N) {
        return TYPE_STATUS_FREE_DESTINATION_RESPONSE.N;
      } else {
        return TYPE_STATUS_FREE_DESTINATION_RESPONSE.S;
      }
    }
  }

  private _checkValueProduct(value: any): any {
    if (!isNullOrUndefined(value)) {
      switch (value) {
        case TYPE_STATUS_PRODUCTS.ACTIVE:
          return TYPE_STATUS_PRODUCTS_RESPONSE.ENABLED;
        case TYPE_STATUS_PRODUCTS.INACTIVE:
          return TYPE_STATUS_PRODUCTS_RESPONSE.DISABLED;
        case TYPE_STATUS_PRODUCTS.ACTIVE_CREDIT:
          return TYPE_STATUS_PRODUCTS_RESPONSE.ACTIVE_CREDIT;
        case TYPE_STATUS_PRODUCTS.CANCELED_CREDIT:
          return TYPE_STATUS_PRODUCTS_RESPONSE.CANCELED;
        default:
          return TYPE_STATUS_PRODUCTS_RESPONSE.ENABLED;
      }
    }
  }
}
