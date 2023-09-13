import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Navigate } from '@app/core/constants/navigate';
import { of } from 'rxjs';

import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { billersRegisteredMock } from '../../../../../test-helpers/mocks/data/payments-sp.mock';
import { PaymentsV2ModelMock } from '../../../../../test-helpers/mocks/data/paymentsV2.mock';
import { TestingModule } from '../../../../../test-helpers/testing.module';
import { PaymentServiceFacade } from './payment/payment.facade';
import { PublicServicesContainer } from './public-services.container';
import { PublicServicesFacade } from './public-services.facade';
import { PublicServicesService } from './services/public-services.service';
import { UtilsService } from './transversal/utils.service';

describe('PublicServicesContainer', () => {
  let component: PublicServicesContainer;
  let fixture: ComponentFixture<PublicServicesContainer>;
  let facade: PublicServicesFacade;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [PublicServicesContainer],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: PublicServicesFacade,
          useClass: PaymentsV2ModelMock,
        },
        {
          provide: PaymentServiceFacade,
          useClass: PaymentsV2ModelMock,
        },
        PublicServicesService,
        ManipulateDomService,
        UtilsService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicServicesContainer);
    facade = TestBed.get(PublicServicesFacade);
    component = fixture.componentInstance;
    fixture.detectChanges();
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

  it('scrollHandler for showArrow false', () => {
    component.scroll = {
      nativeElement: {
        scrollLeft: 50,
        offsetWidth: 50,
        scrollWidth: 90,
        scrollTo: () => {},
      },
    };
    const event = {};
    component.showArrow = false;
    component.scrollHandler(event as any);
    expect(component.iconArrowRight).toBe('/arrow-left-scheduled.svg');
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

  it('selectBillClick', () => {
    const data = {} as any;
    const obj_i = 0;
    const spy = spyOn(facade, 'clearInfoBill');

    component.selectBillClick(data, obj_i);

    expect(spy).toHaveBeenCalled();
  });

  it('selectBill', () => {
    const data = billersRegisteredMock.billers[0] as any;
    const facadeServices = TestBed.get(PublicServicesFacade);
    const spySelect = spyOn(facadeServices, 'selectPayment');
    const spyGetInfo = spyOn(facadeServices, 'getInfoBill');

    component.selectBill(data, 0);

    expect(spySelect).toHaveBeenCalled();
    expect(spyGetInfo).toHaveBeenCalled();
  });

  it('selectItem', () => {
    const dom = TestBed.get(ManipulateDomService);
    const spyRemove = spyOn(dom, 'removeMultipleClass');
    const spyAdd = spyOn(dom, 'addClass');

    component.billItemSelected = 0;

    component.selectItem();

    expect(spyRemove).toHaveBeenCalledWith('.card-admin', 'selected');
    expect(spyAdd).toHaveBeenCalledWith('.card0', 'selected');
  });

  it('_getIndexBiller', () => {
    const data = {
      bills: billersRegisteredMock.billers,
    };

    component.selectedBill = {
      billerId: '00000043',
      contract: '31056278',
    } as any;

    const result = (component as any)._getIndexBiller(data);

    expect(result).toEqual(0);
  });

  it('addNewService', () => {
    const router = TestBed.get(Router);
    const spyNav = spyOn(router, 'navigate');

    component.addNewService();

    expect(spyNav).toHaveBeenCalledWith([Navigate.paymentsv2enrollservice]);
  });

  it('doEdit', () => {
    const $event = {
      data: {
        originAccountId: '1',
        daysBeforeAfterExpiration: 0,
        maxAmount: 100,
      },
    };
    const spy = spyOn(facade, 'setEditRecurrent');
    const spyProgramed = spyOn(component, 'setProgramed');

    const dataToSend: any = {
      account_origin: $event.data.originAccountId,
      date: $event.data.daysBeforeAfterExpiration,
      amount: $event.data.maxAmount,
    };

    component.doEdit($event);

    expect(spy).toHaveBeenCalledWith(dataToSend);
    expect(spyProgramed).toHaveBeenCalled();
  });

  it('onDeletePublicService', () => {
    const $event = {
      data: '',
    };
    const util = TestBed.get(UtilsService);
    const spy = spyOn(util, 'onDeletePublicService');

    component.onDeletePublicService($event);

    expect(spy).toHaveBeenCalledWith($event.data);
  });

  it('refresh', () => {
    const spy = spyOn(facade, 'fetchAllPayments');
    component.refresh();
    expect(spy).toHaveBeenCalled();
  });

  it('doPayService', () => {
    const $event = {
      data: '',
    };
    const util = TestBed.get(UtilsService);
    const spy = spyOn(util, 'doPayService');

    component.doPayService($event);

    expect(spy).toHaveBeenCalledWith($event.data);
  });

  it('doPayServiceTop', () => {
    const $event = {
      data: '',
    };
    const spyFacade = spyOn(facade, 'setPayment');
    const router = TestBed.get(Router);
    const spyNav = spyOn(router, 'navigate');

    component.doPayServiceTop($event);

    expect(spyFacade).toHaveBeenCalledWith($event.data);
    expect(spyNav).toHaveBeenCalledWith([Navigate.paymentsv2payservice]);
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

  it('setProgramed', () => {
    const data = true;
    component.selectedBill = null;
    const util = TestBed.get(UtilsService);
    const spy = spyOn(util, 'setProgramed');
    component.setProgramed(data);
    expect(spy).toHaveBeenCalledWith(data, null);
  });

  it('_orderBills', () => {
    const data = {
      bills: billersRegisteredMock.billers,
    };
    const order = {
      ...data,
      bills: [...data.bills].sort((a, b) => {
        if (a.contract > b.contract) {
          return 1;
        }
        if (a.contract < b.contract) {
          return -1;
        }
        return 0;
      }),
    };
    const result = (component as any)._orderBills(data);
    expect(JSON.stringify(result)).toEqual(JSON.stringify(order));
  });

  xit('infoPayment$', () => {
    const util = TestBed.get(UtilsService);
    spyOn(util, 'infoPayment$').and.returnValue(of());
    const result = component.infoPayment$;
    expect(result).toEqual(util.infoPayment$);
  });

  it('editModeStatus', () => {
    component.editMode = true;
    const result = component.editModeStatus;
    expect(result).toBeTruthy();
  });

  it('selectedPayment$', () => {
    const result = component.selectedPayment$;
    expect(result).toEqual(facade.selectedPayment$);
  });

  it('deletePayment$', () => {
    const result = component.deletePayment$;
    expect(result).toEqual(facade.deletePayment$);
  });

  it('nextPayments$', () => {
    const result = component.nextPayments$;
    expect(result).toEqual(facade.nextPayments$);
  });

  it('selectedPayment$', () => {
    const result = component.selectedPayment$;
    expect(result).toEqual(facade.selectedPayment$);
  });

  it('selectedNoDataPayment$', () => {
    const result = component.selectedNoDataPayment$;
    expect(result).toEqual(facade.selectedNotDataPayment$);
  });

  it('enabledAgreements$', () => {
    const result = component.enabledAgreements$;
    expect(result).toEqual(facade.selectEnabledAgreements$);
  });

  it('navigate', () => {
    const result = component.navigate;
    expect(result).toEqual(Navigate);
  });

  it('selectDeleteRecurring$', () => {
    const result = component.selectDeleteRecurring$;
    expect(result).toEqual(facade.selectDeleteRecurring$);
  });

  it('selectRecurring$', () => {
    const result = component.selectRecurring$;
    expect(result).toEqual(facade.selectRecurring$);
  });

  it('getActiveNotdataPaymentState$', () => {
    const result = component.getActiveNotdataPaymentState$;
    expect(result).toEqual(facade.getActiveNotdataPaymentState$);
  });
  // tslint:disable-next-line:max-file-line-count
});
