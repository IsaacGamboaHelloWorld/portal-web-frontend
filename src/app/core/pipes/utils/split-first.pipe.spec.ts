import { SplitFirstPipe } from './split-first.pipe';

describe('SplitFirstPipe', () => {
  it('create an instance', () => {
    const pipe = new SplitFirstPipe();
    expect(pipe).toBeTruthy();
  });

  it('transform should return first word', () => {
    const pipe = new SplitFirstPipe();
    const words = 'hola mundo';
    const result = pipe.transform(words);
    expect(result).toEqual('hola');
  });

  it('transform should return empty with empty input', () => {
    const pipe = new SplitFirstPipe();
    const words = '';
    const result = pipe.transform(words);
    expect(result).toEqual('');
  });
});
