import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { StepLineTime } from '@app/modules/payment-taxes/entities/payment-taxes';
import { TranslateService } from '@ngx-translate/core';
import { PaymentsV2ModelMock } from '../../../../../../test-helpers/mocks/data/paymentsV2.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { ModalService } from '../../../../shared/modal/services/modal.service';
import { PublicServicesFacade } from '../public-services.facade';
import { PaymentContainer } from './payment.container';
import { PaymentServiceFacade } from './payment.facade';
import { PaymentService } from './services/payment.service';

describe('PaymentContainer in Public Service', () => {
  let component: PaymentContainer;
  let fixture: ComponentFixture<PaymentContainer>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [PaymentContainer],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        ModalService,
        PaymentService,
        ManipulateDomService,
        TranslateService,
        {
          provide: PaymentServiceFacade,
          useClass: PaymentsV2ModelMock,
        },
        {
          provide: PublicServicesFacade,
          useClass: PaymentsV2ModelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentContainer);
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

  it('_hideNavigation', () => {
    component.showTimeLine = true;
    component.title = 'title';
    component.subTitle = 'subTitle';

    (component as any)._hideNavigation();

    expect(component.showTimeLine).toBeFalsy();
    expect(component.title).toEqual('');
    expect(component.subTitle).toEqual('');
  });

  it('setStep', () => {
    const step = 2;
    const stepLine: StepLineTime = {
      step,
    };

    const facedeParent = TestBed.get(PublicServicesFacade);
    const spy = spyOn(facedeParent, 'setStep');
    component.setStep(step);
    expect(component.step).toEqual(step);
    expect(spy).toHaveBeenCalledWith(stepLine);
  });

  it('setConfigStep case 1', () => {
    const response: StepLineTime = {
      step: 1,
    };
    (component as any).setConfigStep(response);

    expect(component.backUrl).toEqual(component.navigate.paymentsv2services);
  });

  it('setConfigStep case 2', () => {
    const response: StepLineTime = {
      step: 2,
    };
    (component as any).setConfigStep(response);

    expect(component.backUrl).toEqual(component.navigateInternal.step1);
  });

  it('setConfigStep case 3', () => {
    const response: StepLineTime = {
      step: 3,
    };
    (component as any).setConfigStep(response);

    expect(component.backUrl).toEqual(component.navigateInternal.step2);
  });

  it('setConfigStep case 4', () => {
    const response: StepLineTime = {
      step: 4,
    };
    const spy = spyOn(component as any, '_hideNavigation');

    (component as any).setConfigStep(response);

    expect(spy).toHaveBeenCalled();
  });

  it('setConfigStep default', () => {
    const response: StepLineTime = {
      step: 6,
    };
    (component as any).setConfigStep(response);

    expect(component.backUrl).toEqual(component.navigate.paymentsv2services);
  });

  it('backHome for IF', () => {
    const facade = TestBed.get(PaymentServiceFacade);
    const spy = spyOn(facade, 'setBackHome');

    component.backHome(true);

    expect(spy).toHaveBeenCalledWith(true);
  });

  it('backHome for ELSE', () => {
    const facade = TestBed.get(PaymentServiceFacade);
    const spy = spyOn(facade, 'setBackHome');

    component.backHome(false);

    expect(spy).toHaveBeenCalledWith(false);
  });
});
