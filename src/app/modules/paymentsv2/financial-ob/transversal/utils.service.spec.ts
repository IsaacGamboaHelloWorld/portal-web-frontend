import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AlertCloseComponent } from '@app/core/components/alert-close/alert-close.component';
import { ClassNotification } from '@app/core/constants/notification';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { of, Subject } from 'rxjs';
import { PaymentsV2ModelMock } from '../../../../../../test-helpers/mocks/data/paymentsV2.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { FinancialOpFacade } from '../finantial-ob.facade';

import { UtilsService } from './utils.service';

describe('UtilsService Bank Obligation', () => {
  let service: UtilsService;
  let facade: FinancialOpFacade;
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
          provide: FinancialOpFacade,
          useValue: facadeMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    });
    service = TestBed.get(UtilsService);
    facade = TestBed.get(FinancialOpFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getRefresh', () => {
    const result = service.getRefresh();
    expect(result).toEqual(new Subject<any>());
  });

  it('OnDestroy', () => {
    const spyNext = spyOn(service._destroy$, 'next');
    const spyComp = spyOn(service._destroy$, 'complete');
    service.OnDestroy();
    expect(spyNext).toHaveBeenCalledWith(true);
    expect(spyComp).toHaveBeenCalled();
  });

  it('doDeleteFinancialOp', () => {
    const modal = TestBed.get(ModalService);
    const spy = spyOn(modal, 'open');

    const spy2 = spyOn(service as any, '_actionsModal');
    jasmine.clock().install();

    service.doDeleteFinancialOp({});

    expect(spy).toHaveBeenCalledWith(
      AlertCloseComponent,
      true,
      `${SMALL_WIDTH} not-button-close`,
    );

    jasmine.clock().tick(10);

    expect(spy2).toHaveBeenCalled();
    jasmine.clock().uninstall();
  });

  it('_actionsModal with _dialogComponentRef', () => {
    const mockModal = {
      _dialogComponentRef: {
        instance: {
          componentRef: {
            instance: {
              title:
                'PAYMENTSV2.FINANCIAL_OP.SECTIONS.HOME.DELETE_SERVICE_TITLE',
              desc: 'PAYMENTSV2.FINANCIAL_OP.SECTIONS.HOME.DELETE_SERVICE_DESC',
              img: '/delete.png',
              btnCancel: 'PAYMENTSV2.FINANCIAL_OP.SECTIONS.HOME.BTN_DELETE_NO',
              btnAgree: 'PAYMENTSV2.FINANCIAL_OP.SECTIONS.HOME.BTN_DELETE_YES',
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

  it('doDeleteLoan with info.deleteData.success is true', () => {
    const _data = {
      data: {
        accountId: '1',
        accountType: 'DEPOSIT_ACCOUNT',
        bank: '002',
      },
      success: true,
    };
    const _event = {
      accountId: _data.data.accountId,
      accountType: _data.data.accountType,
      bank: _data.data.bank,
    };

    const deleteData = {
      deleteData: _data,
    };

    facadeMock.setInnerDeletePayment = deleteData;

    const spyDeleteSelected = spyOn(facade, 'deleteSelectedPayment');
    const spyNotificaion = spyOn(facade, 'notificationOpen');

    service.doDeleteLoan(_data);

    expect(spyDeleteSelected).toHaveBeenCalledWith(_event);

    service.deletePayment$.subscribe((_result: any) => {
      expect(spyNotificaion).toHaveBeenCalledWith(
        'PAYMENTSV2.FINANCIAL_OP.SECTIONS.HOME.DELETE_SUCCESS',
        true,
        ClassNotification.SUCCESS,
      );
    });
  });

  it('doDeleteLoan with info.deleteData.success is false', () => {
    const errorMessage = 'Hubo un error';
    const _data = {
      data: {
        accountId: '1',
        accountType: 'DEPOSIT_ACCOUNT',
        bank: '002',
      },
      success: false,
      errorMessage,
    };

    const deleteData = {
      deleteData: _data,
    };

    facadeMock.setInnerDeletePayment = deleteData;

    const spyNotificaion = spyOn(facade, 'notificationOpen');

    service.doDeleteLoan(_data);

    service.deletePayment$.subscribe((_result: any) => {
      expect(spyNotificaion).toHaveBeenCalledWith(
        errorMessage,
        true,
        ClassNotification.ERROR,
      );
    });
  });

  it('doDeleteLoan with info.error is true', () => {
    const errorMessage = 'Hubo un error';
    const _data = {
      data: {
        accountId: '1',
        accountType: 'DEPOSIT_ACCOUNT',
        bank: '002',
      },
      success: false,
      errorMessage,
    };

    const deleteData = {
      error: true,
    };

    facadeMock.setInnerDeletePayment = deleteData;

    const spyNotificaion = spyOn(facade, 'notificationOpen');
    const spy = spyOn(facade, 'clearDeletePayment');

    service.doDeleteLoan(_data);

    service.deletePayment$.subscribe((_result: any) => {
      expect(spyNotificaion).toHaveBeenCalledWith(
        'PAYMENTSV2.FINANCIAL_OP.SECTIONS.HOME.DELETE_SUCCESS',
        true,
        ClassNotification.SUCCESS,
      );
      expect(spy).toHaveBeenCalled();
    });
  });

  it('doDeleteLoan with info.error is false', () => {
    const _data = {
      data: {
        accountId: '1',
        accountType: 'DEPOSIT_ACCOUNT',
        bank: '002',
      },
      success: false,
    };

    const spy = spyOn(facade, 'clearDeletePayment');

    const result = {
      error: false,
    };

    facadeMock.setInnerDeletePayment = result;

    service.doDeleteLoan(_data);

    service.deletePayment$.subscribe((_result: any) => {
      expect(spy).not.toHaveBeenCalled();
    });
  });

  it('domMainContainreOb when isInit is true', () => {
    const dom = TestBed.get(ManipulateDomService);
    const spy = spyOn(dom, 'addClass');

    service.domMainContainreOb(true);

    expect(spy).toHaveBeenCalledWith(
      '.main-container-transaction',
      'main-container-ob',
    );
  });

  it('domMainContainreOb when isInit is false', () => {
    const dom = TestBed.get(ManipulateDomService);
    const spy = spyOn(dom, 'removeClass');

    service.domMainContainreOb(false);

    expect(spy).toHaveBeenCalledWith(
      '.main-container-transaction',
      'main-container-ob',
    );
  });

  it('deletePayment$', () => {
    const result = service.deletePayment$;
    expect(result).toEqual(facadeMock.deletePayment$);
  });
});
