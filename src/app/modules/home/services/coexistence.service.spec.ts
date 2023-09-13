import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { getTestBed, TestBed } from '@angular/core/testing';
import { SecurityService } from '@app/modules/security/services/security.service';
import { Security } from '@app/modules/security/utils/security';
import { environment } from '@environment';
import { CoexistenceService } from 'app/modules/home/services/coexistence.service';
import { TestingModule } from '../../../../../test-helpers/testing.module';

describe('CoexistenceService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: CoexistenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [CoexistenceService, SecurityService, Security],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(CoexistenceService);
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

  it('doGoOldPortal', () => {
    const mock = {};
    service.doGoOldPortal().subscribe((result: any) => {
      expect(result).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.coexistence,
    );
    expect(req.request.method).toBe('GET');
    req.flush(mock);
  });
});
