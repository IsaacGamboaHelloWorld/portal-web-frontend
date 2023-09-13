import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { PaymentModelMock } from '../../../../test-helpers/mocks/models/payment.model.mock';
import { TestingModule } from '../../../../test-helpers/testing.module';
import { PaymentModel } from './payment.model';
import { PaymentsContainer } from './payments.container';

describe('TransferToAccountContainer', () => {
  let component: PaymentsContainer;
  let fixture: ComponentFixture<PaymentsContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, ReactiveFormsModule],
      declarations: [PaymentsContainer],
      providers: [
        {
          provide: PaymentModel,
          useClass: PaymentModelMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentsContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
