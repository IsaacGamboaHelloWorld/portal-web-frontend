import { CREDIT_CARDS } from '@core/constants/imgs_cards';
import { TypeCreditCardPipe } from './type-credit-card.pipe';

describe('TypeCreditCardPipe', () => {
  let pipe: TypeCreditCardPipe;

  beforeEach(() => {
    pipe = new TypeCreditCardPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be returned default img', () => {
    expect(pipe.transform(null).img).toBe(CREDIT_CARDS.IMG_DEFAULT);
    expect(pipe.transform(11111111111).img).toBe(CREDIT_CARDS.IMG_DEFAULT);
  });

  it('should be returned type card', () => {
    expect(pipe.transform(4556990208673162).img).toBe(CREDIT_CARDS.IMG_VISA);
    expect(pipe.transform(4175006238301699).img).toBe(CREDIT_CARDS.IMG_VISA);
    expect(pipe.transform(379532506766232).img).toBe(
      CREDIT_CARDS.IMG_AMERICAN_EXPRESS,
    );
    expect(pipe.transform(5567920517635176).img).toBe(
      CREDIT_CARDS.IMG_MASTER_CARD,
    );
    expect(pipe.transform(30014252037077).img).toBe(CREDIT_CARDS.IMG_DINNER);
    expect(pipe.transform(36148900647913).img).toBe(CREDIT_CARDS.IMG_DINNER);
    expect(pipe.transform(6011020679801128).img).toBe(CREDIT_CARDS.IMG_DEFAULT);
    expect(pipe.transform(3529697360789142).img).toBe(CREDIT_CARDS.IMG_DEFAULT);
  });
});
