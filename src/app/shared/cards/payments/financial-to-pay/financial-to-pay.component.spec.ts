import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveValuePipe } from '@core/pipes/remove-value.pipe';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { CreditCardHiddenPipe } from '../../../../core/pipes/credit-card-hidden/credit-card-hidden.pipe';
import { CreditCardMaskPipe } from '../../../../core/pipes/credit-card-mask/credit-card-mask.pipe';
import { TypeCreditCardPipe } from '../../../../core/pipes/type-credit-card/type-credit-card.pipe';
import { FinancialToPayComponent } from './financial-to-pay.component';

describe('FinancialToPayComponent', () => {
  let component: FinancialToPayComponent;
  let fixture: ComponentFixture<FinancialToPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [
        FinancialToPayComponent,
        RemoveValuePipe,
        CreditCardMaskPipe,
        CreditCardHiddenPipe,
        TypeCreditCardPipe,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialToPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
