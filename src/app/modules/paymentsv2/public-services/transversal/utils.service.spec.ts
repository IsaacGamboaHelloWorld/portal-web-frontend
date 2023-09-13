import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AlertCloseComponent } from '@app/core/components/alert-close/alert-close.component';
import { ClassNotification } from '@app/core/constants/notification';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { of, Subject } from 'rxjs';
import {
  billersRegisteredMock,
  recurringDeleteMock,
  recurringDeleteStateMock,
} from '../../../../../../test-helpers/mocks/data/payments-sp.mock';
import { PaymentsV2ModelMock } from '../../../../../../test-helpers/mocks/data/paymentsV2.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { RecurringPopupComponent } from '../components/recurring-popup/recurring-popup.component';
import { IPublicService } from '../entities/public-services';
import { PaymentServiceFacade } from '../payment/payment.facade';
import { PublicServicesFacade } from '../public-services.facade';
import { IInfoPayments } from '../registered-sp/store/state/registered-sp-module.state';

import { Navigate } from '@app/core/constants/navigate';
import { UtilsService } from './utils.service';

describe('UtilsService in Public Service', () => {
  let service: UtilsService;
  let facade: PublicServicesFacade;
  let facadePayment: PaymentServiceFacade;
  let facadeMock: PaymentsV2ModelMock;

  beforeEach(() => {
    facadeMock = new PaymentsV2ModelMock();
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [
        UtilsService,
        ModalService,
        ManipulateDomService,
        {
          provide: PaymentServiceFacade,
          useClass: PaymentsV2ModelMock,
        },
        {
          provide: PublicServicesFacade,
          useValue: facadeMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });

    service = TestBed.get(UtilsService);
    facade = TestBed.get(PublicServicesFacade);
    facadePayment = TestBed.get(PaymentServiceFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getRefresh', () => {
    const result = service.getRefresh();
    expect(result).toEqual(new Subject<any>());
  });

  it('getLoadedProduct', () => {
    const result = service.getLoadedProduct();
    expect(result).toEqual(new Subject<boolean>());
  });

  it('getInfoPaymentResponse', () => {
    const result = service.getInfoPaymentResponse();
    expect(result).toEqual(new Subject<IInfoPayments>());
  });

  it('OnDestroy', () => {
    const spyNext = spyOn(service._destroy$, 'next');
    const spyComp = spyOn(service._destroy$, 'complete');
    service.OnDestroy();
    expect(spyNext).toHaveBeenCalledWith(true);
    expect(spyComp).toHaveBeenCalled();
  });

  it('setProgramed with programmed is true', () => {
    const modal = TestBed.get(ModalService);
    const spy = spyOn(modal, 'open');

    service.setProgramed(true, {});

    expect(spy).toHaveBeenCalledWith(
      RecurringPopupComponent,
      false,
      `${SMALL_WIDTH} not-button-close`,
    );
  });

  it('setProgramed with programmed is false', () => {
    const modal = TestBed.get(ModalService);
    const spy = spyOn(modal, 'open');

    const spy2 = spyOn(service as any, '_actionsModalUnprogrammed');
    jasmine.clock().install();

    service.setProgramed(false, {});

    expect(spy).toHaveBeenCalledWith(
      AlertCloseComponent,
      true,
      `${SMALL_WIDTH} not-button-close`,
    );

    jasmine.clock().tick(10);

    expect(spy2).toHaveBeenCalled();
    jasmine.clock().uninstall();
  });

  it('_actionsModalUnprogrammed with _dialogComponentRef', () => {
    const mockModal = {
      _dialogComponentRef: {
        instance: {
          componentRef: {
            instance: {
              title:
                'PAYMENTSV2.PUBLIC_SERVICES.SECTIONS.HOME.NOT_RECURRING_TITLE',
              img: '/salir.png',
              btnCancel:
                'PAYMENTSV2.PUBLIC_SERVICES.SECTIONS.HOME.NOT_RECURRING_NO',
              btnAgree:
                'PAYMENTSV2.PUBLIC_SERVICES.SECTIONS.HOME.NOT_RECURRING_YES',
              actionCancel: {
                pipe: () => of(),
              },
              actionAgree: {
                pipe: () => of(),
              },
            },
          },
        },
      },
    };

    const data = {};

    (service as any)._modal = mockModal;

    const modal = TestBed.get(ModalService);
    const spyClose = spyOn(modal, 'close');

    (service as any)._actionsModalUnprogrammed(data);

    mockModal._dialogComponentRef.instance.componentRef.instance.actionCancel
      .pipe()
      .subscribe((_data: any) => {
        expect(spyClose).toHaveBeenCalled();
      });
  });

  it('_actionsModalUnprogrammed without _dialogComponentRef', () => {
    const modal = TestBed.get(ModalService);
    const spyClose = spyOn(modal, 'close');

    (service as any)._actionsModalUnprogrammed({});
    expect(spyClose).not.toHaveBeenCalled();
  });

  it('doPayService', () => {
    const data = {};

    const router = TestBed.get(Router);
    const facadeService = TestBed.get(PublicServicesFacade);

    const spyRouter = spyOn(router, 'navigate');
    const spyFacade = spyOn(facadeService, 'setPayment');

    service.doPayService(data);

    expect(spyRouter).toHaveBeenCalledWith([Navigate.paymentsv2payservice]);
    expect(spyFacade).toHaveBeenCalledWith(data);
  });

  it('onDeletePublicService', () => {
    const $event = {};

    const modal = TestBed.get(ModalService);
    const spy = spyOn(modal, 'open');

    const spy2 = spyOn(service as any, '_actionsModal');

    jasmine.clock().install();
    service.onDeletePublicService($event);

    expect(spy).toHaveBeenCalledWith(
      AlertCloseComponent,
      true,
      `${SMALL_WIDTH} not-button-close`,
    );

    jasmine.clock().tick(10);

    expect(spy2).toHaveBeenCalledWith($event);

    jasmine.clock().uninstall();
  });

  it('_actionsModal with _dialogComponentRef', () => {
    const mockModal = {
      _dialogComponentRef: {
        instance: {
          componentRef: {
            instance: {
              title:
                'PAYMENTSV2.PUBLIC_SERVICES.SECTIONS.HOME.DELETE_SERVICE_TITLE',
              desc:
                'PAYMENTSV2.PUBLIC_SERVICES.SECTIONS.HOME.DELETE_SERVICE_DESC',
              img: '/delete.png',
              btnCancel:
                'PAYMENTSV2.PUBLIC_SERVICES.SECTIONS.HOME.BTN_DELETE_NO',
              btnAgree:
                'PAYMENTSV2.PUBLIC_SERVICES.SECTIONS.HOME.BTN_DELETE_YES',
              actionCancel: {
                pipe: () => of(),
              },
              actionAgree: {
                pipe: () => of(),
              },
            },
          },
        },
      },
    };

    (service as any)._modal = mockModal;

    const modal = TestBed.get(ModalService);
    const spyClose = spyOn(modal, 'close');

    (service as any)._actionsModal();

    mockModal._dialogComponentRef.instance.componentRef.instance.actionCancel
      .pipe()
      .subscribe((_data: any) => {
        expect(spyClose).toHaveBeenCalled();
      });
  });

  it('_actionsModal without _dialogComponentRef', () => {
    const modal = TestBed.get(ModalService);
    const spyClose = spyOn(modal, 'close');

    (service as any)._actionsModal();
    expect(spyClose).not.toHaveBeenCalled();
  });

  it('doDeletePublicService with info.deleteData.success is true', () => {
    const $event = billersRegisteredMock.billers[0];

    const _data = billersRegisteredMock.billers[0];
    const _event = {
      billerId: _data.billerId,
      billerNickname: _data.billerNickname,
      contract: _data.contract,
      isBiller: _data.isBiller,
    };

    const spyDeleteSelected = spyOn(facade, 'deleteSelectedPayment');
    const spyNotificaion = spyOn(facade, 'notificationOpen');

    service.doDeletePublicService($event);

    expect(spyDeleteSelected).toHaveBeenCalledWith(_event);

    service.deletePayment$.subscribe((_result: any) => {
      expect(spyNotificaion).toHaveBeenCalledWith(
        'PAYMENTSV2.PUBLIC_SERVICES.SECTIONS.HOME.DELETE_SUCCESS',
        true,
        ClassNotification.SUCCESS,
      );
    });
  });

  it('doDeletePublicService with info.deleteData.success is false', () => {
    const $event = billersRegisteredMock.billers[0];

    const spyNotificaion = spyOn(facade, 'notificationOpen');

    const errorMessage = 'Hubo un error';

    const deleteData = {
      ...recurringDeleteMock,
      errorMessage,
      success: false,
    };

    const result = {
      ...recurringDeleteStateMock,
      deleteData,
    };

    facadeMock.setInnerDeletePayment = result;

    service.doDeletePublicService($event);

    service.deletePayment$.subscribe((_result: any) => {
      expect(spyNotificaion).toHaveBeenCalledWith(
        errorMessage,
        true,
        ClassNotification.ERROR,
      );
    });
  });

  it('doDeletePublicService with info.error is true', () => {
    const $event = billersRegisteredMock.billers[0];

    const spy = spyOn(facade, 'clearDeletePayment');

    const result = {
      error: true,
    };

    facadeMock.setInnerDeletePayment = result;

    service.doDeletePublicService($event);

    service.deletePayment$.subscribe((_result: any) => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it('doDeletePublicService with info.error is false', () => {
    const $event = billersRegisteredMock.billers[0];

    const spy = spyOn(facade, 'clearDeletePayment');

    const result = {
      error: false,
    };

    facadeMock.setInnerDeletePayment = result;

    service.doDeletePublicService($event);

    service.deletePayment$.subscribe((_result: any) => {
      expect(spy).not.toHaveBeenCalled();
    });
  });

  it('infoPayment$', () => {
    service.infoPayment$.subscribe((data: IPublicService) => {
      // console.log(data);
    });
  });

  it('deletePayment$', () => {
    const result = service.deletePayment$;
    expect(result).toEqual(facade.deletePayment$);
  });

  it('selectedPayment$', () => {
    const result = service.selectedPayment$;
    expect(result).toEqual(facade.selectedPayment$);
  });

  it('selectedNoDataPayment$', () => {
    const result = service.selectedNoDataPayment$;
    expect(result).toEqual(facade.selectedNotDataPayment$);
  });

  it('enabledAgreements$', () => {
    const result = service.enabledAgreements$;
    expect(result).toEqual(facade.selectEnabledAgreements$);
  });

  it('getStepOne$', () => {
    const result = service.getStepOne$;
    expect(result).toEqual(facadePayment.getStepOne$);
  });

  it('selectAllProducts$', () => {
    const result = service.selectAllProducts$;
    expect(result).toEqual(facadePayment.selectAllProducts$);
  });
  // tslint:disable-next-line:max-file-line-count
});
