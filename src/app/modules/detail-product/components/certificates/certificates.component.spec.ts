import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ClassNotification } from '@app/core/constants/notification';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { Security } from '@app/modules/security/utils/security';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { SanitizerurlsPipe } from '@core/pipes/sanitizerurls/sanitizerurls.pipe';
import { SecurityService } from '@modules/security/services/security.service';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { CurrentAccountMock } from '../../../../../../test-helpers/mocks/data/currentAccount.mock';
import { PdfMock } from '../../../../../../test-helpers/mocks/data/pdf.mock';
import { CertificatesModelMock } from '../../../../../../test-helpers/mocks/models/certificates.model.mock';
import { DetailProductModelMock } from '../../../../../../test-helpers/mocks/models/detail-product.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { DialogConfig } from '../../../../shared/modal/services/dialog-config';
import { DetailProductModel } from '../../detail-product.model';
import { CertificatesContainer } from './certificates.component';
import { CertificateModel } from './certificates.model';
import { CertificatesService } from './services/certificates.service';

describe('CertificatesComponent', () => {
  let component: CertificatesContainer;
  let fixture: ComponentFixture<CertificatesContainer>;
  let model: CertificateModel;
  let modelMock: CertificatesModelMock;

  const pdfData = PdfMock;
  const currentAccount = CurrentAccountMock;

  beforeEach(async(() => {
    modelMock = new CertificatesModelMock();
    TestBed.configureTestingModule({
      declarations: [CertificatesContainer, SanitizerurlsPipe],
      imports: [TestingModule, HttpClientTestingModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        DialogConfig,
        CertificatesService,
        SecurityService,
        Security,
        ManipulateDomService,
        TranslateService,
        ModalService,
        {
          provide: DetailProductModel,
          useClass: DetailProductModelMock,
        },
        {
          provide: CertificateModel,
          useValue: modelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificatesContainer);
    model = TestBed.get(CertificateModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('spy on generate', () => {
    const spy = spyOn(component, 'doChange');
    component.doChange();
    expect(spy).toHaveBeenCalled();
  });

  afterEach(() => {
    component.ngOnDestroy();
  });

  it('onInit with dialogConfig.data', () => {
    component.dialogConfig.data = currentAccount;
    spyOn(component as any, '_initForm');
    component.ngOnInit();
    expect(component.currentProduct).toEqual(component.dialogConfig.data);
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
      component.currentProduct.accountInformation.productType.toString(),
      component.currentProduct.accountInformation.accountIdentifier.toString(),
      false,
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
      component.currentProduct.accountInformation.productType.toString(),
      component.currentProduct.accountInformation.accountIdentifier.toString(),
      false,
    );
    expect(component.inProcess).toBeFalsy();
    expect(component.isReadyToDownload).toBeTruthy();
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

  it('subsFailedDownload check retries > this.maxAmountRetry', () => {
    (component as any).maxAmountRetry = 3;
    spyOn(model.pdfFailedRetries$, 'pipe').and.returnValue(of(4));
    const spyClose = spyOn(component as any, 'closeAndNotificate');
    (component as any).subsFailedDownload();
    expect(spyClose).toHaveBeenCalled();
  });

  it('closeAndNotificate with isSuccess=true', () => {
    const message = 'Tu certiticado se ha descargado con éxito. 👍';
    const translate = TestBed.get(TranslateService);
    spyOn(translate, 'instant').and.returnValue(message);
    const modal = TestBed.get(ModalService);
    const spyModalClose = spyOn(modal, 'close');
    const spyNotification = spyOn(model, 'notificationOpen');
    (component as any).closeAndNotificate(true);
    expect(spyModalClose).toHaveBeenCalled();
    expect(spyNotification).toHaveBeenCalledWith(
      message,
      true,
      ClassNotification.SUCCESS,
    );
  });

  it('closeAndNotificate with isSuccess=false', () => {
    const message =
      'Se ha producido un error generando tu certiticado. Inténtalo más tarde.😥';
    const translate = TestBed.get(TranslateService);
    spyOn(translate, 'instant').and.returnValue(message);
    const modal = TestBed.get(ModalService);
    const spyModalClose = spyOn(modal, 'close');
    const spyNotification = spyOn(model, 'notificationOpen');
    (component as any).closeAndNotificate(false);
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
});
