import { getTestBed, TestBed } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '@environment';
import { BlockProductService } from '@modules/blocked-products/services/block-products.service';
import { blockCreditCardMock } from '../../../../../test-helpers/mocks/data/products-blocks.mock';
import { IBlockProduct } from '../entities/block-product';

describe('BlockProductsService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: BlockProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BlockProductService],
    });
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(BlockProductService);
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

  it('blockProduct', () => {
    const dataMock = blockCreditCardMock[0];
    const dataToSend: IBlockProduct = {
      accountId: dataMock.accountInformation.accountIdentifier,
      accountType: dataMock.accountInformation.productType,
      refType: 'TEMPORARY_LOCK',
    };
    service.blockProduct(dataToSend).subscribe((data: any) => {
      expect(data).toBe(blockCreditCardMock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.blockprods,
    );
    expect(req.request.method).toBe('POST');
    req.flush(blockCreditCardMock);
  });
});
