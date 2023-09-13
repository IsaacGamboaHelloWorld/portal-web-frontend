import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApplicationModel } from '@app/application.model';
import { ManipulateDomService } from './../../../core/services/manipulate-dom/manipulate-dom.service';

import { ClassNotification } from '@app/core/constants/notification';
import { environment } from '@environment';
import { PaymentsHistoricalErrorsMock } from '../../../../../test-helpers/mocks/data/payment.mock';
import { PaymentsV2ModelMock } from '../../../../../test-helpers/mocks/data/paymentsV2.mock';
import { TestingModule } from '../../../../../test-helpers/testing.module';
import { ChooseHistoryContainer } from './choose-history.container';
import { ChooseHistoryFacade } from './choose-history.facade';
import { ChooseHistoryService } from './services/choose-history.service';

describe('ChooseHistoryContainer', () => {
  let component: ChooseHistoryContainer;
  let fixture: ComponentFixture<ChooseHistoryContainer>;
  let facadeMock: PaymentsV2ModelMock;

  beforeEach(async(() => {
    facadeMock = new PaymentsV2ModelMock();

    TestBed.configureTestingModule({
      declarations: [ChooseHistoryContainer],
      imports: [TestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: ChooseHistoryFacade,
          useValue: facadeMock,
        },
        {
          provide: ApplicationModel,
          useValue: facadeMock,
        },
        ChooseHistoryService,
        ManipulateDomService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseHistoryContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('_setupClass with input true', () => {
    const dom = TestBed.get(ManipulateDomService);
    const spy = spyOn(dom, 'addClass');

    (component as any)._setupClass(true);

    expect(spy).toHaveBeenCalledWith(
      '.main-container-transaction',
      'container-home-payment',
    );
  });

  it('clickRedirect', () => {
    const facade = TestBed.get(ChooseHistoryFacade);
    const spy = spyOn(facade, 'notificationOpen');

    component.clickRedirect();

    expect(spy).toHaveBeenCalledWith(
      'PAYMENTSV2.SHARED_COPY.LBL_ALERT',
      true,
      ClassNotification.INFO,
    );
  });

  it('baseAssets', () => {
    const result = component.baseAssets;
    expect(result).toEqual(environment.resources.base_assets);
  });

  it('historicPayments$', () => {
    const info = {
      data: PaymentsHistoricalErrorsMock.records,
    };
    facadeMock.setInnerHistoryPayment = info;

    component.historicPayments$.subscribe((data: any) => {
      expect(info).toEqual(data);
    });
  });

  it('hasData$ return true', () => {
    const info = {
      data: PaymentsHistoricalErrorsMock.records,
    };
    facadeMock.setInnerHistoryPayment = info;

    const result = component.hasData$;

    expect(result).toBeTruthy();
  });
});
