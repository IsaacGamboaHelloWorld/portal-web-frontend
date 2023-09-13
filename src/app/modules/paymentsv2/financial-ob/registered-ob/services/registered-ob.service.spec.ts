import { TestBed } from '@angular/core/testing';

import { RegisteredObService } from './registered-ob.service';

describe('RegisteredObService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisteredObService = TestBed.get(RegisteredObService);
    expect(service).toBeTruthy();
  });
});
