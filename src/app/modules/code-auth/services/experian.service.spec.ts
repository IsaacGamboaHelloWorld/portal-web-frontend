import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ExperianService } from './experian.service';

describe('ExperianService', () => {
  let service: ExperianService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExperianService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    service = TestBed.get(ExperianService);
  });
  it('should be created', () => {
    const experianService: ExperianService = TestBed.get(ExperianService);
    expect(experianService).toBeTruthy();
  });
});
