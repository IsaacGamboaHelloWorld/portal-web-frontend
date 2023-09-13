import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SecurityService } from '@app/modules/security/services/security.service';
import { Security } from '@app/modules/security/utils/security';
import { ValidatePingService } from 'app/core/services/validate-ping.service';
import { TestingModule } from '../../../../test-helpers/testing.module';

describe('ValidateSessionService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      providers: [ValidatePingService, SecurityService, Security],
    }),
  );

  it('should be created', () => {
    const service: ValidatePingService = TestBed.get(ValidatePingService);
    expect(service).toBeTruthy();
  });
});
