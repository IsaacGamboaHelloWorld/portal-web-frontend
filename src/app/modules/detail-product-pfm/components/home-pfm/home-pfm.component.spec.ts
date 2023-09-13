import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ChangeDetectorRef,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { SecurityService } from '@app/modules/security/services/security.service';
import { Security } from '@app/modules/security/utils/security';
import { getDatesPfm } from '@app/shared/helpers/datePFM.helper';
import { DetailProductPfmMock } from '../../../../../../test-helpers/mocks/models/detail-product-pfm.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { DetailProductPFMModel } from '../../detail-product-pfm.model';

import { HomePFMComponent } from './home-pfm.component';

xdescribe('HomePFMComponent', () => {
  let component: HomePFMComponent;
  let fixture: ComponentFixture<HomePFMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, HttpClientTestingModule],
      declarations: [HomePFMComponent],
      providers: [
        ManipulateDomService,
        SecurityService,
        Security,
        {
          provide: DetailProductPFMModel,
          useClass: DetailProductPfmMock,
        },
        ChangeDetectorRef,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    window['rsaFunc'] = () => '12345678901234567890';
    fixture = TestBed.createComponent(HomePFMComponent);
    component = fixture.componentInstance;
    (component as any).account = {
      type: 'DEPOSIT_ACCOUNT',
      id: '500800471302',
    };
    (component as any).months = getDatesPfm();
    component.monthName = 'Ene';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('_changeRequestPFM', () => {
    (component as any).account = {
      type: 'DEPOSIT_ACCOUNT',
      id: '500800471302',
    };

    const date = '2021-09-20';

    const model = TestBed.get(DetailProductPFMModel);
    const spyReset = spyOn(model, 'pfmProductReset');
    const spyFetch = spyOn(model, 'fetchProductPfm');
    spyOn(component as any, '_setMonthName');

    (component as any)._changeRequestPFM(date);

    expect(spyReset).toHaveBeenCalled();
    expect(spyFetch).toHaveBeenCalledWith('09', '2021');
  });

  xit('_mapOptionsProduct', () => {
    const account = {
      type: 'deposit_account',
      id: '500800471302',
    };

    const result = {
      label: 'PFM_PRODUCT_DETAIL.PRODUCT_TYPES.DEPOSIT_ACCOUNT 1302',
      value: account,
    };

    (component as any).account = account;

    (component as any)._mapOptionsProduct();

    expect(JSON.stringify(component.optionAccounts)).toEqual(
      JSON.stringify([result]),
    );
  });

  xit('pfmProductData$', () => {
    const model = TestBed.get(DetailProductPFMModel);
    const result = component.pfmProductData$;
    expect(result).toEqual(model.pfmProductData$);
  });

  xit('_findProduct', () => {
    const data = {
      savings: {
        beforeSavings: 0,
        currentSavings: 0,
      },
      products: [
        {
          incomes: '7583454.16',
          balance: '5341583.92',
          overdraft: 0,
          idProduct: '0000',
          accountNumber: '',
          type: 'ALL',
          expenses: '-2241870.24',
          previousBalance: 0,
        },
        {
          incomes: '4107752.26',
          balance: '3351752.26',
          overdraft: 0,
          idProduct: '500800941411',
          accountNumber: '500800941411',
          type: 'CA',
          expenses: -756000,
          previousBalance: 0,
        },
        {
          incomes: 3475701.9,
          balance: '1989831.6599999997',
          overdraft: 0,
          idProduct: '500800471302',
          accountNumber: '500800471302',
          type: 'CA',
          expenses: '-1485870.2400000002',
          previousBalance: 0,
          totalIncomes: 3475701.9,
        },
      ],
    };

    (component as any).account = {
      type: 'DEPOSIT_ACCOUNT',
      id: '500800471302',
    };

    const result = (component as any)._findProduct(data);

    expect(result).toEqual(data.products[2]);
  });
});
