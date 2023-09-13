import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentModelMock } from '../../../../../../test-helpers/mocks/models/payment.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { PaymentModel } from '../../payment.model';
import { StepAlertComponent } from './step-alert.component';

describe('StepAlertComponent', () => {
  let component: StepAlertComponent;
  let fixture: ComponentFixture<StepAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StepAlertComponent],
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
    fixture = TestBed.createComponent(StepAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.closed();
    component.play();
    expect(component).toBeTruthy();
  });
});
