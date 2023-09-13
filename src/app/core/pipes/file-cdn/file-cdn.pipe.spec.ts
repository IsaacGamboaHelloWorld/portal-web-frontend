import { environment } from '@environment';
import { FileCdnPipe } from './file-cdn.pipe';

describe('FileCdnPipe', () => {
  it('create an instance', () => {
    const pipe = new FileCdnPipe();
    expect(pipe).toBeTruthy();
  });

  it('return value', () => {
    const pipe = new FileCdnPipe();
    const value = null;
    const result = pipe.transform(value);
    expect(result).toEqual(value);
  });

  it('return path image', () => {
    const pipe = new FileCdnPipe();
    const value = '/image.png';
    const result = pipe.transform(value);
    expect(result).toEqual(
      environment.resources.base_assets + '/assets/files' + value,
    );
  });
});
