import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import { environment } from '@environment';
import { TestingModule } from '../../../../../test-helpers/testing.module';

import { NotificationSmsService } from './notification-sms.service';

describe('NotificationSmsService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: NotificationSmsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [NotificationSmsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(NotificationSmsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('sendNotificationSms', () => {
    const mock = {};
    service.sendNotificationSms().subscribe((result: any) => {
      expect(result).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.notificationSms,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });
});
