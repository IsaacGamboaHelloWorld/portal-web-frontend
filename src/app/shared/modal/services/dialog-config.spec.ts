import { DialogConfig } from '@app/shared/modal/services/dialog-config';

describe('DialogConfig', () => {
  let classDialog: DialogConfig;

  beforeEach(() => {
    classDialog = new DialogConfig();
  });

  afterEach(() => {
    classDialog = null;
  });

  it('should be validate option', () => {
    const value = { nameComponent: 'test' };
    classDialog = value;
    expect(classDialog).toEqual(value);
  });

  it('should be validate all options', () => {
    const value = {
      nameComponent: 'test',
      typeClass: '',
      closeOutSide: false,
      animation: true,
    };
    classDialog = value;
    expect(classDialog).toEqual(value);
  });
});
