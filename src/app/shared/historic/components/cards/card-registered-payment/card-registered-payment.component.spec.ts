import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RemoveValuePipe } from '@app/core/pipes/remove-value.pipe';
import { CreateDatePipe } from '@app/shared/create-date/create-date.pipe';
import { TestingModule } from '../../../../../../../test-helpers/testing.module';
import { PaymentsPSEMock } from './../../../../../../../test-helpers/mocks/data/payment.mock';

import { CardRegisteredPaymentComponent } from './card-registered-payment.component';

describe('CardRegisteredPaymentComponent', () => {
  let component: CardRegisteredPaymentComponent;
  let fixture: ComponentFixture<CardRegisteredPaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [
        CardRegisteredPaymentComponent,
        CreateDatePipe,
        RemoveValuePipe,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardRegisteredPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('hasData', () => {
    component.data = undefined;
    const result = component.hasData;
    expect(result).toBeUndefined();
  });

  it('isSuccess', () => {
    component.data = PaymentsPSEMock.data[0] as any;
    const result = component.isSuccess;
    expect(result).toBeTruthy();
  });
});
