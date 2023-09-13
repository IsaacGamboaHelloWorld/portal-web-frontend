import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {
  DEFAULT_WIDTH,
  MEDIUM_WIDTH,
} from '@app/shared/modal/constants/modal.style';
import { Navigate } from '@core/constants/navigate';
import { TYPE_ACCOUNTS } from '@core/constants/types_account';
import { IProductActive } from '@store/reducers/models/product-active/product-active.reducer';
import { of } from 'rxjs';
import { DetailProductModelMock } from '../../../../../../test-helpers/mocks/models/detail-product.model.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { ManipulateDomService } from '../../../../core/services/manipulate-dom/manipulate-dom.service';
import { ModalService } from '../../../../shared/modal/services/modal.service';
import { SecurityService } from '../../../security/services/security.service';
import { Security } from '../../../security/utils/security';
import { DetailProductModel } from '../../detail-product.model';
import { CertificatesContainer } from '../certificates/certificates.component';
import { CurrentAccountMock } from './../../../../../../test-helpers/mocks/data/currentAccount.mock';
import { ProductsMock } from './../../../../../../test-helpers/mocks/data/products.mock';
import { PRODUCT_ACTIVATE } from './../../../../core/constants/comunication-keys';
import { StatementsContainer } from './../statements/statements.component';
import { SmartOptionsComponent } from './smart-options.component';

