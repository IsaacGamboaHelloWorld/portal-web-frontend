import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { OtpAthModelMock } from '@root/test-helpers/mocks/models/otp-ath.model.mock';
import { TestingModule } from '@root/test-helpers/testing.module';

import { OtpAthWrapperComponent } from './otp-ath-wrapper.component';
import { OtpAthModel } from './store';

describe('OtpAthWrapperComponent', () => {
  let component: OtpAthWrapperComponent;
  let fixture: ComponentFixture<OtpAthWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [OtpAthWrapperComponent],
      providers: [
        ManipulateDomService,
        {
          provide: OtpAthModel,
          useClass: OtpAthModelMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtpAthWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
