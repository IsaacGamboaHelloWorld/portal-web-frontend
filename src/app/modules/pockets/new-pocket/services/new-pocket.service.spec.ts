import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NewPocketService } from './new-pocket.service';

describe('NewPocketService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NewPocketService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }),
  );

  it('should be created', () => {
    const service: NewPocketService = TestBed.get(NewPocketService);
    expect(service).toBeTruthy();
  });
});
