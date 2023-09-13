import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RegisterAffiliationService } from './register-affiliation.service';

describe('RegisterAffiliationService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegisterAffiliationService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }),
  );
  it('should be created', () => {
    const service: RegisterAffiliationService = TestBed.get(
      RegisterAffiliationService,
    );
    expect(service).toBeTruthy();
  });
});
