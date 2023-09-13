import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentsPSEMock } from '../../../../../../test-helpers/mocks/data/payment.mock';

import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { RemoveValuePipe } from '../../../../core/pipes/remove-value.pipe';
import { CreateDateModule } from '../../../create-date/create-date.module';
import { PaymentHistoryRowComponent } from './payment-history-row.component';

describe('PaymentHistoryRowComponent', () => {
  let component: PaymentHistoryRowComponent;
  let fixture: ComponentFixture<PaymentHistoryRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, CreateDateModule],
      declarations: [PaymentHistoryRowComponent, RemoveValuePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentHistoryRowComponent);
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
