import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreditCardHiddenPipe } from '@app/core/pipes/credit-card-hidden/credit-card-hidden.pipe';
import { CreditCardMaskPipe } from '@app/core/pipes/credit-card-mask/credit-card-mask.pipe';
import { RemoveValuePipe } from '@app/core/pipes/remove-value.pipe';
import { TypeCreditCardPipe } from '@app/core/pipes/type-credit-card/type-credit-card.pipe';
import { unusualOperationsQuerySuccess } from '../../../../../../test-helpers/mocks/data/unusual-operations.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';

import { UnsualOperationProductComponent } from './unsual-operation-product.component';

describe('UnsualOperationProductComponent', () => {
  let component: UnsualOperationProductComponent;
  let fixture: ComponentFixture<UnsualOperationProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [
        UnsualOperationProductComponent,
        TypeCreditCardPipe,
        RemoveValuePipe,
        CreditCardMaskPipe,
        CreditCardHiddenPipe,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsualOperationProductComponent);
    component = fixture.componentInstance;
    component.product = unusualOperationsQuerySuccess
      .TransactionsByCard[0] as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
