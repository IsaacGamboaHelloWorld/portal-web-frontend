import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RemoveValuePipe } from '@app/core/pipes/remove-value.pipe';
import { OtpAthModel } from '@app/shared/otp-ath-wrapper/store';
import { LimitManagementModelMock } from '@root/test-helpers/mocks/models/limit-management.model.mock';
import { OtpAthModelMock } from '@root/test-helpers/mocks/models/otp-ath.model.mock';
import { TestingModule } from '@root/test-helpers/testing.module';
import { LimitManagementModel } from '../../store';

import { HomeComponent } from './home.component';

describe('HomeComponent in LimitManagement', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [HomeComponent, RemoveValuePipe],
      providers: [
        {
          provide: LimitManagementModel,
          useClass: LimitManagementModelMock,
        },
        {
          provide: OtpAthModel,
          useClass: OtpAthModelMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
