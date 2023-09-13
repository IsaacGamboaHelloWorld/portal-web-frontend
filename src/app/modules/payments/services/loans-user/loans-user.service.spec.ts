import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import { environment } from '@environment';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { LoansUserService } from './loans-user.service';

describe('AffiliationProductsService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: LoansUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [LoansUserService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(LoansUserService);
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

  it('loansToPay', () => {
    const mock = {};
    service.loansToPay().subscribe((result: any) => {
      expect(result).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.loans,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });
});
