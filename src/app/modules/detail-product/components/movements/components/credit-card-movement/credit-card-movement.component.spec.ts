import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveValuePipe } from '@core/pipes/remove-value.pipe';
import { CcMovementPipe } from '@modules/detail-product/pipes/search-text-credit-card-movement/cc-movement.pipe';
import { TestingModule } from '../../../../../../../../test-helpers/testing.module';
import { CreditCardMovementComponent } from './credit-card-movement.component';

describe('CreditCardMovementComponent', () => {
  let component: CreditCardMovementComponent;
  let fixture: ComponentFixture<CreditCardMovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [
        CreditCardMovementComponent,
        CcMovementPipe,
        RemoveValuePipe,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditCardMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
