import { getTestBed, TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '@environment';
import { DetailsService } from '@modules/main-container/services/details.service';
import { FreeDestinationDetailMock } from '../../../../../test-helpers/mocks/data/freeDestinations.mock';
import { ProductDepositeAccountDetailsMock } from '../../../../../test-helpers/mocks/data/products-all.mock';

describe('DetailsService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: DetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DetailsService],
    });
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(DetailsService);
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

  it('get_product', () => {
    const id = '1';
    const type = 'DEPOSIT_ACCOUNT';
    service.get_product(type, id).subscribe((data: any) => {
      expect(data).toBe(
        ProductDepositeAccountDetailsMock.CERTIFIED_DEPOSIT_TERM[0],
      );
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.pdetail,
    );
    expect(req.request.method).toBe('POST');
    req.flush(ProductDepositeAccountDetailsMock.CERTIFIED_DEPOSIT_TERM[0]);
  });

  it('getFreeDestinationDetail', () => {
    const id = '1';
    service.getFreeDestinationDetail(id).subscribe((data: any) => {
      expect(data).toBe(FreeDestinationDetailMock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.detailFreeDestination,
    );
    expect(req.request.method).toBe('POST');
    req.flush(FreeDestinationDetailMock);
  });
});
