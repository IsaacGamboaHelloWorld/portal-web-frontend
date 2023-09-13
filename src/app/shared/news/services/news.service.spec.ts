import { getTestBed, TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { environment } from '@environment';
import { NewsService } from './news.service';

describe('NewsService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: NewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NewsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(NewsService);
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

  it('savePrefs', () => {
    const mock = {};
    const request = {} as any;
    service.savePrefs(request).subscribe((data: any) => {
      expect(data).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.preferences.save,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });

  it('LoadPrefs', () => {
    const mock = {};
    service.LoadPrefs().subscribe((data: any) => {
      expect(data).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.preferences.all,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });
});
