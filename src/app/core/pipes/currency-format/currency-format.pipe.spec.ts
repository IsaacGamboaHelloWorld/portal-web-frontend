import { CurrencyFormatPipe } from '@core/pipes/currency-format/currency-format.pipe';

describe('CurrencyFormatPipe', () => {
  let pipe: CurrencyFormatPipe;

  beforeEach(() => {
    pipe = new CurrencyFormatPipe('en-US');
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be returned replace value', () => {
    expect(pipe.transform('12435')).toBe('$12.435,00');
  });

  it('should be returned value default', () => {
    expect(pipe.transform('0')).toBe('$0,00');
  });
});
