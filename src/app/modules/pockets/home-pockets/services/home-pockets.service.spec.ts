import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomePocketsService } from './home-pockets.service';

describe('HomePocketsService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HomePocketsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }),
  );

  it('should be created', () => {
    const service: HomePocketsService = TestBed.get(HomePocketsService);
    expect(service).toBeTruthy();
  });
});
