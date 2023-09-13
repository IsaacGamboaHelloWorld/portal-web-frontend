import {
  TYPE_STATUS_FREE_DESTINATION,
  TYPE_STATUS_FREE_DESTINATION_RESPONSE,
} from '@app/core/constants/type_status_free_destination';
import {
  TYPE_STATUS_PRODUCTS,
  TYPE_STATUS_PRODUCTS_RESPONSE,
} from '@app/core/constants/type_status_products';
import { TYPE_ACCOUNTS } from '@app/core/constants/types_account';
import { StatusProductPipe } from './status-product.pipe';

describe('StatusProductPipe', () => {
  it('create an instance', () => {
    const pipe = new StatusProductPipe();
    expect(pipe).toBeTruthy();
  });

  it('case TYPE_STATUS_FREE_DESTINATION.N', () => {
    const pipe = new StatusProductPipe();
    const result = pipe.transform(
      TYPE_STATUS_FREE_DESTINATION.N,
      TYPE_ACCOUNTS.FREE_DESTINATION,
    );
    expect(result).toEqual(TYPE_STATUS_FREE_DESTINATION_RESPONSE.N);
  });

  it('case TYPE_STATUS_FREE_DESTINATION.S', () => {
    const pipe = new StatusProductPipe();
    const result = pipe.transform(
      TYPE_STATUS_FREE_DESTINATION.S,
      TYPE_ACCOUNTS.FREE_DESTINATION,
    );
    expect(result).toEqual(TYPE_STATUS_FREE_DESTINATION_RESPONSE.S);
  });

  it('case undefine', () => {
    const pipe = new StatusProductPipe();
    const result = pipe.transform(null, TYPE_ACCOUNTS.FREE_DESTINATION);
    expect(result).toEqual(undefined);
  });

  it('case TYPE_STATUS_PRODUCTS.ACTIVE', () => {
    const pipe = new StatusProductPipe();
    const result = pipe.transform(TYPE_STATUS_PRODUCTS.ACTIVE, '');
    expect(result).toEqual(TYPE_STATUS_PRODUCTS_RESPONSE.ENABLED);
  });

  it('case TYPE_STATUS_PRODUCTS.INACTIVE', () => {
    const pipe = new StatusProductPipe();
    const result = pipe.transform(TYPE_STATUS_PRODUCTS.INACTIVE, '');
    expect(result).toEqual(TYPE_STATUS_PRODUCTS_RESPONSE.DISABLED);
  });

  it('case TYPE_STATUS_PRODUCTS.ACTIVE_CREDIT', () => {
    const pipe = new StatusProductPipe();
    const result = pipe.transform(TYPE_STATUS_PRODUCTS.ACTIVE_CREDIT, '');
    expect(result).toEqual(TYPE_STATUS_PRODUCTS_RESPONSE.ACTIVE_CREDIT);
  });

  it('case TYPE_STATUS_PRODUCTS.CANCELED_CREDIT', () => {
    const pipe = new StatusProductPipe();
    const result = pipe.transform(TYPE_STATUS_PRODUCTS.CANCELED_CREDIT, '');
    expect(result).toEqual(TYPE_STATUS_PRODUCTS_RESPONSE.CANCELED);
  });

  it('case _checkValueProduct default', () => {
    const pipe = new StatusProductPipe();
    const result = pipe.transform('', '');
    expect(result).toEqual(TYPE_STATUS_PRODUCTS_RESPONSE.ENABLED);
  });
});
