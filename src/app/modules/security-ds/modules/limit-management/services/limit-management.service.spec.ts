import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { environment } from '@environment';

import { LimitManagementService } from './limit-management.service';

describe('LimitManagementService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: LimitManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LimitManagementService],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(LimitManagementService);
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

  it('create', () => {
    const mock = {};
    const request = {} as any;
    service.create(request).subscribe((result: any) => {
      expect(result).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.limitManagement.create,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });

  it('get', () => {
    const mock = {};
    const request = {} as any;
    service.get(request).subscribe((result: any) => {
      expect(result).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.limitManagement.get,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });

  it('update', () => {
    const mock = {};
    const request = {} as any;
    service.update(request).subscribe((result: any) => {
      expect(result).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.limitManagement.update,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });

  it('delete', () => {
    const mock = {};
    const request = {} as any;
    service.delete(request).subscribe((result: any) => {
      expect(result).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.limitManagement.delete,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });
});
