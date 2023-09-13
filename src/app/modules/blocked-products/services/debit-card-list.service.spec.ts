import { getTestBed, TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '@environment';
import { productDebitCardMock } from '../../../../../test-helpers/mocks/data/products-blocks.mock';
import { DebitCardListService } from './debit-card-list.service';

describe('DebitCardListService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: DebitCardListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DebitCardListService],
    });
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(DebitCardListService);
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

  it('loadDebitCards', () => {
    service.loadDebitCards().subscribe((data: any) => {
      expect(data).toBe(productDebitCardMock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.load_debit_cards,
    );
    expect(req.request.method).toBe('POST');
    req.flush(productDebitCardMock);
  });
});
