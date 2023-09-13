import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { OperatorsNameService } from './operators-name.service';

describe('OperatorsNameService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OperatorsNameService],
    }),
  );

  it('should be created', () => {
    const service: OperatorsNameService = TestBed.get(OperatorsNameService);
    expect(service).toBeTruthy();
  });
});
