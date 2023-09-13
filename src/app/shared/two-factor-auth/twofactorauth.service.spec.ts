import { HttpResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { Action } from './models/action-code';
import { Challenge } from './models/challenge-type';
import { TwoFactorAuthService } from './twofactorauth.service';

describe('TwofactorauthService', () => {
  const setup = (): {
    service: TwoFactorAuthService;
    httpTestingController: HttpTestingController;
  } => {
    const service = TestBed.get(TwoFactorAuthService);
    service.processResponse(
      new HttpResponse({
        body: {
          action: Action.CHALLENGE,
          challengeInformation: {
            challenge: Challenge.TOTP,
            parameters: {
              length: 6,
            },
            resend: {
              enabled: false,
            },
          },
          success: true,
          transactionId: '1234567890',
          url: '/api/two-factor-auth/continue',
        },
      }),
    );
    service.setBaseUrl('http://localhost:3000');
    const httpTestingController = TestBed.get(HttpTestingController);
    return { service, httpTestingController };
  };

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [TwoFactorAuthService, ManipulateDomService],
      imports: [HttpClientTestingModule],
    }),
  );

  it('should continue', () => {
    const { service, httpTestingController } = setup();
    const url = 'http://localhost:3000/api/two-factor-auth/continue';
    service.validateChallenge({ code: '123456' }).subscribe();
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('POST');
  });

  it('should to cancel the challenge', () => {
    const { service, httpTestingController } = setup();
    const url = 'http://localhost:3000/api/two-factor-auth/continue';
    service.cancelChallenge();
    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('POST');
  });

  afterEach(() => {
    const { httpTestingController } = setup();
    httpTestingController.verify();
  });
});
