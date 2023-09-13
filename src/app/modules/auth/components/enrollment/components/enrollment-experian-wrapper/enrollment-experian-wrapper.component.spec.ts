import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { AuthModel } from '@app/modules/auth/store/model/auth.model';
import { TealiumUtagService } from '@app/tealium/utag.service';
import { AuthModelMock } from '@root/test-helpers/mocks/models/auth.model.mock';
import { TestingModule } from '@root/test-helpers/testing.module';
import { EnrollmentExperianWrapperComponent } from './enrollment-experian-wrapper.component';

describe('EnrollmentExperianWrapperComponent', () => {
  let component: EnrollmentExperianWrapperComponent;
  let fixture: ComponentFixture<EnrollmentExperianWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [
        {
          provide: AuthModel,
          useClass: AuthModelMock,
        },
        FormBuilder,
        TealiumUtagService,
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      declarations: [EnrollmentExperianWrapperComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentExperianWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
