import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TYPE_ACCOUNTS } from '@app/core/constants/types_account';
import { ProductDepositeAccountDetailsMock } from '../../../../../../../../test-helpers/mocks/data/products-all.mock';

import { TestingModule } from '../../../../../../../../test-helpers/testing.module';
import { RemoveValuePipe } from '../../../../../../core/pipes/remove-value.pipe';
import { ManipulateDomService } from '../../../../../../core/services/manipulate-dom/manipulate-dom.service';
import { SecondaryBalancesComponent } from './secondary-balances.component';

describe('SecondaryBalancesComponent', () => {
  let component: SecondaryBalancesComponent;
  let fixture: ComponentFixture<SecondaryBalancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SecondaryBalancesComponent, RemoveValuePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      imports: [TestingModule],
      providers: [ManipulateDomService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecondaryBalancesComponent);
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

  it('T_DA', () => {
    const result = component.T_DA;
    expect(result).toEqual(TYPE_ACCOUNTS.DEPOSIT_ACCOUNT);
  });

  it('T_CA', () => {
    const result = component.T_CA;
    expect(result).toEqual(TYPE_ACCOUNTS.CURRENT_ACCOUNT);
  });

  it('T_CC', () => {
    const result = component.T_CC;
    expect(result).toEqual(TYPE_ACCOUNTS.CREDIT_CARD);
  });

  it('typeProduct', () => {
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

  it('hasBalances', () => {
    component.info = ProductDepositeAccountDetailsMock.CREDIT_CARD[0] as any;
    const result = component.hasBalances;
    expect(result).toBeTruthy();
  });

  it('purchasesToApply should return 100', () => {
    component.info = ProductDepositeAccountDetailsMock.CREDIT_CARD[1] as any;
    const result = component.purchasesToApply;
    expect(result).toEqual(100);
  });

  it('purchasesToApply should return 0', () => {
    component.info = ProductDepositeAccountDetailsMock.CREDIT_CARD[0] as any;
    const result = component.purchasesToApply;
    expect(result).toEqual(0);
  });
  it('paymentsToApply should return 100', () => {
    component.info = ProductDepositeAccountDetailsMock.CREDIT_CARD[1] as any;
    const result = component.paymentsToApply;
    expect(result).toEqual(100);
  });

  it('paymentsToApply should return 0', () => {
    component.info = ProductDepositeAccountDetailsMock.CREDIT_CARD[0] as any;
    const result = component.paymentsToApply;
    expect(result).toEqual(0);
  });

  it('havePockets', () => {
    component.info = ProductDepositeAccountDetailsMock.CREDIT_CARD[0] as any;
    const result = component.havePockets;
    expect(result).toBeFalsy();
  });

  it('fetchPockets', () => {
    component.callGetPockets.subscribe((data) => {
      expect(data).toEqual(undefined);
    });
    component.fetchPockets();
  });

  it('openAditional', () => {
    component.showAdditionalData = true;
    component.openAditional();
    expect(component.showAdditionalData).toBeFalsy();
  });

  it('openTooltip', () => {
    const tooltip = 'tooltip';
    const dom = TestBed.get(ManipulateDomService);
    const spy = spyOn(dom, 'addClass');

    component.openTooltip(tooltip);

    expect(spy).toHaveBeenCalledWith(tooltip, 'on');
  });

  it('closeTip', () => {
    const tooltip = 'tooltip';
    const dom = TestBed.get(ManipulateDomService);
    const spy = spyOn(dom, 'removeClass');

    component.closeTip(tooltip);

    expect(spy).toHaveBeenCalledWith(tooltip, 'on');
  });
});
