import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestingModule } from '../../../../../test-helpers/testing.module';
import { BanksService } from './banks.service';

describe('BanksService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [BanksService],
    }),
  );

  it('should be created', () => {
    const service: BanksService = TestBed.get(BanksService);
    expect(service).toBeTruthy();
  });
});
