import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { getTestBed, TestBed } from '@angular/core/testing';
import { environment } from '@environment';
import { ToptService } from './topt.service';

describe('ToptService', () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let service: ToptService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ToptService],
    });

    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    service = TestBed.get(ToptService);
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

  xit('generate', () => {
    const mock = {};
    service.generate().subscribe((result: any) => {
      expect(result).toBe(mock);
    });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.totp.generate,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });

  xit('register', () => {
    const mock = {};
    service
      .register(
        'JMC-CC19198659',
        '4ffbe98d-c7f2-4892-87ab-8a2b7c19249c',
        '293681',
      )
      .subscribe((result: any) => {
        expect(result).toBe(mock);
      });

    const req = httpMock.expectOne(
      environment.api.base + environment.api.services.totp.register,
    );
    expect(req.request.method).toBe('POST');
    req.flush(mock);
  });
});
