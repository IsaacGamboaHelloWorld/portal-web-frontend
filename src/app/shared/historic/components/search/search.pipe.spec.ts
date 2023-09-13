import { SearchPipe } from './search.pipe';

describe('SearchPipe', () => {
  let pipe: SearchPipe;

  beforeEach(() => {
    pipe = new SearchPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('SearchPipe without items', () => {
    const result = pipe.transform(null, '');
    expect(JSON.stringify(result)).toEqual(JSON.stringify([]));
  });

  it('SearchPipe without searchText', () => {
    const items = [];
    const result = pipe.transform(items, null);
    expect(JSON.stringify(result)).toEqual(JSON.stringify(items));
  });

  it('SearchPipe with items and searchText', () => {
    const items = [{ primero: 'primero' }];
    const text = 'primero';
    const result = pipe.transform(items, text);
    expect(JSON.stringify(result)).toEqual(JSON.stringify(items));
  });
});
