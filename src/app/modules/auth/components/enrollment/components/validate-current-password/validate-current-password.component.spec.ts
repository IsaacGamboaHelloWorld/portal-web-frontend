import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { TealiumUtagService } from '@app/tealium/utag.service';
import { AuthModelMock } from '../../../../../../../../test-helpers/mocks/models/auth.model.mock';
import { TestingModule } from '../../../../../../../../test-helpers/testing.module';
import { AuthModel } from '../../../../store/model/auth.model';
import { ValidateCurrentPasswordComponent } from './validate-current-password.component';

describe('ValidateCurrentPasswordComponent', () => {
  let component: ValidateCurrentPasswordComponent;
  let fixture: ComponentFixture<ValidateCurrentPasswordComponent>;

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
      declarations: [ValidateCurrentPasswordComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidateCurrentPasswordComponent);
    component = fixture.componentInstance;
    component.userEnrollmentFlowInformation = { processId: '12343' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
