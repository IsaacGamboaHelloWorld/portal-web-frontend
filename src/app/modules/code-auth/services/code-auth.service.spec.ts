import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IAnswerAllowedCodeAuth } from '../entities/code-auth';
import { CodeAuthService } from './code-auth.service';

describe('CodeAuthService', () => {
  let service: CodeAuthService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CodeAuthService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    service = TestBed.get(CodeAuthService);
  });

  it('API bia POST AuthAllowed', () => {
    const answer: IAnswerAllowedCodeAuth = {
      enrollmentSecureData: null,
      success: false,
      userAlreadyHasEnhanced: false,
      errorMessage:
        'Opción disponible para usuarios con tarjeta débito. Solícita una en nuestras oficinas.',
    };
    service.codeAuthAllowed().subscribe((posts) => {
      expect(posts).toEqual(answer);
    });
  });

  it('should be created', () => {
    const serviceCodeAuth: CodeAuthService = TestBed.get(CodeAuthService);
    expect(serviceCodeAuth).toBeTruthy();
  });
});
