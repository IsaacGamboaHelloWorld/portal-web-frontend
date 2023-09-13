import { DsMaskCreditCardPipe } from './ds-mask-credit-card.pipe';

describe('DsMaskCreditCardPipe', () => {
  let pipe: DsMaskCreditCardPipe;

  beforeEach(() => {
    pipe = new DsMaskCreditCardPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transform without data', () => {
    const result = pipe.transform(null);
    expect(result).toEqual('');
  });

  it('transform with returnHtml && hide true', () => {
    const cardId = '4506589940263513';
    const shouldBe = `<div class="split-card-container"> <p>••••</p><p>••••</p><p>••••</p><p>3513</p> </div>`;
    const result = pipe.transform(cardId);
    expect(result.trim()).toEqual(shouldBe.trim());
  });

  it('transform with returnHtml true && hide false', () => {
    const cardId = '4506589940263513';
    const shouldBe = `<div class="split-card-container"> <p>4506</p><p>5899</p><p>4026</p><p>3513</p> </div>`;
    const result = pipe.transform(cardId, true, false);
    expect(result.trim()).toEqual(shouldBe.trim());
  });

  it('transform with returnHtml false && hide true', () => {
    const cardId = '4506589940263513';
    const shouldBe = `•••• •••• •••• 3513`;
    const result = pipe.transform(cardId, false, true);
    expect(result.trim()).toEqual(shouldBe.trim());
  });

  it('transform with returnHtml false && hide false', () => {
    const cardId = '4506589940263513';
    const shouldBe = `4506 5899 4026 3513`;
    const result = pipe.transform(cardId, false, false);
    expect(result.trim()).toEqual(shouldBe.trim());
  });

  it('_formatWitoutHtml for 8 digits', () => {
    const cardId = '45065899';
    const shouldBe = `4506 5899`;
    const result = (pipe as any)._formatWitoutHtml(cardId);
    expect(result).toEqual(shouldBe);
  });

  it('_formatWitoutHtml for 12 digits', () => {
    const cardId = '450658994026';
    const shouldBe = `4506 5899 4026`;
    const result = (pipe as any)._formatWitoutHtml(cardId);
    expect(result).toEqual(shouldBe);
  });
});