describe('SmartOptionsComponent', () => {
  let component: SmartOptionsComponent;
  let fixture: ComponentFixture<SmartOptionsComponent>;
  let modelMock: DetailProductModelMock;

  beforeEach(async(() => {
    modelMock = new DetailProductModelMock();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, TestingModule, RouterTestingModule],
      declarations: [SmartOptionsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        ModalService,
        ManipulateDomService,
        SecurityService,
        Security,
        {
          provide: DetailProductModel,
          useValue: modelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmartOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('hasData should be return true', () => {
    component.data = CurrentAccountMock as any;
    const result = component.hasData;
    expect(result).toBeTruthy();
  });

  it('neededToPay should be return true', () => {
    component.data = CurrentAccountMock as any;
    const result = component.neededToPay;
    expect(result).toBeTruthy();
  });

  it('call T_DA should be return TYPE_ACCOUNTS.DEPOSIT_ACCOUNT', () => {
    const result = component.T_DA;
    expect(result).toEqual(TYPE_ACCOUNTS.DEPOSIT_ACCOUNT);
  });

  it('call T_CA should be return TYPE_ACCOUNTS.CURRENT_ACCOUNT', () => {
    const result = component.T_CA;
    expect(result).toEqual(TYPE_ACCOUNTS.CURRENT_ACCOUNT);
  });

  it('call T_CC should be return TYPE_ACCOUNTS.CREDIT_CARD', () => {
    const result = component.T_CC;
    expect(result).toEqual(TYPE_ACCOUNTS.CREDIT_CARD);
  });

  it('typeProduct return type', () => {
    component.data = CurrentAccountMock as any;
    const result = component.typeProduct;
    expect(result).toEqual(CurrentAccountMock.accountInformation.productType);
  });

  it('call havePockets should be return value', () => {
    component.data = CurrentAccountMock as any;
    const result = component.havePockets;
    expect(result).toEqual(CurrentAccountMock.couldHavePockets);
  });

  it('call navigate should be return value', () => {
    const result = component.navigate;
    expect(result).toEqual(Navigate);
  });

  it('execute redirect should be call encryptAesGcm', () => {
    const type = 'DEPOSIT_ACCOUNT';
    const id = '210040736803';
    const encrypt = 'krleklrkelrkelkslkds';
    const security = TestBed.get(SecurityService);
    const spySec = spyOn(security, 'encryptAesGcm').and.returnValue(
      Promise.resolve(encrypt),
    );

    component.redirect(type, id);

    expect(spySec).toHaveBeenCalledWith(id);
  });

  it('pockets emit event with Navigate.pockets', () => {
    const data = Navigate.pockets;
    component.pockets();
    component.clickBox.subscribe((result: any) => {
      expect(result).toEqual(data);
    });
  });

  it('recharge emit event with Navigate.recharge_phone', () => {
    const data = Navigate.recharge_phone;
    component.recharge();
    component.clickBox.subscribe((result: any) => {
      expect(result).toEqual(data);
    });
  });

  it('transfer emit event with Navigate.new_transfer', () => {
    const data = Navigate.new_transfer;
    component.transfer();
    component.clickBox.subscribe((result: any) => {
      expect(result).toEqual(data);
    });
  });

  it('payment emit event with Navigate.paymentsv2obligations', () => {
    const data = Navigate.paymentsv2obligations;
    component.payment();
    component.clickBox.subscribe((result: any) => {
      expect(result).toEqual(data);
    });
  });

  it('withdrawals', () => {
    component.data = CurrentAccountMock as any;
    const data: IProductActive = {
      type: CurrentAccountMock.accountInformation.productType,
      id: CurrentAccountMock.accountInformation.accountIdentifier,
    };
    const model = TestBed.get(DetailProductModel);
    const spyModal = spyOn(model, 'setProduct');

    component.withdrawals();

    expect(spyModal).toHaveBeenCalledWith(data);
    component.clickBox.subscribe((result: any) => {
      expect(result).toEqual(Navigate.wnocandother);
    });
  });

  it('call doStatements and check open modal with inputs parameters and call _actionsModals', () => {
    const model = TestBed.get(ModalService);
    const spyModal = spyOn(model, 'open');
    component.data = CurrentAccountMock as any;

    const spyAction = spyOn(component as any, '_actionsModal');
    jasmine.clock().install();
    component.doStatements();

    expect(spyModal).toHaveBeenCalledWith(
      StatementsContainer,
      true,
      `${MEDIUM_WIDTH}`,
      true,
      component.data,
    );

    jasmine.clock().tick(10);

    expect(spyAction).toHaveBeenCalled();
    jasmine.clock().uninstall();
  });

  it('call doCertificates  and check open modal with inputs parameters and call _actionsModals', () => {
    const model = TestBed.get(ModalService);
    const spyModal = spyOn(model, 'open');
    component.data = CurrentAccountMock as any;

    const spyAction = spyOn(component as any, '_actionsModal');
    jasmine.clock().install();
    component.doCertificates();

    expect(spyModal).toHaveBeenCalledWith(
      CertificatesContainer,
      true,
      `${DEFAULT_WIDTH}`,
      true,
      component.data,
    );

    jasmine.clock().tick(10);

    expect(spyAction).toHaveBeenCalled();
    jasmine.clock().uninstall();
  });

  it('_actionsModal should be call modal.close', () => {
    const modal = TestBed.get(ModalService);
    const spyClose = spyOn(modal, 'close');
    const data = {
      instance: {
        componentRef: {
          instance: {
            actionCancel: of(''),
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

  it('hasAmount should return true', () => {
    const result = component.hasAmount(1000);
    expect(result).toBeTruthy();
  });

  it('redirectAdvance', async () => {
    component.data = CurrentAccountMock as any;
    const encrypt = 'krleklrkelrkelkslkds';
    const security = TestBed.get(SecurityService);
    const router = TestBed.get(Router);
    const spySecEncrypy = spyOn(security, 'encryptAesGcm').and.returnValue(
      Promise.resolve(encrypt),
    );
    const spySecSetItem = spyOn(security, 'setItem');
    const spyRouter = spyOn(router, 'navigate');

    await component.redirectAdvance();

    expect(spySecEncrypy).toHaveBeenCalled();
    expect(spySecSetItem).toHaveBeenCalledWith(PRODUCT_ACTIVATE, encrypt);
    expect(spyRouter).toHaveBeenCalledWith(['avance']);
  });

  it('showAdvance$ should be return false', () => {
    const products: any[] = [
      ProductsMock.CERTIFIED_DEPOSIT_TERM,
      ProductsMock.CREDIT_CARD,
      ProductsMock.CURRENT_ACCOUNT,
      ProductsMock.DEPOSIT_ACCOUNT,
    ];
    modelMock.setInnerPrpductData = products;
    component.showAdvance$.subscribe((result: any) => {
      expect(result).toBeFalsy();
    });
  });
});
