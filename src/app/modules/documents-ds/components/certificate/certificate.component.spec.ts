import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ClassNotification } from '@app/core/constants/notification';
import { TYPE_ACCOUNTS } from '@app/core/constants/types_account';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { typeCardEnum } from '@app/shared/card-account-radius/constants/type-card.enum';
import { DsModalComponent } from '@app/shared/ds/ds-modal/components/ds-modal/ds-modal.component';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { of } from 'rxjs';
import { PaymentsV2ModelMock } from '../../../../../../test-helpers/mocks/data/paymentsV2.mock';
import { ProductAllMock } from '../../../../../../test-helpers/mocks/data/products-all.mock';
import { TributaryModelMock } from '../../../../../../test-helpers/mocks/models/tributary.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { DocumentsService } from '../../services/documents.service';
import { UtilsDocumentsService } from '../../services/utils-documents.service';
import { CertificateModel } from '../../store/model/certificate.model';
import { HomeModelDocuments } from '../../store/model/home.model';
import { CertificateComponent } from './certificate.component';

describe('CertificateComponent', () => {
  let component: CertificateComponent;
  let fixture: ComponentFixture<CertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CertificateComponent],
      imports: [TestingModule, HttpClientTestingModule, RouterTestingModule],
      providers: [
        ManipulateDomService,
        ModalService,
        DocumentsService,
        UtilsDocumentsService,
        {
          provide: CertificateModel,
          useClass: TributaryModelMock,
        },
        {
          provide: HomeModelDocuments,
          useClass: PaymentsV2ModelMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('scrollHandler', () => {
    const event = {
      target: {
        children: [
          {
            offsetWidth: 0,
          },
        ],
        scrollLeft: 0,
      },
    };
    component.scrollHandler(event);
    expect(component.activeStep).toEqual(0);
  });

  it('scrollHandler without children', () => {
    const event = {
      target: {
        children: [],
        scrollLeft: 0,
      },
    };
    component.scrollHandler(event);
    expect(component.activeStep).toEqual(0);
  });

  it('selectData', () => {
    const event = {
      data: ProductAllMock.productList[0],
    };
    component.selectData(event);
    expect(component.accountAlias.value).toEqual('500800459807');
    expect(component.typeAlias.value).toEqual('DEPOSIT_ACCOUNT');
  });

  it('selectData without data', () => {
    const event = {
      data: {
        accountInformation: null,
      },
    };
    component.selectData(event);
    expect(component.accountAlias.value).toEqual('');
    expect(component.typeAlias.value).toEqual('');
  });

  it('_mapStateCertificate when success is true', () => {
    const data: any = {
      account: {},
      data: '',
      base64: '',
      name: '',
      type: '',
      accountInformation: {
        accountId: '101010',
        accountType: 'DEPOSIT_ACCOUNT',
      },
      success: true,
      loading: false,
      loaded: false,
      errorMessage: '',
      specificErrorMessage: '',
    };
    spyOn(component as any, '_downloadPdf').and.returnValue(true);
    const facade = TestBed.get(HomeModelDocuments);
    const spyNot = spyOn(facade, 'notificationOpen');

    (component as any)._mapStateCertificate(data);

    expect(spyNot).toHaveBeenCalledWith(
      'DOCUMENTS.CERTIFICATE.DETAIL.SUCCESS',
      true,
      ClassNotification.SUCCESS,
    );
  });

  it('_mapStateCertificate when success is true and downloaded is false', () => {
    const data: any = {
      account: {},
      data: '',
      base64: '',
      name: '',
      type: '',
      accountInformation: {
        accountId: '101010',
        accountType: 'DEPOSIT_ACCOUNT',
      },
      success: true,
      loading: false,
      loaded: false,
      errorMessage: '',
      specificErrorMessage: '',
    };
    spyOn(component as any, '_downloadPdf').and.returnValue(false);
    const facade = TestBed.get(HomeModelDocuments);
    const spyNot = spyOn(facade, 'notificationOpen');

    (component as any)._mapStateCertificate(data);

    expect(spyNot).not.toHaveBeenCalled();
  });

  it('_mapStateCertificate when success is false', () => {
    const data: any = {
      account: {},
      data: '',
      base64: '',
      name: '',
      type: '',
      accountInformation: {
        accountId: '101010',
        accountType: 'DEPOSIT_ACCOUNT',
      },
      success: false,
      loading: false,
      loaded: false,
      errorMessage: '',
      specificErrorMessage: '',
    };
    const spy = spyOn(component as any, '_openModal');

    component.retryCount = 5;
    (component as any)._maxAmountRetry = 3;

    (component as any)._mapStateCertificate(data);

    expect(spy).toHaveBeenCalled();
  });

  it('_mapStateCertificate when success is false and retryCount < maxAmountRetry', () => {
    const data: any = {
      account: {},
      data: '',
      base64: '',
      name: '',
      type: '',
      accountInformation: {
        accountId: '101010',
        accountType: 'DEPOSIT_ACCOUNT',
      },
      success: false,
      loading: false,
      loaded: false,
      errorMessage: '',
      specificErrorMessage: '',
    };
    const spy = spyOn(component as any, '_openModal');

    component.retryCount = 1;
    (component as any)._maxAmountRetry = 3;

    (component as any)._mapStateCertificate(data);

    expect(spy).not.toHaveBeenCalled();
  });

  it('donwload', () => {
    const model = TestBed.get(CertificateModel);
    const spy = spyOn(model, 'creationLoad');

    component.donwload();

    expect(spy).toHaveBeenCalled();
  });

  it('donwload when _downloadWasSuccess is true', () => {
    (component as any)._downloadWasSuccess = true;
    const spy = spyOn(component as any, '_goToHome');

    component.donwload();

    expect(spy).toHaveBeenCalled();
  });

  it('_downloadPdf should be call getElementById', () => {
    const document = TestBed.get(DocumentsService);
    const data = {
      base64: '',
    };
    const spy = spyOn(document, 'downloadPDF');

    (component as any)._downloadPdf(data);

    expect(spy).toHaveBeenCalled();
  });

  it('_filterProducts', () => {
    const data = ProductAllMock.productList;

    const result = (component as any)._filterProducts(data[0]);

    expect(result).toBeFalsy();
  });

  it('_mapProducts', () => {
    const data = ProductAllMock.productList;

    const result = (component as any)._mapProducts(data);

    const filter = data.filter((product: any) => {
      return (
        product.typeAccount === TYPE_ACCOUNTS.DEPOSIT_ACCOUNT ||
        product.typeAccount === TYPE_ACCOUNTS.CURRENT_ACCOUNT
      );
    });

    expect(result).toEqual(filter);
  });

  it('indexAlias', () => {
    const result = component.indexAlias;
    expect(result).toEqual(component.formProduct.get('index'));
  });

  it('getTypeCard', () => {
    const result = component.getTypeCard;
    expect(result).toEqual(typeCardEnum);
  });

  it('products$', () => {
    const spy = spyOn(component as any, '_mapProducts');
    component.products$.subscribe((_data: any) => {
      expect(spy).toHaveBeenCalled();
    });
  });

  it('trackByFn', () => {
    const product = ProductAllMock.productList[0];
    const result = component.trackByFn(1, product);
    expect(result).not.toBeDefined();
  });

  it('_openModal', () => {
    const modal = TestBed.get(ModalService);
    const spyModal = spyOn(modal, 'open');

    const spyActions = spyOn(component as any, '_actionsModal');

    jasmine.clock().install();

    (component as any)._openModal();

    expect(spyModal).toHaveBeenCalledWith(
      DsModalComponent,
      true,
      `${SMALL_WIDTH} not-button-close`,
    );

    jasmine.clock().tick(10);
    expect(spyActions).toHaveBeenCalled();
    jasmine.clock().uninstall();
  });

  it('_actionsModal should be call modal.close', () => {
    const modal = TestBed.get(ModalService);
    const spyClose = spyOn(modal, 'close');
    const data = {
      instance: {
        componentRef: {
          instance: {
            img: '/essential-warning-6@3x.png',
            title: 'DOCUMENTS.CERTIFICATE.MODAL_ERROR.TITLE',
            description: 'DOCUMENTS.CERTIFICATE.MODAL_ERROR.TITLE',
            btnAgree: 'DOCUMENTS.CERTIFICATE.MODAL_ERROR.BTN',
            actionAgree: of(''),
          },
        },
      },
    };

    modal._dialogComponentRef = data;
    (component as any)._actionsModal();

    expect(spyClose).toHaveBeenCalled();
  });

  it('_actionsModal should be not call modal.close', () => {
    const modal = TestBed.get(ModalService);
    const spyClose = spyOn(modal, 'close');

    modal._dialogComponentRef = null;
    (component as any)._actionsModal();

    expect(spyClose).not.toHaveBeenCalled();
  });
  // tslint:disable-next-line:max-file-line-count
});
