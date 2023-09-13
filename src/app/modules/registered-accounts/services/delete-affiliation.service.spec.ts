import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { DeleteAffiliationService } from './delete-affiliation.service';

describe('DeleteAffiliationService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DeleteAffiliationService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }),
  );

  it('should be created', () => {
    const service: DeleteAffiliationService = TestBed.get(
      DeleteAffiliationService,
    );
    expect(service).toBeTruthy();
  });
});
