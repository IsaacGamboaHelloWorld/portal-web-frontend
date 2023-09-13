import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IStocksAllState } from '@modules/home/store/reducers/stocks/stocks-all.reducer';
import { TranslateService } from '@ngx-translate/core';
import { ClassNotification } from './../../../../core/constants/notification';
import { ManipulateDomService } from './../../../../core/services/manipulate-dom/manipulate-dom.service';
import { ModalService } from './../../../../shared/modal/services/modal.service';

import { CreateDatePipe } from '@app/shared/create-date/create-date.pipe';
import { DialogConfig } from '@app/shared/modal/services/dialog-config';
import { RemoveValuePipe } from '@core/pipes/remove-value.pipe';
import { HomeModel } from '@modules/home/home.model';
import { stocksAvalAllMock } from '../../../../../../test-helpers/mocks/data/stocksAval.mocks';
import { HomeModelMock } from '../../../../../../test-helpers/mocks/models/home.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { ModalProductActionsComponent } from './modal-product-actions.component';

describe('ModalProductActionsComponent', () => {
  let component: ModalProductActionsComponent;
  let fixture: ComponentFixture<ModalProductActionsComponent>;
  let facade: HomeModel;
  let modal: ModalService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [
        ModalProductActionsComponent,
        CreateDatePipe,
        RemoveValuePipe,
      ],
      providers: [
        TranslateService,
        ModalService,
        ManipulateDomService,
        DialogConfig,
        {
          provide: HomeModel,
          useClass: HomeModelMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalProductActionsComponent);
    facade = TestBed.get(HomeModel);
    modal = TestBed.get(ModalService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnDestroy', () => {
    const spyReset = spyOn(facade, 'resetStockAll');
    const spyModal = spyOn(modal, 'hideBtnCancel');

    component.ngOnDestroy();

    expect(spyReset).toHaveBeenCalled();
    expect(spyModal).toHaveBeenCalledWith(false);
  });

  it('retry', () => {
    const data = {};
    component.dialogConfig.data = data;
    const spy = spyOn(facade, 'fetchStocksAll');

    component.retry();

    expect(spy).toHaveBeenCalledWith(data);
  });

  it('checkRetries should be close modal and open notification', () => {
    const spyModal = spyOn(modal, 'close');
    const spyNotif = spyOn(facade, 'notificationOpen');

    const message = 'Hola Mundo';
    const translate = TestBed.get(TranslateService);
    spyOn(translate, 'instant').and.returnValue(message);

    (component as any).maxAmountRetry = 3;
    (component as any).checkRetries(4);

    expect(spyModal).toHaveBeenCalled();
    expect(spyNotif).toHaveBeenCalledWith(
      message,
      true,
      ClassNotification.ERROR,
    );
  });

  it('checkShowCloseButton should be call hideBtnCancel with true', () => {
    const spy = spyOn(modal, 'hideBtnCancel');

    const result: IStocksAllState = {
      data: {
        stocksAval: [],
        dividends: [],
      },
      errorMessage: '',
      loading: false,
      loaded: false,
      error: false,
      retries: 0,
      code: '',
    };

    (component as any).checkShowCloseButton(result);

    expect(spy).toHaveBeenCalledWith(true);
  });

  it('checkShowCloseButton should be call hideBtnCancel with false', () => {
    const spy = spyOn(modal, 'hideBtnCancel');

    const result: IStocksAllState = {
      data: {
        stocksAval: stocksAvalAllMock.stocksAval as any,
        dividends: stocksAvalAllMock.dividends,
      },
      errorMessage: '',
      loading: false,
      loaded: false,
      error: false,
      retries: 0,
      code: '',
    };

    (component as any).checkShowCloseButton(result);

    expect(spy).toHaveBeenCalledWith(false);
  });
});
