import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IAnswerActivateTc } from '../entities/activate-tc';
import { ActivateTcService } from './activate-tc.service';

describe('ActivateTcService', () => {
  let service: ActivateTcService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ActivateTcService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    service = TestBed.get(ActivateTcService);
  });

  it('be able to retrieve posts from the API bia POST', () => {
    const send = '1234567890';
    const answer: IAnswerActivateTc = {
      approvalId: '0',
      errorMessage: 'Usted no cuenta con tarjetas disponibles para activar',
      specificErrorMessage: 'EMBOSSER RECORD NOT FOUND',
      details: {
        companyId: 'BANCO_POPULAR',
        accountId: '1234567890',
        accountType: 'CREDIT_CARD',
      },
      success: false,
    };
    service.creditCard(send).subscribe((posts) => {
      expect(posts).toEqual(answer);
    });
  });

  it('should be created', () => {
    const serviceCode: ActivateTcService = TestBed.get(ActivateTcService);
    expect(serviceCode).toBeTruthy();
  });
});
