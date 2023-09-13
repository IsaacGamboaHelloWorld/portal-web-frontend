import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { Navigate } from '@app/core/constants/navigate';
import { RemoveValuePipe } from '@app/core/pipes/remove-value.pipe';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { ProductToPlusComponent } from './product-to-plus.component';

describe('ProductToPlusComponent', () => {
  let component: ProductToPlusComponent;
  let fixture: ComponentFixture<ProductToPlusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [ProductToPlusComponent, RemoveValuePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductToPlusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('goToTuPlus', () => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');
    component.goToTuPlus();
    expect(spy).toHaveBeenCalledWith([Navigate.your_plus]);
  });
  it('redeem', () => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');
    component.redeem();
    expect(spy).toHaveBeenCalledWith([Navigate.your_plus]);
  });

  it('hasProduct', () => {
    const result = component.hasProduct;
    expect(result).toBeFalsy();
  });

  it('navigate', () => {
    const result = component.navigate;
    expect(result).toEqual(Navigate);
  });
});
