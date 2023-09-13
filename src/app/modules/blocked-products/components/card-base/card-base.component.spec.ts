import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CREDIT_CARDS_BACKGROUNDS } from '@app/core/constants/imgs_cards';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { STANDARD_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { CardFranchiseTypePipe } from '@core/pipes/card-franchise-type/card-franchise-type.pipe';
import { CardTypeclassPipe } from '@core/pipes/card-type-class/card-type-class.pipe';
import { CardTypeProductPipe } from '@core/pipes/card-type-product/card-type-product.pipe';
import { CreditCardHiddenPipe } from '@core/pipes/credit-card-hidden/credit-card-hidden.pipe';
import { CreditCardMaskPipe } from '@core/pipes/credit-card-mask/credit-card-mask.pipe';
import { productDebitCardMock } from '../../../../../../test-helpers/mocks/data/products-blocks.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { PopupCardLockConfirmationComponent } from '../popup-card-lock-confirmation/popup-card-lock-confirmation.component';
import { PopupInfoBlockedComponent } from '../popup-info-blocked/popup-info-blocked.component';
import { CardBaseComponent } from './card-base.component';

describe('CardBaseComponent', () => {
  let component: CardBaseComponent;
  let fixture: ComponentFixture<CardBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      providers: [ManipulateDomService, ModalService],
      declarations: [
        CardBaseComponent,
        CardTypeclassPipe,
        CardTypeProductPipe,
        CardFranchiseTypePipe,
        CreditCardHiddenPipe,
        CreditCardMaskPipe,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardBaseComponent);
    component = fixture.componentInstance;
    component.data = {
      accountInformation: {
        accountIdentifier: '12345678',
      },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit', () => {
    component.isDebitCard = false;
    component.data = productDebitCardMock;
    component.ngOnInit();
    expect(component.isDebitCard).toBeTruthy();
  });

  it('setupModalContentOnBlockedStatus for DEBIT_CARD', () => {
    component.data = {
      status: 'BLOCKED',
      accountInformation: {
        productType: 'DEBIT_CARD',
      },
    };

    component.setupModalContentOnBlockedStatus();

    expect(PopupInfoBlockedComponent.prototype.secondaryContent).toEqual(
      'BLOCK_PRODS.POPUPS.DEBIT_CARD_LOCK_INFO.SECONDARY_DESCRIPTION',
    );
    expect(
      PopupInfoBlockedComponent.prototype.mustAlignCenterOnMainContent,
    ).toBeFalsy();
  });

  it('setupModalContentOnBlockedStatus for ACCOUNT', () => {
    component.data = {
      status: 'BLOCKED',
      accountInformation: {
        productType: 'ACCOUNT',
      },
    };

    component.setupModalContentOnBlockedStatus();

    expect(PopupInfoBlockedComponent.prototype.secondaryContent).toEqual(null);
    expect(
      PopupInfoBlockedComponent.prototype.mustAlignCenterOnMainContent,
    ).toBeTruthy();
  });

  it('openInfo for BLOCKED', () => {
    component.data = {
      status: 'BLOCKED',
      accountInformation: {
        productType: 'DEBIT_CARD',
      },
    };
    const modal = TestBed.get(ModalService);
    const spyModal = spyOn(modal, 'open');

    component.openInfo('');

    expect(spyModal).toHaveBeenCalledWith(
      PopupInfoBlockedComponent,
      true,
      `${STANDARD_WIDTH} not-button-close`,
      true,
      component.data,
    );
  });

  it('openInfo for ACTIVE', () => {
    component.data = {
      status: 'ACTIVE',
    };
    const modal = TestBed.get(ModalService);
    const spyModal = spyOn(modal, 'open');

    component.openInfo('');

    expect(spyModal).toHaveBeenCalledWith(
      PopupCardLockConfirmationComponent,
      true,
      `${STANDARD_WIDTH}`,
      true,
      component.data,
    );
  });

  it('debitCardBackground', () => {
    const result = component.debitCardBackground;
    expect(result).toEqual(CREDIT_CARDS_BACKGROUNDS.IMG_VISA_CLASSIC);
  });
});
