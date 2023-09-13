import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationModel } from '@app/application.model';
import { Navigate } from '@app/core/constants/navigate';
import { CreditCardHiddenPipe } from '@app/core/pipes/credit-card-hidden/credit-card-hidden.pipe';
import { CreditCardMaskPipe } from '@core/pipes/credit-card-mask/credit-card-mask.pipe';
import { RemoveValuePipe } from '@core/pipes/remove-value.pipe';
import { TypeCreditCardPipe } from '@core/pipes/type-credit-card/type-credit-card.pipe';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { SecurityService } from '@modules/security/services/security.service';
import { Security } from '@modules/security/utils/security';
import { ProductDepositeAccountDetailsMock } from '../../../../../../test-helpers/mocks/data/products-all.mock';
import { ApplicationModelMock } from '../../../../../../test-helpers/mocks/models/application.model.mock';
import { HomeModelMock } from '../../../../../../test-helpers/mocks/models/home.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { HomeModel } from '../../home.model';
import { ProductCreditCardComponent } from './product-credit-card.component';

describe('ProductCurrentAccountComponent', () => {
  let component: ProductCreditCardComponent;
  let fixture: ComponentFixture<ProductCreditCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      declarations: [
        ProductCreditCardComponent,
        TypeCreditCardPipe,
        RemoveValuePipe,
        CreditCardMaskPipe,
        CreditCardHiddenPipe,
      ],
      providers: [
        ManipulateDomService,
        SecurityService,
        Security,
        {
          provide: ApplicationModel,
          useClass: ApplicationModelMock,
        },
        {
          provide: HomeModel,
          useClass: HomeModelMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    window['rsaFunc'] = () => '12345678901234567890';
    fixture = TestBed.createComponent(ProductCreditCardComponent);
    component = fixture.componentInstance;
    fixture.isStable();
  });

  it('neededToPay should be false', () => {
    component.product = ProductDepositeAccountDetailsMock.CREDIT_CARD[0] as any;
    const result = component.neededToPay;
    expect(result).toBeFalsy();
  });

  it('hasProduct should return true', () => {
    component.product = ProductDepositeAccountDetailsMock.CREDIT_CARD[0] as any;
    const result = component.hasProduct;
    expect(result).toBeTruthy();
  });

  it('hasNameBank', () => {
    const name = 'Banco Popular';
    component.nameBank = name;
    const result = component.hasNameBank;
    expect(result).toBeTruthy();
  });

  it('redirect', () => {
    const accountIdentifier = '112200305';
    const typeAccount = 'DEPOSIT_ACCOUNT';
    const encrypt = 'krleklrkelrkelkslkds';

    const security = TestBed.get(SecurityService);
    const spySec = spyOn(security, 'encryptAesGcm').and.returnValue(
      Promise.resolve(encrypt),
    );
    component.redirect(typeAccount, accountIdentifier);

    expect(spySec).toHaveBeenCalledWith(accountIdentifier);
  });

  it('navigate', () => {
    const result = component.navigate;
    expect(result).toEqual(Navigate);
  });

  it('debt should return 0', () => {
    component.product = ProductDepositeAccountDetailsMock.CREDIT_CARD[0] as any;
    const result = component.debt;
    expect(result).toEqual(0);
  });

  it('debt should return 100', () => {
    component.product = ProductDepositeAccountDetailsMock.CREDIT_CARD[1] as any;
    const result = component.debt;
    expect(result).toEqual(100);
  });

  it('payCreditCard', () => {
    const product = ProductDepositeAccountDetailsMock.CREDIT_CARD[1] as any;
    component.product = product;
    component.payCreditCard();
    component.clickBox.subscribe((data: any) => {
      expect(data).toEqual({
        product,
        url: Navigate.paymentsv2payloan,
      });
    });
  });
});
