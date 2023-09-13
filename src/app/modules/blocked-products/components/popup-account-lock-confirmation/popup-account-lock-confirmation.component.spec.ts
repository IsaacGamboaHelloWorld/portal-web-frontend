import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { blockCreditCardMock } from '../../../../../../test-helpers/mocks/data/products-blocks.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { IBlockProduct } from '../../entities/block-product';
import { BlockedProductsModel } from '../../store/model/blocked-products.model';
import { BlockProductsModelMock } from '../../store/model/mock/block-products.model.mock';
import { PopupAccountLockConfirmationComponent } from './popup-account-lock-confirmation.component';

describe('PopupAccountLockConfirmationComponent', () => {
  let component: PopupAccountLockConfirmationComponent;
  let fixture: ComponentFixture<PopupAccountLockConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PopupAccountLockConfirmationComponent],
      imports: [TestingModule],
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
    fixture = TestBed.createComponent(PopupAccountLockConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('submitForm', () => {
    const data = blockCreditCardMock[0];
    component.card = data;

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

  it('closeModal', () => {
    const modal = TestBed.get(ModalService);
    const spyClose = spyOn(modal, 'close');
    component.closeModal();
    expect(spyClose).toHaveBeenCalled();
  });
});
