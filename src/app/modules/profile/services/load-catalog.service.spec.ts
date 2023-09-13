import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { LoadCatalogService } from './load-catalog.service';

describe('LoadCatalogService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LoadCatalogService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }),
  );
  it('should be created', () => {
    const service: LoadCatalogService = TestBed.get(LoadCatalogService);
    expect(service).toBeTruthy();
  });
});
