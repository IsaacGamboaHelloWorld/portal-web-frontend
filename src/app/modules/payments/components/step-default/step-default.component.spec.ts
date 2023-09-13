import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { PaymentModelMock } from '../../../../../../test-helpers/mocks/models/payment.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { PaymentModel } from '../../payment.model';
import { StepDefaultComponent } from './step-default.component';

describe('StepDefaultComponent', () => {
  let component: StepDefaultComponent;
  let fixture: ComponentFixture<StepDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StepDefaultComponent],
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
    fixture = TestBed.createComponent(StepDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
