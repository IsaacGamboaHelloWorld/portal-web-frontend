import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ClassNotification } from '@app/core/constants/notification';
import { IPeriodItem } from '@app/core/interfaces/statement/period';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { Security } from '@app/modules/security/utils/security';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { SanitizerurlsPipe } from '@core/pipes/sanitizerurls/sanitizerurls.pipe';
import { SecurityService } from '@modules/security/services/security.service';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { CurrentAccountMock } from '../../../../../../test-helpers/mocks/data/currentAccount.mock';
import { DetailProductModelMock } from '../../../../../../test-helpers/mocks/models/detail-product.model.mock';
import { StatementsModelMock } from '../../../../../../test-helpers/mocks/models/statements.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { DialogConfig } from '../../../../shared/modal/services/dialog-config';
import { DetailProductModel } from '../../detail-product.model';
import { PdfMock } from './../../../../../../test-helpers/mocks/data/pdf.mock';
import { StatementsState } from './../../../../store/reducers/models/statements/statements.reducer';
import { StatementsService } from './services/statements.service';
import { StatementsContainer } from './statements.component';
import { StatementModel } from './statements.model';

describe('StatementsComponent', () => {
  let component: StatementsContainer;
  let fixture: ComponentFixture<StatementsContainer>;
  let model: StatementModel;
  let modelMock: StatementsModelMock;

  const pdfData = PdfMock;
  const currentAccount = CurrentAccountMock;

  beforeEach(async(() => {
    modelMock = new StatementsModelMock();
    TestBed.configureTestingModule({
      declarations: [StatementsContainer, SanitizerurlsPipe],
      imports: [TestingModule, HttpClientTestingModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        DialogConfig,
        StatementsService,
        SecurityService,
        Security,
        ModalService,
        ManipulateDomService,
        TranslateService,
        {
          provide: DetailProductModel,
          useClass: DetailProductModelMock,
        },
        {
          provide: StatementModel,
          useValue: modelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementsContainer);
    model = TestBed.get(StatementModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    spyOnProperty(component, 'periodsError$', 'get').and.returnValue(false);
    spyOnProperty(component, 'periodsLoading$', 'get').and.returnValue(false);
    spyOnProperty(component, 'periodsLoaded$', 'get').and.returnValue(true);
    spyOnProperty(component, 'periodsData$', 'get').and.returnValue([]);
    spyOnProperty(component, 'hasPeriodsAvailables$', 'get').and.returnValue(
      true,
    );
    expect(component).toBeTruthy();
  });

  it('spy on generate', () => {
    const spy = spyOn(component, 'doChange');
    component.doChange();
    expect(spy).toHaveBeenCalled();
  });

  it('should be validate compareFnPeriods return boolean', () => {
    const value1 = {
      id: 1,
    };
    const value2 = {
      id: 2,
    };
    expect(component.compareFnPeriods(value1, value2)).toBeFalsy();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('onInit with dialogConfig.data', () => {
    component.dialogConfig.data = currentAccount;
    spyOn(component as any, 'getPeriods');
    spyOn(component as any, '_initForm');
    component.ngOnInit();
    expect(component.currentProduct).toEqual(component.dialogConfig.data);
  });

  it('periodsLoading$ should be called', () => {
    const result$ = component.periodsLoading$;
    expect(model.periodsLoading$).toEqual(result$);
  });

  it('pdfError$ should be called', () => {
    const result$ = component.pdfError$;
    expect(model.pdfError$).toEqual(result$);
  });

  it('pdfLoading$ should be called', () => {
    const result$ = component.pdfLoading$;
    expect(model.pdfLoading$).toEqual(result$);
  });

  it('pdfLoaded$ should be called', () => {
    const result$ = component.pdfLoaded$;
    expect(model.pdfLoaded$).toEqual(result$);
  });

  it('pdfData$ should be called', () => {
    modelMock.setInnerPdfData = pdfData;
    const spy = spyOn(model.pdf$, 'pipe').and.callThrough();
    component.pdfData$.subscribe((_) => {});
    expect(spy).toHaveBeenCalled();
  });

  it('fileBase64$ should be called', () => {
    modelMock.setInnerPdfData = pdfData;
    const spy = spyOn(model.pdf$, 'pipe').and.callThrough();
    component.fileBase64$.subscribe((_) => {
      expect(component.isReadyToDownload).toBeTruthy();
    });
    expect(spy).toHaveBeenCalled();
  });

  it('fileBase64$ should be called and return with null', () => {
    modelMock.setInnerPdfData = null;
    const spy = spyOn(model.pdf$, 'pipe').and.callThrough();
    component.fileBase64$.subscribe((_) => {
      expect(component.isReadyToDownload).toBeFalsy();
    });
    expect(spy).toHaveBeenCalled();
  });

  it('filename$ should be called', () => {
    modelMock.setInnerPdfData = pdfData;
    const spy = spyOn(model.pdf$, 'pipe').and.callThrough();
    component.filename$.subscribe((_) => {
      expect(component.isReadyToDownload).toBeTruthy();
    });
    expect(spy).toHaveBeenCalled();
  });

  it('filename$ should be called and return with null', () => {
    modelMock.setInnerPdfData = null;
    const spy = spyOn(model.pdf$, 'pipe').and.callThrough();
    component.filename$.subscribe((_) => {
      expect(component.isReadyToDownload).toBeFalsy();
    });
    expect(spy).toHaveBeenCalled();
  });

  it('hasPeriodsAvailables should be return true', () => {
    spyOn(model, 'periods$').and.returnValue(true);
    const result = component.hasPeriodsAvailables$;
    expect(result).toBeTruthy();
  });

  it('doChange is called and check changes', () => {
    component.isReadyToDownload = true;
    component.inProcess = true;
    const spy = spyOn(model, 'resetPdfData');
    component.doChange();
    expect(component.isReadyToDownload).toBeFalsy();
    expect(component.inProcess).toBeFalsy();
    expect(spy).toHaveBeenCalled();
  });

  it('getPeriods should be called with execute doRetry', () => {
    const spy = spyOn(component as any, 'getPeriods');
    component.doRetry();
    expect(spy).toHaveBeenCalled();
  });

  it('call getPeriods when currentProduct is null', () => {
    component.currentProduct = null;
    const spy = spyOn(model, 'getPeriods');
    (component as any).getPeriods();
    expect(spy).not.toHaveBeenCalled();
  });

  it('call getPeriods when currentProduct is null', () => {
    component.currentProduct = currentAccount as any;
    const spy = spyOn(model, 'getPeriods');
    (component as any).getPeriods();
    expect(spy).toHaveBeenCalled();
  });

  it('doGenerate without pdf data', () => {
    component.currentProduct = currentAccount as any;
    const spyGetPdf = spyOn(model, 'getPdf');
    spyOn(model.pdf$, 'pipe').and.returnValue(of({}));

    spyOn(document, 'getElementById').and.returnValue(() => {
      function click(): void {}
    });
    spyOn(component as any, 'downloadPDF');

    component.doGenerate();
    expect(spyGetPdf).toHaveBeenCalledWith(
      component.currentProduct.accountInformation.accountIdentifier.toString(),
      component.currentProduct.accountInformation.productType.toString(),
      '',
    );
  });

  xit('doGenerate with pdf data', () => {
    component.currentProduct = currentAccount as any;
    const spyGetPdf = spyOn(model, 'getPdf');
    spyOn(model.pdf$, 'pipe').and.returnValue(of(pdfData));

    spyOn(document, 'getElementById').and.returnValue(() => {
      function click(): void {}
    });
    spyOn(component as any, 'downloadPDF');

    component.doGenerate();
    expect(spyGetPdf).toHaveBeenCalledWith(
      component.currentProduct.accountInformation.accountIdentifier.toString(),
      component.currentProduct.accountInformation.productType.toString(),
      '',
    );
    expect(component.inProcess).toBeFalsy();
    expect(component.isReadyToDownload).toBeTruthy();
  });

  it('periodsData$ not return data', () => {
    const items: IPeriodItem[] = [
      {
        startDate: '2020-08-01T00:00:00-05:00',
        endDate: '2020-08-31T00:00:00-05:00',
        documentType: '001',
        periodName: 'AGOSTO',
      },
      {
        startDate: '2020-09-01T00:00:00-05:00',
        endDate: '2020-09-31T00:00:00-05:00',
        documentType: '001',
        periodName: 'SEPTIEMBRE',
      },
    ];

    const result: StatementsState = {
      loaded: false,
      error: false,
      loading: false,
      statementsInfo: {
        type: '',
        errorMesg: '',
        success: false,
        periods: items,
        account: {
          accountId: '',
          accountType: '',
        },
      },
    };
    modelMock.setInnerPeriodsData = result;
    const spy$ = spyOn(model.periods$, 'pipe').and.callThrough();
    component.periodsData$.subscribe((_) => {});
    expect(spy$).toHaveBeenCalled();
  });

  it('periodsData$ not return null', () => {
    modelMock.setInnerPeriodsData = null;
    const spy$ = spyOn(model.periods$, 'pipe').and.callThrough();
    component.periodsData$.subscribe((_) => {});
    expect(spy$).toHaveBeenCalled();
  });

  it('subscriptionFailedDownload check retries > this.maxAmountRetry', () => {
    (component as any).maxAmountRetry = 3;
    spyOn(model.pdfFailedRetries$, 'pipe').and.returnValue(of(4));
    const spyClose = spyOn(component as any, 'closeModalAndNotification');
    (component as any).subscriptionFailedDownload();
    expect(spyClose).toHaveBeenCalled();
  });

  it('closeModalAndNotification with isSuccess=true', () => {
    const message = 'Tu extracto se ha descargado con éxito. 👍';
    const translate = TestBed.get(TranslateService);
    spyOn(translate, 'instant').and.returnValue(message);
    const modal = TestBed.get(ModalService);
    const spyModalClose = spyOn(modal, 'close');
    const spyNotification = spyOn(model, 'notificationOpen');
    (component as any).closeModalAndNotification(true);
    expect(spyModalClose).toHaveBeenCalled();
    expect(spyNotification).toHaveBeenCalledWith(
      message,
      true,
      ClassNotification.SUCCESS,
    );
  });

  it('closeModalAndNotification with isSuccess=false', () => {
    const message =
      'Se ha producido un error generando tu extracto. Inténtalo más tarde.😥';
    const translate = TestBed.get(TranslateService);
    spyOn(translate, 'instant').and.returnValue(message);
    const modal = TestBed.get(ModalService);
    const spyModalClose = spyOn(modal, 'close');
    const spyNotification = spyOn(model, 'notificationOpen');
    (component as any).closeModalAndNotification(false);
    expect(spyModalClose).toHaveBeenCalled();
    expect(spyNotification).toHaveBeenCalledWith(
      message,
      true,
      ClassNotification.ERROR,
    );
  });

  it('downloadPDF should be call getElementById', () => {
    const spy = spyOn(document, 'getElementById').and.returnValue({
      click(): void {},
    });
    (component as any).downloadPDF();
    expect(spy).toHaveBeenCalled();
  });
  // tslint:disable-next-line:max-file-line-count
});
