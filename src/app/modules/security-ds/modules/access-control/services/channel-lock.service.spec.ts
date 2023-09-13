import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { environment } from '@environment';

import { ChannelLockService } from './channel-lock.service';

describe('ChannelLockService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: ChannelLockService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ChannelLockService],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(ChannelLockService);
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
    service = TestBed.get(ChannelLockService);
    expect(service).toBeTruthy();
  });

  it('channelLockCreate', () => {
    const mock = {};
    service.channelLockCreate(true, true).subscribe((result: any) => {
      expect(result).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.channel_lock.create,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });

  it('channelLockUpdate', () => {
    const mock = {};
    service.channelLockUpdate(true, true).subscribe((result: any) => {
      expect(result).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.channel_lock.update,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });

  it('channelLockGet', () => {
    const mock = {};
    service.channelLockGet().subscribe((result: any) => {
      expect(result).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.channel_lock.get,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });

  it('channelLockDelete', () => {
    const mock = {};
    service.channelLockDelete().subscribe((result: any) => {
      expect(result).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.channel_lock.delete,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });
});
