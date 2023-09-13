import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { CreditCardHiddenPipe } from '../../../../core/pipes/credit-card-hidden/credit-card-hidden.pipe';
import { CreditCardMaskPipe } from '../../../../core/pipes/credit-card-mask/credit-card-mask.pipe';
import { LoanPaymentInfoComponent } from './loan-payment-info.component';

xdescribe('LoanPaymentInfoComponent', () => {
  let component: LoanPaymentInfoComponent;
  let fixture: ComponentFixture<LoanPaymentInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [
        LoanPaymentInfoComponent,
        CreditCardHiddenPipe,
        CreditCardMaskPipe,
      ],
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(LoanPaymentInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
