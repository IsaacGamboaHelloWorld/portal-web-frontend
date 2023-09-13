import { getTestBed, TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '@environment';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { ChooseHistoryService } from './choose-history.service';

describe('ChooseHistoryService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: ChooseHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [ChooseHistoryService],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(ChooseHistoryService);
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

  it('chooseHistoryPayments', () => {
    const mock = {};
    service.chooseHistoryPayments().subscribe((result: any) => {
      expect(result).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.historicPayments,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });
});
