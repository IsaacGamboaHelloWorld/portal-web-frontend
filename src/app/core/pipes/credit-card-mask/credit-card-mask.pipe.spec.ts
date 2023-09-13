import { CreditCardMaskPipe } from './credit-card-mask.pipe';

describe('CreditCardMaskPipe', () => {
  let pipe = new CreditCardMaskPipe();

  beforeEach(() => {
    pipe = new CreditCardMaskPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be return number mask', () => {
    expect(pipe.transform('4556990208673162')).toEqual('4556 9902 0867 3162');
    expect(pipe.transform('379532506766232')).toEqual('3795 3250 6766 232');
    expect(pipe.transform('5567920517635176')).toEqual('5567 9205 1763 5176');
    expect(pipe.transform('55679205')).toEqual('5567 9205');
    expect(pipe.transform('556792051')).toEqual('5567 9205 1');
  });

  it('should be returned value default', () => {
    expect(pipe.transform(null)).toEqual('');
    expect(pipe.transform(undefined)).toEqual('');
    expect(pipe.transform('')).toEqual('');
  });
});
