import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveValuePipe } from '@core/pipes/remove-value.pipe';
import { SearchTextMovementPipe } from '@modules/detail-product/pipes/search-text-movement/search-text-movement.pipe';
import { TestingModule } from '../../../../../../../../test-helpers/testing.module';
import { CurrentMovementComponent } from './current-movement.component';

describe('CurrentMovementComponent', () => {
  let component: CurrentMovementComponent;
  let fixture: ComponentFixture<CurrentMovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [
        CurrentMovementComponent,
        SearchTextMovementPipe,
        RemoveValuePipe,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('showIncome', () => {
    const result = component.showIncome('10', '1');
    expect(result).toBeTruthy();
  });

  it('showVal should return true', () => {
    const result = component.showVal(10);
    expect(result).toBeTruthy();
  });

  it('showVal should return false', () => {
    const result = component.showVal(-10);
    expect(result).toBeFalsy();
  });
});
