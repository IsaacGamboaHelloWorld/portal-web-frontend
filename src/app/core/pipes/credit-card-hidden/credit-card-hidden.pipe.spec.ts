import { CreditCardHiddenPipe } from './credit-card-hidden.pipe';

describe('CreditCardHiddenPipe', () => {
  it('create an instance', () => {
    const pipe = new CreditCardHiddenPipe();
    expect(pipe).toBeTruthy();
  });
});
