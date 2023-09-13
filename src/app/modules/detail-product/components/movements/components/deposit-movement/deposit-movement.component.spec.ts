import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveValuePipe } from '@core/pipes/remove-value.pipe';
import { SearchTextMovementPipe } from '@modules/detail-product/pipes/search-text-movement/search-text-movement.pipe';
import { TestingModule } from '../../../../../../../../test-helpers/testing.module';
import { DepositMovementComponent } from './deposit-movement.component';

describe('DepositMovementComponent', () => {
  let component: DepositMovementComponent;
  let fixture: ComponentFixture<DepositMovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [
        DepositMovementComponent,
        SearchTextMovementPipe,
        RemoveValuePipe,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
