import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CardFranchiseTypePipe } from '@app/core/pipes/card-franchise-type/card-franchise-type.pipe';
import { CardTypeclassPipe } from '@app/core/pipes/card-type-class/card-type-class.pipe';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { DsMaskCreditCardPipe } from '@app/shared/ds/ds-credit-card/pipes/ds-mask-credit-card.pipe';
import { STANDARD_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { debitCardListStateDataMock } from '../../../../../../test-helpers/mocks/data/products-blocks.mock';
import { TestingModule } from '../../../../../../test-helpers/testing.module';
import { BlockedProductsModel } from '../../store/model/blocked-products.model';
import { BlockProductsModelMock } from '../../store/model/mock/block-products.model.mock';
import { PopupCardLockConfirmationComponent } from '../popup-card-lock-confirmation/popup-card-lock-confirmation.component';
import { PopupInfoBlockedComponent } from '../popup-info-blocked/popup-info-blocked.component';
import { CardsListBlockedComponent } from './cards-list-blocked.component';

describe('CardsListBlockedComponent', () => {
  let component: CardsListBlockedComponent;
  let fixture: ComponentFixture<CardsListBlockedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TestingModule],
      declarations: [
        CardsListBlockedComponent,
        DsMaskCreditCardPipe,
        CardTypeclassPipe,
        CardFranchiseTypePipe,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        {
          provide: BlockedProductsModel,
          useClass: BlockProductsModelMock,
        },
        ModalService,
        ManipulateDomService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsListBlockedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('retryLoadDebitCardList', () => {
    const model = TestBed.get(BlockedProductsModel);
    const spy = spyOn(model, 'loadDebitCards');

    component.retryLoadDebitCardList();

    expect(spy).toHaveBeenCalled();
  });

  it('setupModalContentOnBlockedStatus for DEBIT_CARD', () => {
    const data = {
      status: 'BLOCKED',
      accountInformation: {
        productType: 'DEBIT_CARD',
      },
    };

    component.setupModalContentOnBlockedStatus(data);

    expect(PopupInfoBlockedComponent.prototype.secondaryContent).toEqual(
      'BLOCK_PRODS.POPUPS.DEBIT_CARD_LOCK_INFO.SECONDARY_DESCRIPTION',
    );
    expect(
      PopupInfoBlockedComponent.prototype.mustAlignCenterOnMainContent,
    ).toBeFalsy();
  });

  it('setupModalContentOnBlockedStatus for ACCOUNT', () => {
    const data = {
      status: 'BLOCKED',
      accountInformation: {
        productType: 'ACCOUNT',
      },
    };

    component.setupModalContentOnBlockedStatus(data);

    expect(PopupInfoBlockedComponent.prototype.secondaryContent).toEqual(null);
    expect(
      PopupInfoBlockedComponent.prototype.mustAlignCenterOnMainContent,
    ).toBeTruthy();
  });

  it('clickCard for BLOCKED', () => {
    const data = {
      status: 'BLOCKED',
      accountInformation: {
        productType: 'DEBIT_CARD',
      },
    };
    const modal = TestBed.get(ModalService);
    const spyModal = spyOn(modal, 'open');

    component.clickCard(data);

    expect(spyModal).toHaveBeenCalledWith(
      PopupInfoBlockedComponent,
      true,
      `${STANDARD_WIDTH} not-button-close`,
      true,
      data,
    );
  });

  it('clickCard for ACTIVE', () => {
    const data = {
      status: 'ACTIVE',
    };
    const modal = TestBed.get(ModalService);
    const spyModal = spyOn(modal, 'open');

    component.clickCard(data);

    expect(spyModal).toHaveBeenCalledWith(
      PopupCardLockConfirmationComponent,
      true,
      `${STANDARD_WIDTH}`,
      true,
      data,
    );
  });

  it('_mapDataCard for if', () => {
    const data = debitCardListStateDataMock.data.debitCards[0];
    const result = (component as any)._mapDataCard(data);
    expect(result['accountInformation']['accountIdentifier']).toEqual(
      data['card']['cardId'],
    );
    expect(result['accountInformation']['productType']).toEqual(
      data['card']['cardType'],
    );
  });
});
