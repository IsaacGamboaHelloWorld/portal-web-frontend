import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { UtilsService } from '@app/modules/paymentsv2/financial-ob/transversal/utils.service';
import { Navigate } from '@core/constants/navigate';
import { ProductsMock } from '../../../../../test-helpers/mocks/data/products.mock';
import { PaymentFreeDestinationModelMock } from '../../../../../test-helpers/mocks/models/payment-free-destination.model..mock';

import { PaymentsV2ModelMock } from '../../../../../test-helpers/mocks/data/paymentsV2.mock';
import { PaymentModelMock } from '../../../../../test-helpers/mocks/models/payment.model.mock';
import { TestingModule } from '../../../../../test-helpers/testing.module';
import { ManipulateDomService } from '../../../core/services/manipulate-dom/manipulate-dom.service';
import { PaymentModel } from '../../payments/payment.model';
import { IFinancialOp } from './entities/financial-op';
import { FinantialObContainer } from './finantial-ob.container';
import { FinancialOpFacade } from './finantial-ob.facade';
import { PaymentFreeDestinationModel } from './payment-fd-pse/store/models/payment-free-destination.model';
import { FinancialOpService } from './services/financial-op.service';

describe('FinantialObContainer', () => {
  let component: FinantialObContainer;
  let fixture: ComponentFixture<FinantialObContainer>;
  let facade: FinancialOpFacade;
  let facadeMock: PaymentsV2ModelMock;

  let model: PaymentModel;
  let modelMock: PaymentModelMock;

  let dataAllPayments: any;
  let dataRegisteredLoans: any;
  let dataSelectedPayment: any;

  let dataBanksArray: any;
  let dataResponseBanks: any;

  beforeEach(async(() => {
    facadeMock = new PaymentsV2ModelMock();
    modelMock = new PaymentModelMock();

    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [FinantialObContainer],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: FinancialOpFacade,
          useValue: facadeMock,
        },
        FinancialOpService,
        {
          provide: PaymentModel,
          useValue: modelMock,
        },
        {
          provide: PaymentFreeDestinationModel,
          useClass: PaymentFreeDestinationModelMock,
        },
        ManipulateDomService,
        UtilsService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinantialObContainer);
    facade = TestBed.get(FinancialOpFacade);
    model = TestBed.get(PaymentModel);
    component = fixture.componentInstance;
    fixture.detectChanges();

    dataRegisteredLoans = [
      {
        accountId: '101010',
        accountType: 'DESPOSIT_ACCOUNT',
        bank: '002',
        loanName: 'Pago de deuda 1',
        bankName: 'banco popular',
        newLoan: true,
      },
      {
        accountId: '202020',
        accountType: 'DESPOSIT_ACCOUNT',
        bank: '002',
        loanName: 'Pago de deuda 2',
        bankName: 'banco popular',
        newLoan: true,
      },
      {
        accountId: '303030',
        accountType: 'DESPOSIT_ACCOUNT',
        bank: '002',
        loanName: 'Pago de deuda 3',
        bankName: 'banco popular',
        newLoan: true,
      },
    ];

    dataAllPayments = {
      registeredLoans: dataRegisteredLoans,
      errorMessage: '',
      loading: false,
      loaded: true,
      error: false,
    };

    dataSelectedPayment = {
      activePayment: {
        accountId: '101010',
        accountType: 'DESPOSIT_ACCOUNT',
        bank: '002',
        loanName: 'Pago de deuda',
        bankName: 'banco popular',
        newLoan: true,
      },
    };

    dataBanksArray = [
      {
        value: '002',
        name: 'POPULAR',
      },
      {
        value: '003',
        name: 'AVVILLAS',
      },
    ];

    dataResponseBanks = {
      data: dataBanksArray,
      loading: false,
      loaded: true,
      error: false,
    };
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onResize', () => {
    const event = {};
    const spy = spyOn(component, 'showNavsButtons');
    component.onResize(event);
    expect(spy).toHaveBeenCalled();
  });

  it('scrollHandler', () => {
    component.scroll = {
      nativeElement: {
        scrollLeft: 50,
        offsetWidth: 50,
        scrollWidth: 100,
        scrollTo: () => {},
      },
    };
    const event = {};
    component.scrollHandler(event as any);
    expect(component.iconArrowRight).toBe('/arrow-right-scheduled.svg');
    expect(component.iconColor).toBeTruthy();
  });

  it('onLeft', () => {
    component.scroll = {
      nativeElement: {
        scrollLeft: 0,
        scrollTo: () => {},
      },
    };

    const spy = spyOn(component.scroll.nativeElement, 'scrollTo');
    component.onLeft();
    expect(spy).toHaveBeenCalled();
  });

  it('onRight', () => {
    component.scroll = {
      nativeElement: {
        scrollLeft: 0,
        scrollTo: () => {},
      },
    };

    const spy = spyOn(component.scroll.nativeElement, 'scrollTo');
    component.onRight();
    expect(spy).toHaveBeenCalled();
  });

  it('selectBill', () => {
    component.editMode = false;
    component.isMobile = true;

    facadeMock.setInnerSelectedPayment = dataSelectedPayment;
    modelMock.setInnerLoansBanks = dataResponseBanks;

    fixture.ngZone.run(() => {
      component.selectBill(dataSelectedPayment.activePayment, 0);

      fixture.whenStable().then(() => {
        component.selectedPayment$.subscribe((data: any) => {
          expect(component.billSelected).toEqual(0);
        });
      });
    });
  });

  it('productsOrigin$', () => {
    facadeMock.setInnerNextPayments = ProductsMock.DEPOSIT_ACCOUNT;
    component.productsOrigin$.subscribe((data: any) => {
      expect(JSON.stringify(data)).toEqual(JSON.stringify([]));
    });
  });

  it('selectItem', () => {
    const dom = TestBed.get(ManipulateDomService);
    const spyRemove = spyOn(dom, 'removeMultipleClass');
    const spyAdd = spyOn(dom, 'addClass');

    component.billSelected = 0;

    component.selectItem();

    expect(spyRemove).toHaveBeenCalledWith('.card-admin', 'selected');
    expect(spyAdd).toHaveBeenCalledWith('.card0', 'selected');
  });

  it('doPayLoanTop', () => {
    const $event = {
      data: {
        accountInformation: {
          accountIdentifier: '',
          productType: '',
          productName: '',
          bank: '',
        },
      },
    };
    const tempLoan: IFinancialOp = {
      accountId: $event.data.accountInformation.accountIdentifier,
      accountType: $event.data.accountInformation.productType,
      bank: '0002',
      loanName: $event.data.accountInformation.productName,
      bankName: $event.data.accountInformation.bank,
      newLoan: false,
    };

    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    const spy2 = spyOn(component, 'selectBill');

    component.doPayLoanTop($event);

    expect(spy2).toHaveBeenCalledWith(tempLoan, 0);
    expect(spy).toHaveBeenCalledWith([Navigate.paymentsv2payloan]);
  });

  it('doPayLoan', () => {
    const event = {
      data: 'data',
    };

    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    const spy2 = spyOn(component, 'selectBill');

    component.doPayLoan(event);

    expect(spy2).toHaveBeenCalledWith(event.data, 0);
    expect(spy).toHaveBeenCalledWith([Navigate.paymentsv2payloan]);
  });

  it('addNewLoan', () => {
    const router = TestBed.get(Router);
    const spy = spyOn(router, 'navigate');

    component.addNewLoan();

    expect(spy).toHaveBeenCalledWith([Navigate.paymentsv2enrollloan]);
  });

  it('doDeleteFinancialOp', () => {
    const data = {};
    const util = TestBed.get(UtilsService);
    const spy = spyOn(util, 'doDeleteFinancialOp');

    component.doDeleteFinancialOp(data);

    expect(spy).toHaveBeenCalledWith(data);
  });

  it('refresh', () => {
    const spyFetch = spyOn(facade, 'fetchAllPayments');

    component.refresh();

    expect(spyFetch).toHaveBeenCalled();
  });

  it('backitem', () => {
    const spy = spyOn(document, 'querySelector').and.returnValue({
      scrollLeft: () => {},
    });
    component.backitem();
    expect(spy).toHaveBeenCalledWith('.next-payments-list');
  });

  it('nextitem', () => {
    const spy = spyOn(document, 'querySelector').and.returnValue({
      scrollLeft: () => {},
    });
    component.nextitem();
    expect(spy).toHaveBeenCalledWith('.next-payments-list');
  });

  it('showNavsButtons when clientWidth < scrollWidth', () => {
    component.showNav = false;
    const spy = spyOn(document, 'querySelector').and.returnValue({
      scrollLeft: () => {},
      clientWidth: 10,
      scrollWidth: 100,
    });
    component.showNavsButtons();
    expect(spy).toHaveBeenCalledWith('.next-payments-list');
    expect(component.showNav).toBeTruthy();
  });

  it('showNavsButtons when clientWidth > scrollWidth', () => {
    component.showNav = false;
    const spy = spyOn(document, 'querySelector').and.returnValue({
      scrollLeft: () => {},
      clientWidth: 100,
      scrollWidth: 10,
    });
    component.showNavsButtons();
    expect(spy).toHaveBeenCalledWith('.next-payments-list');
    expect(component.showNav).toBeFalsy();
  });

  it('showNavsButtons when querySelector return null', () => {
    component.showNav = false;
    const spy = spyOn(document, 'querySelector').and.returnValue(null);
    component.showNavsButtons();
    expect(spy).toHaveBeenCalled();
  });

  it('activeEdit', () => {
    component.editMode = true;
    component.activeEdit();
    expect(component.editMode).toBeFalsy();
  });

  it('editModeStatus', () => {
    component.editMode = true;
    const result = component.editModeStatus;
    expect(result).toBeTruthy();
  });

  xit('hasAllBills$', () => {
    facadeMock.setInnerAllPayments = dataAllPayments;

    component.hasAllBills$.subscribe((result: any) => {
      expect(result).toBeTruthy();
    });
  });

  it('productsTC$', () => {
    facadeMock.setInnerNextPayments = ProductsMock.DEPOSIT_ACCOUNT;
    const result = component.productsTC$;
    expect(result).toEqual(facade.nextPayments$);
  });

  it('allNextpayments$', () => {
    facadeMock.setInnerNextPayments = ProductsMock.DEPOSIT_ACCOUNT;
    const result = component.allNextpayments$;
    expect(result).toEqual(facade.nextPayments$);
  });

  it('allPayments$', () => {
    const result = component.allPayments$;
    expect(result).toEqual(facade.allPayments$);
  });

  it('selectedPayment$', () => {
    const result = component.selectedPayment$;
    expect(result).toEqual(facade.selectedPayment$);
  });

  it('deletePayment$', () => {
    const result = component.deletePayment$;
    expect(result).toEqual(facade.deletePayment$);
  });

  it('hasActivePayment$', () => {
    facadeMock.setInnerSelectedPayment = dataSelectedPayment;

    component.hasActivePayment$.subscribe((result: any) => {
      expect(result).toBeTruthy();
    });
  });

  it('historicPayments$', () => {
    const result = component.historicPayments$;
    expect(result).toEqual(facade.historicPayments$);
  });
  // tslint:disable-next-line:max-file-line-count
});
