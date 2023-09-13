import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductAllMock } from './../../../../../../../../test-helpers/mocks/data/products-all.mock';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreditCardHiddenPipe } from '@app/core/pipes/credit-card-hidden/credit-card-hidden.pipe';
import { CreditCardMaskPipe } from '@app/core/pipes/credit-card-mask/credit-card-mask.pipe';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { DetailProductModel } from '@app/modules/detail-product/detail-product.model';
import { SecurityService } from '@app/modules/security/services/security.service';
import { Security } from '@app/modules/security/utils/security';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { DetailProductModelMock } from '../../../../../../../../test-helpers/mocks/models/detail-product.model.mock';
import { TestingModule } from '../../../../../../../../test-helpers/testing.module';
import { TypeCreditCardPipe } from '../../../../../../core/pipes/type-credit-card/type-credit-card.pipe';
import { StatusProductPipe } from '../../../../pipes/status-product/status-product.pipe';
import { HeaderCardComponent } from './header-card.component';

describe('HeaderCardComponent', () => {
  let component: HeaderCardComponent;
  let fixture: ComponentFixture<HeaderCardComponent>;
  let model: DetailProductModel;
  let modelMock: DetailProductModelMock;

  beforeEach(async(() => {
    modelMock = new DetailProductModelMock();
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [
        HeaderCardComponent,
        StatusProductPipe,
        CreditCardMaskPipe,
        CreditCardHiddenPipe,
        TypeCreditCardPipe,
      ],
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
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderCardComponent);
    model = TestBed.get(DetailProductModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isTC should return true', () => {
    component.info = ProductAllMock.productList[3];
    const result = component.isTC;
  });

  it('isTC should return false', () => {
    component.info = ProductAllMock.productList[0];
    const result = component.isTC;
  });

  it('nicknamesCreate$', () => {
    const result = component.nicknamesCreate$;
    expect(result).toEqual(model.nicknamesCreate$);
  });

  it('nicknamesUpdate$', () => {
    const result = component.nicknamesUpdate$;
    expect(result).toEqual(model.nicknamesUpdate$);
  });

  it('nicknamesDelete$', () => {
    const result = component.nicknamesDelete$;
    expect(result).toEqual(model.nicknamesDelete$);
  });

  it('edit for true', () => {
    const name = 'name2';
    component.newNameProduct = name;
    component.info = ProductAllMock.productList[0];
    component.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });

    component.edit();

    expect(component.form.get('name').value).toEqual(name);
  });

  it('edit for false', () => {
    const name = 'name2';
    component.newNameProduct = null;
    component.info = ProductAllMock.productList[0];
    component.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });

    component.edit();

    expect(component.form.get('name').value).toEqual('Cuenta de Ahorros');
  });

  it('check for CREATE case', () => {
    component.action = 'CREATE';
    component.info = ProductAllMock.productList[0];

    const spy = spyOn(model, 'nicknamesCreate');

    component.check();

    expect(spy).toHaveBeenCalled();
  });

  it('check for CREATE case with success false', () => {
    component.action = 'CREATE';
    component.info = ProductAllMock.productList[0];

    modelMock.setInnerNicknameCreate = {
      success: false,
    };

    const spy = spyOn(model, 'nicknamesCreate');

    component.check();

    expect(spy).toHaveBeenCalled();
  });

  it('check for UPDATE case', () => {
    component.action = 'UPDATE';
    component.info = ProductAllMock.productList[0];

    const spy = spyOn(model, 'nicknamesUpdate');

    component.check();

    expect(spy).toHaveBeenCalled();
  });

  it('check for UPDATE case with success false', () => {
    component.action = 'UPDATE';
    component.info = ProductAllMock.productList[0];

    modelMock.setInnerNicknameUpdate = {
      success: false,
    };

    const spy = spyOn(model, 'nicknamesUpdate');

    component.check();

    expect(spy).toHaveBeenCalled();
  });

  it('check for DELETE case', () => {
    component.action = 'DELETE';
    component.info = ProductAllMock.productList[0];

    const spy = spyOn(model, 'nicknamesDelete');

    component.check();

    expect(spy).toHaveBeenCalled();
  });

  it('validText for ñ', () => {
    const event = 'ñ';

    component.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });

    component.validText(event);

    expect(component.form.get('name').value).toEqual('n');
  });

  it('validText for Ñ', () => {
    const event = 'Ñ';

    component.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });

    component.validText(event);

    expect(component.form.get('name').value).toEqual('N');
  });

  it('validText for DELETE', () => {
    const event = 'DELETE';

    component.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });

    component.validText(event);

    expect(component.form.get('name').value).toEqual('DELETE');
  });
});
