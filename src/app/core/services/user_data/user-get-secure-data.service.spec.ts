import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestingModule } from '../../../../../test-helpers/testing.module';
import { UserSecureDataService } from './user-get-secure-data.service';

describe('UserSecureDataService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [UserSecureDataService],
    }),
  );

  it('should be created', () => {
    const service: UserSecureDataService = TestBed.get(UserSecureDataService);
    expect(service).toBeTruthy();
  });
});
