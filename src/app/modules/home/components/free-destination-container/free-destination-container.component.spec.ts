import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { FreeDestinationAllMock } from './../../../../../../test-helpers/mocks/data/freeDestinations.mock';

import { FreeDestinationContainerComponent } from './free-destination-container.component';

describe('FreeDestinationContainerComponent', () => {
  let component: FreeDestinationContainerComponent;
  let fixture: ComponentFixture<FreeDestinationContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [FreeDestinationContainerComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeDestinationContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('trackByFn', () => {
    const product = FreeDestinationAllMock.freeDestinationCredits[0] as any;
    const result = component.trackByFn(0, product);
    expect(result).toEqual('112200305');
  });

  it('hasProducts with product', () => {
    component.products = FreeDestinationAllMock.freeDestinationCredits as any;
    const result = component.hasProducts;
    expect(result).toBeTruthy();
  });

  it('quantityProducts with products', () => {
    component.products = FreeDestinationAllMock.freeDestinationCredits as any;
    const result = component.quantityProducts;
    expect(result).toEqual(1);
  });

  it('quantityProducts without products', () => {
    component.products = null;
    const result = component.quantityProducts;
    expect(result).toEqual(0);
  });
});
