import { Component, Input, ViewEncapsulation } from '@angular/core';
import { BlockedProductsModel } from '@app/modules/blocked-products/store/model/blocked-products.model';
import { STANDARD_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { OptionModuleState } from '@app/store/reducers/global/option-module/option-module.reducer';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { Product } from '../../../../core/models/products/product';
import { DebitCardListStateData } from '../../entities/debit-cards-response';
import { PopupCardLockConfirmationComponent } from '../popup-card-lock-confirmation/popup-card-lock-confirmation.component';
import { PopupInfoBlockedComponent } from '../popup-info-blocked/popup-info-blocked.component';

@Component({
  selector: 'app-cards-list-blocked',
  templateUrl: './cards-list-blocked.component.html',
  styleUrls: ['./cards-list-blocked.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class CardsListBlockedComponent {
  @Input() productsTC: Product[];

  constructor(
    private model: BlockedProductsModel,
    private modal: ModalService,
    private translate: TranslateService,
  ) {}

  get debitCardListState$(): Observable<DebitCardListStateData> {
    return this.model.debitCardList$;
  }

  retryLoadDebitCardList(): void {
    this.model.loadDebitCards();
  }

  clickCard(data: any): void {
    const _data = this._mapDataCard(data);
    if ('BLOCKED' === data['status']) {
      this.setupModalContentOnBlockedStatus(data);
      this.modal.open(
        PopupInfoBlockedComponent,
        true,
        `${STANDARD_WIDTH} not-button-close`,
        true,
        _data,
      );
    } else {
      PopupCardLockConfirmationComponent.prototype.card = data;
      this.modal.open(
        PopupCardLockConfirmationComponent,
        true,
        `${STANDARD_WIDTH}`,
        true,
        _data,
      );
    }
  }

  setupModalContentOnBlockedStatus(data: any): void {
    const productType: string = data['accountInformation']['productType'];
    PopupInfoBlockedComponent.prototype.title = this.translate.instant(
      `BLOCK_PRODS.POPUPS.${productType}_LOCK_INFO.TITLE_ALREADY_LOCKED`,
    );
    PopupInfoBlockedComponent.prototype.subtitle = this.translate.instant(
      `BLOCK_PRODS.POPUPS.${productType}_LOCK_INFO.SUBTITLE`,
    );
    PopupInfoBlockedComponent.prototype.mainContent = this.translate.instant(
      `BLOCK_PRODS.POPUPS.${productType}_LOCK_INFO.MAIN_DESCRIPTION`,
    );
    PopupInfoBlockedComponent.prototype.secondaryContent = null;
    PopupInfoBlockedComponent.prototype.mustAlignCenterOnMainContent = true;

    if ('DEBIT_CARD' === productType) {
      PopupInfoBlockedComponent.prototype.mustAlignCenterOnMainContent = false;
      PopupInfoBlockedComponent.prototype.secondaryContent = this.translate.instant(
        `BLOCK_PRODS.POPUPS.${productType}_LOCK_INFO.SECONDARY_DESCRIPTION`,
      );
    }
    PopupInfoBlockedComponent.prototype.buttonContent = this.translate.instant(
      `BLOCK_PRODS.POPUPS.${productType}_LOCK_INFO.OK_BUTTON`,
    );
  }

  private _mapDataCard(data: any): any {
    if (!!data['card']) {
      data['accountInformation'] = {
        accountIdentifier: data['card']['cardId'],
        productType: data['card']['cardType'],
      };
    }
    return data;
  }

  get optionsModule$(): Observable<OptionModuleState> {
    return this.model.optionModule$;
  }
}
