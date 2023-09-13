import { LoadAmountPipe } from './load-amount.pipe';

describe('LoadAmountPipe', () => {
  let pipe: LoadAmountPipe;

  beforeEach(() => {
    pipe = new LoadAmountPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('loadAmount with loading true and amount is null', () => {
    const loading = true;
    const amount = null;
    const loaded = true;
    const text = 'message';
    const textLoading = 'loading';

    const result = pipe.transform(loading, amount, loaded, text, textLoading);

    expect(result).toEqual(`- ${textLoading}...`);
  });

  it('loadAmount with loaded true and amount', () => {
    const loading = true;
    const amount = '1000';
    const loaded = true;
    const text = 'message';
    const textLoading = 'loading';

    const result = pipe.transform(loading, amount, loaded, text, textLoading);

    expect(result).toEqual(`- ${text} ${amount}`);
  });

  it('loadAmount for else', () => {
    const loading = false;
    const amount = null;
    const loaded = false;
    const text = 'message';
    const textLoading = 'loading';

    const result = pipe.transform(loading, amount, loaded, text, textLoading);

    expect(result).toEqual('');
  });

  it('loadAmout for defautl inputs', () => {
    const loading = false;
    const amount = null;

    const result = pipe.transform(loading, amount);

    expect(result).toEqual('');
  });
});
