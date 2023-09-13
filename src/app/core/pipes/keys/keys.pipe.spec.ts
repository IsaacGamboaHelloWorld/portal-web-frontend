import { KeysPipe } from './keys.pipe';

describe('KeysPipe', () => {
  let pipe: KeysPipe;

  beforeEach(() => {
    pipe = new KeysPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should be returned empty array', () => {
    expect(pipe.transform(null)).toEqual([]);
  });

  it('should be returned array', () => {
    const test = {
      CC: [1, 2],
      CREDIT: [3, 4],
    };

    const transformArray = [
      {
        key: 'CC',
        value: [1, 2],
      },
      {
        key: 'CREDIT',
        value: [3, 4],
      },
    ];

    expect(pipe.transform(test)).toEqual(transformArray);
  });
});
