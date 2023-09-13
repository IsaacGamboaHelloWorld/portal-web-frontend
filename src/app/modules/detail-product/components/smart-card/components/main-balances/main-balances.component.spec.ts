import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDepositeAccountDetailsMock } from '../../../../../../../../test-helpers/mocks/data/products-all.mock';
import { TestingModule } from '../../../../../../../../test-helpers/testing.module';
import { MainBalancesComponent } from './main-balances.component';

describe('MainBalancesComponent', () => {
  let component: MainBalancesComponent;
  let fixture: ComponentFixture<MainBalancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [MainBalancesComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainBalancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('neededToPay should be false', () => {
    component.info = ProductDepositeAccountDetailsMock.CREDIT_CARD[0] as any;
    const result = component.neededToPay;
    expect(result).toBeFalsy();
  });

  it('typeProduct should be return value', () => {
    component.info = ProductDepositeAccountDetailsMock.CREDIT_CARD[0] as any;
    const result = component.typeProduct;
    expect(result).toEqual('CREDIT_CARD');
  });

  it('hasOverDraftDays should be true', () => {
    component.info = ProductDepositeAccountDetailsMock.CREDIT_CARD[1] as any;
    const result = component.hasOverDraftDays;
    expect(result).toBeTruthy();
  });

  it('hasOverDraftDays should be false', () => {
    component.info = ProductDepositeAccountDetailsMock.CREDIT_CARD[0] as any;
    const result = component.hasOverDraftDays;
    expect(result).toBeFalsy();
  });
});
