import { TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestingModule } from '../../../../../test-helpers/testing.module';
import { CategoriesService } from './categories.service';

describe('BanksService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [CategoriesService],
    }),
  );

  it('should be created', () => {
    const service: CategoriesService = TestBed.get(CategoriesService);
    expect(service).toBeTruthy();
  });
});
