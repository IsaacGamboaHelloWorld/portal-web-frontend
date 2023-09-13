import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { UpdateProfileService } from './update-profile.service';

describe('UpdateProfileService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UpdateProfileService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }),
  );
  it('should be created', () => {
    const service: UpdateProfileService = TestBed.get(UpdateProfileService);
    expect(service).toBeTruthy();
  });
});
