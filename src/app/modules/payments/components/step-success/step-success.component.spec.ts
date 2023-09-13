import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RemoveValuePipe } from '@core/pipes/remove-value.pipe';
import { PaymentModelMock } from '../../../../../../test-helpers/mocks/models/payment.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { PaymentModel } from '../../payment.model';
import { StepSuccessComponent } from './step-success.component';

xdescribe('StepSuccessComponent', () => {
  let component: StepSuccessComponent;
  let fixture: ComponentFixture<StepSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StepSuccessComponent, RemoveValuePipe],
      imports: [TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: PaymentModel,
          useValue: PaymentModelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepSuccessComponent);
    component = fixture.componentInstance;
    spyOnProperty(component, 'hasPaymentData$', 'get').and.returnValue(false);
    spyOnProperty(component, 'hasPaymentBillData$', 'get').and.returnValue(
      false,
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
