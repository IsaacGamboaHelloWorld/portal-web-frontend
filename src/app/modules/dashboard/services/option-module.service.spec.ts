import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { environment } from '@environment';
import { responseOptionsModuleMock } from '../../../../../test-helpers/mocks/data/options-modules.mock';

import { OptionModuleService } from './option-module.service';

describe('OptionModuleService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: OptionModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OptionModuleService],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(OptionModuleService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  afterAll(() => {
    injector = null;
    httpMock = null;
    service = null;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getOptions', () => {
    const mock = responseOptionsModuleMock;
    service.getOptions().subscribe((result: any) => {
      expect(result).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.optionsModules,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });
});
