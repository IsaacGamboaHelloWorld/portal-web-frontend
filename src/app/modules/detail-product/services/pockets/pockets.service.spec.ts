import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import { IUserPockets } from '@app/core/interfaces/pockets/userPockets';
import { environment } from '@environment';
import { PocketsAllSuccessMock } from '@root/test-helpers/mocks/data/pockets.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { PocketsService } from './pockets.service';

describe('PocketsService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [PocketsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: PocketsService = TestBed.get(PocketsService);
    expect(service).toBeTruthy();
  });

  it('should be returned Observable<IUserPockets>', () => {
    const service: PocketsService = TestBed.get(PocketsService);

    service.pockets().subscribe((data: any) => {
      expect(data.currentPocketsByProduct.length).toBe(6);
      expect(data).toEqual(PocketsAllSuccessMock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.pockets.home,
    );
    expect(req.request.method).toBe('POST');
    req.flush(PocketsAllSuccessMock);
  });
});
