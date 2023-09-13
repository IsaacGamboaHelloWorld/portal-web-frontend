import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AlertComponent } from '@app/modules/auth-old/enrollment/components/alert/alert.component';
import { ValidateCodeComponent } from '@app/modules/auth-old/enrollment/components/validate-code/validate-code.component';
import { ValidateCurrentPasswordComponent } from '@app/modules/auth-old/enrollment/components/validate-current-password/validate-current-password.component';
import { ValidateProductInformationComponent } from '@app/modules/auth-old/enrollment/components/validate-product-information/validate-product-information.component';
import { AuthModelMock } from '../../../../../test-helpers/mocks/models/auth.model.mock';
import { TestingModule } from '../../../../../test-helpers/testing.module';
import { AuthModelOld } from '../auth.model';
import { EnrollmentComponent } from './enrollment.component';

describe('EnrollmentComponent', () => {
  let component: EnrollmentComponent;
  let fixture: ComponentFixture<EnrollmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [
        {
          provide: AuthModelOld,
          useClass: AuthModelMock,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
      declarations: [
        EnrollmentComponent,
        AlertComponent,
        ValidateCodeComponent,
        ValidateProductInformationComponent,
        ValidateCurrentPasswordComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
