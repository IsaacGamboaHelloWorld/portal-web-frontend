import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { EditPocketService } from './edit-pocket.service';

describe('EditPocketService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EditPocketService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }),
  );

  it('should be created', () => {
    const service: EditPocketService = TestBed.get(EditPocketService);
    expect(service).toBeTruthy();
  });
});
