import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditCardHiddenPipe } from '@core/pipes/credit-card-hidden/credit-card-hidden.pipe';
import { CreditCardMaskPipe } from '@core/pipes/credit-card-mask/credit-card-mask.pipe';
import { LoanToAdminComponent } from './loan-to-admin.component';

xdescribe('ServiceToAdminComponent', () => {
  let component: LoanToAdminComponent;
  let fixture: ComponentFixture<LoanToAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoanToAdminComponent,
        CreditCardHiddenPipe,
        CreditCardMaskPipe,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanToAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
