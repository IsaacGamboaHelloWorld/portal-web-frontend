import { TYPE_PRODUCTS } from '@app/core/constants/type_products';
import { TYPE_ACCOUNTS } from '@app/core/constants/types_account';
import { CardTypeProductPipe } from './card-type-product.pipe';

describe('CardTypeProductPipe', () => {
  it('create an instance', () => {
    const pipe = new CardTypeProductPipe();
    expect(pipe).toBeTruthy();
  });

  it('case TYPE_ACCOUNTS.CREDIT_CARD', () => {
    const pipe = new CardTypeProductPipe();
    const result = pipe.transform(TYPE_ACCOUNTS.CREDIT_CARD);
    expect(result).toEqual(TYPE_PRODUCTS.CREDIT_CARD);
  });

  it('case TYPE_ACCOUNTS.DEPOSIT_ACCOUNT', () => {
    const pipe = new CardTypeProductPipe();
    const result = pipe.transform(TYPE_ACCOUNTS.DEPOSIT_ACCOUNT);
    expect(result).toEqual(TYPE_ACCOUNTS.DEPOSIT_ACCOUNT);
  });

  it('when value is null', () => {
    const pipe = new CardTypeProductPipe();
    const result = pipe.transform(null);
    expect(result).toEqual(null);
  });
});
