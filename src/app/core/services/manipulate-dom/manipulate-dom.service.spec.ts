import { TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ManipulateDomService } from './manipulate-dom.service';

describe('ManipulateDomService', () => {
  let service: ManipulateDomService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ManipulateDomService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });

    service = TestBed.get(ManipulateDomService);
  });

  it('should be created', () => {
    service.scrollTop(0);
    expect(service).toBeTruthy();
  });

  it('scrollContentTop', () => {
    const mock = {
      classList: {
        remove: () => {},
        add: () => {},
        contains: () => {},
      },
      scrollTop: 0,
    };
    const spy = spyOn(document, 'querySelector').and.returnValue(mock);

    service.scrollContentTop();

    expect(spy).toHaveBeenCalled();
  });

  it('containsClass with className', () => {
    const el = '.active';
    const className = 'disabled';

    const arrEl = [
      {
        classList: {
          remove: () => {},
          add: () => {},
          contains: () => {},
        },
      },
    ];
    const spy = spyOn(document, 'querySelector').and.returnValue(arrEl[0]);

    service.containsClass(el, className);

    expect(spy).toHaveBeenCalled();
  });

  it('containsClass without className', () => {
    const el = '.active';

    const arrEl = [
      {
        classList: {
          remove: () => {},
          add: () => {},
          contains: () => {},
        },
      },
    ];
    const spy = spyOn(document, 'querySelector').and.returnValue(arrEl[0]);

    service.containsClass(el);

    expect(spy).toHaveBeenCalled();
  });

  it('containsClass without el', () => {
    const el = null;

    const arrEl = [
      {
        classList: {
          remove: () => {},
          add: () => {},
          contains: () => {},
        },
      },
    ];
    spyOn(document, 'querySelector').and.returnValue(arrEl[0]);

    const result = service.containsClass(el);

    expect(result).toBeFalsy();
  });

  it('isChrome', () => {
    spyOn(navigator, 'userAgent').and.returnValue('chrome');
    const result = service.isChrome();
    expect(result).toBeTruthy();
  });
});
