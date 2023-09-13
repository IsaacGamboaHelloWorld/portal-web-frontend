import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { blockCreditCardMock } from '../../../../../../test-helpers/mocks/data/products-blocks.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { IBlockProduct } from '../../entities/block-product';
import { BlockedProductsModel } from '../../store/model/blocked-products.model';
import { BlockProductsModelMock } from '../../store/model/mock/block-products.model.mock';
import { PopupCardLockConfirmationComponent } from './popup-card-lock-confirmation.component';

describe('PopupCardLockConfirmationComponent', () => {
  let component: PopupCardLockConfirmationComponent;
  let fixture: ComponentFixture<PopupCardLockConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PopupCardLockConfirmationComponent],
      imports: [TestingModule, ReactiveFormsModule],
      providers: [
        ManipulateDomService,
        {
          provide: BlockedProductsModel,
          useClass: BlockProductsModelMock,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupCardLockConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submitForm', () => {
    const data = blockCreditCardMock[0];
    component.card = data;

    component.typeBlock = new FormGroup({
      whyBlock: new FormControl('TEMPORARY_LOCK', Validators.required),
    });

    const dataToSend: IBlockProduct = {
      accountId: data.accountInformation.accountIdentifier,
      accountType: data.accountInformation.productType,
      refType: 'TEMPORARY_LOCK',
    };

    const model = TestBed.get(BlockedProductsModel);
    const modal = TestBed.get(ModalService);
    const spyClose = spyOn(modal, 'close');
    const spyBlock = spyOn(model, 'blockProduct');

    component.submitForm();

    expect(spyClose).toHaveBeenCalled();
    expect(spyBlock).toHaveBeenCalledWith(dataToSend);
  });

  it('setClass', () => {
    const classs = 'welcome';
    const dom = TestBed.get(ManipulateDomService);
    const spyMulti = spyOn(dom, 'removeMultipleClass');
    const spyAdd = spyOn(dom, 'addClass');

    component.setClass(classs);

    expect(spyMulti).toHaveBeenCalledWith(
      '.form-radiobutton-contanier',
      'active',
    );

    expect(spyAdd).toHaveBeenCalledWith(classs, 'active');
  });
});
