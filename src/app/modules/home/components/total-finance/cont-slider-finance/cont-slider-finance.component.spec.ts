import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ContSliderFinanceComponent } from './cont-slider-finance.component';

import { TestingModule } from '../../../../../../../test-helpers/testing.module';

describe('ContSliderFinanceComponent', () => {
  let component: ContSliderFinanceComponent;
  let fixture: ComponentFixture<ContSliderFinanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      declarations: [ContSliderFinanceComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContSliderFinanceComponent);
    component = fixture.componentInstance;
    component.items = [];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should detect changes', () => {
    fixture.detectChanges();
    expect(component.showSlider).toBe(true);
  });
});
