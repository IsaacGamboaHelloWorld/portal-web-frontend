import { SanitizerurlsPipe } from './sanitizerurls.pipe';

describe('SanitizerurlsPipe', () => {
  let pipe: SanitizerurlsPipe;

  beforeEach(() => {
    pipe = new SanitizerurlsPipe(null);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
