import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveValuePipe } from '@core/pipes/remove-value.pipe';
import { PaymentModelMock } from '../../../../../../test-helpers/mocks/models/payment.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import {
  NORMAL_PAYMENT,
  SERVICE_PUBLIC,
} from '../../../../core/constants/global';
import { PaymentModel } from '../../payment.model';
import { StepConfirmationComponent } from './step-confirmation.component';

describe('StepConfirmationComponent', () => {
  let component: StepConfirmationComponent;
  let fixture: ComponentFixture<StepConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StepConfirmationComponent, RemoveValuePipe],
      imports: [TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: PaymentModel,
          useClass: PaymentModelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    spyOn(component, 'submitData').and.callFake(() => {});
    expect(component).toBeTruthy();
  });

  it('test Properties', () => {
    spyOnProperty(component, 'name$', 'get').and.returnValue('');
    spyOnProperty(component, 'isAnotherOwner$', 'get').and.returnValue(false);
    spyOnProperty(component, 'isBillPaymentName$', 'get').and.returnValue(
      'foo',
    );
    spyOnProperty(component, 'isBillPaymentAmount$', 'get').and.returnValue('');
    spyOnProperty(component, 'isBillPaymentNickName$', 'get').and.returnValue(
      '',
    );
    spyOnProperty(component, 'paymentType', 'get').and.returnValue('');
    spyOnProperty(component, 'servicepublic', 'get').and.returnValue(
      SERVICE_PUBLIC,
    );
    spyOnProperty(component, 'paymentnormal', 'get').and.returnValue(
      NORMAL_PAYMENT,
    );
  });
});
