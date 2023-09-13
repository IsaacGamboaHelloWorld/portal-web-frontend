import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManipulateDomService } from './../../../../../../core/services/manipulate-dom/manipulate-dom.service';
import { NavigatePayment } from './../navigate/routes';

import { ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { billersRegisteredMock } from '../../../../../../../../test-helpers/mocks/data/payments-sp.mock';
import { PaymentsV2ModelMock } from '../../../../../../../../test-helpers/mocks/data/paymentsV2.mock';
import { TestingModule } from '../../../../../../../../test-helpers/testing.module';
import { RemoveValuePipe } from '../../../../../../core/pipes/remove-value.pipe';
import { IPublicService } from '../../../entities/public-services';
import { PublicServicesFacade } from '../../../public-services.facade';
import { UtilsService } from '../../../transversal/utils.service';
import { PaymentServiceFacade } from '../../payment.facade';
import { StepEndComponent } from './step-end.component';

describe('StepPaymentEndComponent is SP', () => {
  let component: StepEndComponent;
  let fixture: ComponentFixture<StepEndComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule, ReactiveFormsModule],
      declarations: [StepEndComponent, RemoveValuePipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: PaymentServiceFacade,
          useClass: PaymentsV2ModelMock,
        },
        {
          provide: PublicServicesFacade,
          useClass: PaymentsV2ModelMock,
        },
        ManipulateDomService,
        UtilsService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnDestroy', () => {
    const spyNext = spyOn((component as any)._destroy$, 'next');
    const spyComp = spyOn((component as any)._destroy$, 'complete');
    component.ngOnDestroy();
    expect(spyNext).toHaveBeenCalledWith(true);
    expect(spyComp).toHaveBeenCalled();
  });

  it('setProgramed', () => {
    const data = true;
    (component as any).selectedBill = null;
    const util = TestBed.get(UtilsService);
    const spy = spyOn(util, 'setProgramed');
    component.setProgramed(data);
    expect(spy).toHaveBeenCalledWith(data, null);
  });

  it('_resetDisabled', () => {
    component.disabled = true;
    (component as any)._resetDisabled();
    expect(component.disabled).toBeFalsy();
  });

  it('selectBill with data', () => {
    const data = billersRegisteredMock.billers[0] as any;
    const facadeServices = TestBed.get(PublicServicesFacade);
    const spySelect = spyOn(facadeServices, 'selectPayment');
    const spyClear = spyOn(facadeServices, 'clearInfoBill');
    const spyGetInfo = spyOn(facadeServices, 'getInfoBill');

    component.selectBill(data);

    expect(spySelect).toHaveBeenCalled();
    expect(spyClear).toHaveBeenCalled();
    expect(spyGetInfo).toHaveBeenCalled();
  });

  it('getRecurringPaymentState$', () => {
    const facadeServices = TestBed.get(PublicServicesFacade);
    const result = component.getRecurringPaymentState$;
    expect(result).toEqual(facadeServices.getRecurringPaymentState$);
  });

  it('navigateInternal', () => {
    const result = component.navigateInternal;
    expect(result).toEqual(NavigatePayment);
  });

  it('infoPayment$', () => {
    const util = TestBed.get(UtilsService);
    const mock = util.infoPayment$ as Observable<IPublicService>;
    const result = component.infoPayment$.toPromise();
    expect(JSON.stringify(result)).toEqual(JSON.stringify(mock.toPromise()));
  });
});
