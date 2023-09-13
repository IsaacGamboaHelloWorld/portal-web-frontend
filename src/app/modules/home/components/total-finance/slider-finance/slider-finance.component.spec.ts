import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestingModule } from '../../../../../../../test-helpers/testing.module';
import { SliderFinanceComponent } from './slider-finance.component';

describe('SliderFinanceComponent', () => {
  let component: SliderFinanceComponent;
  let fixture: ComponentFixture<SliderFinanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [SliderFinanceComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderFinanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
