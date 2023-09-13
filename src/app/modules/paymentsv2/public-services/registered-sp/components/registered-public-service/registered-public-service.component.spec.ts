import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { billersRegisteredMock } from '../../../../../../../../test-helpers/mocks/data/payments-sp.mock';
import { PaymentsV2ModelMock } from '../../../../../../../../test-helpers/mocks/data/paymentsV2.mock';
import { TestingModule } from '../../../../../../../../test-helpers/testing.module';
import { IEditRecurring } from '../../../entities/public-services';
import { PaymentServiceFacade } from '../../../payment/payment.facade';
import { PublicServicesFacade } from '../../../public-services.facade';

import { UtilsService } from '../../../transversal/utils.service';
import { RegisteredPublicServiceComponent } from './registered-public-service.component';

describe('RegisteredPublicServiceComponent', () => {
  let component: RegisteredPublicServiceComponent;
  let fixture: ComponentFixture<RegisteredPublicServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [RegisteredPublicServiceComponent],
      providers: [
        {
          provide: PublicServicesFacade,
          useClass: PaymentsV2ModelMock,
        },
        {
          provide: PaymentServiceFacade,
          useClass: PaymentsV2ModelMock,
        },
        UtilsService,
        ManipulateDomService,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisteredPublicServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('setProgramed', () => {
    const util = TestBed.get(UtilsService);
    const spy = spyOn(util, 'setProgramed');

    component.selectedBill = null;

    component.setProgramed(true);

    expect(spy).toHaveBeenCalledWith(true, null);
  });

  it('onDeletePublicService', () => {
    const util = TestBed.get(UtilsService);
    const spy = spyOn(util, 'onDeletePublicService');
    const event = {};

    component.onDeletePublicService(event);

    expect(spy).toHaveBeenCalledWith(event);
  });

  it('paymentSubmit', () => {
    const util = TestBed.get(UtilsService);
    const spy = spyOn(util, 'doPayService');

    const event = {};

    component.paymentSubmit(event);

    expect(spy).toHaveBeenCalledWith(event);
  });

  it('selectBill for IF', () => {
    const data = billersRegisteredMock.billers[0] as any;
    const facadeServices = TestBed.get(PublicServicesFacade);
    const spySelect = spyOn(facadeServices, 'selectPayment');
    const spyGetInfo = spyOn(facadeServices, 'getInfoBill');

    component.selectBill(data);

    expect(spySelect).toHaveBeenCalled();
    expect(spyGetInfo).toHaveBeenCalled();
  });

  it('selectBill for ELSE', () => {
    const data = billersRegisteredMock.billers[0] as any;
    const facadeServices = TestBed.get(PublicServicesFacade);
    const spySelect = spyOn(facadeServices, 'selectPayment');
    const spyGetInfo = spyOn(facadeServices, 'getInfoBill');
    component.editMode = true;

    component.selectBill(data);

    expect(spySelect).not.toHaveBeenCalled();
    expect(spyGetInfo).not.toHaveBeenCalled();
  });

  it('doEdit', () => {
    const event = {
      data: {
        daysBeforeAfterExpiration: '0',
        maxAmount: '1000',
      },
    };
    const facadeServices = TestBed.get(PublicServicesFacade);
    const dataToSend: IEditRecurring = {
      account_origin: null,
      date: event.data.daysBeforeAfterExpiration,
      amount: event.data.maxAmount,
    };
    const spy = spyOn(facadeServices, 'setEditRecurrent');
    const spy2 = spyOn(component, 'setProgramed');

    component.doEdit(event);

    expect(spy).toHaveBeenCalledWith(dataToSend);
    expect(spy2).toHaveBeenCalled();
  });
});
