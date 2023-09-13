import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { CREDIT_CARDS_BACKGROUNDS } from '@app/core/constants/imgs_cards';
import { STANDARD_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { PopupCardLockConfirmationComponent } from '../popup-card-lock-confirmation/popup-card-lock-confirmation.component';
import { PopupInfoBlockedComponent } from '../popup-info-blocked/popup-info-blocked.component';

@Component({
  selector: 'app-card-base',
  templateUrl: './card-base.component.html',
  styleUrls: ['./card-base.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class CardBaseComponent implements OnInit {
  @Input() data: any = null;

  isDebitCard: boolean = false;

  constructor(
    private modal: ModalService,
    private translate: TranslateService,
  ) {}

  ngOnInit(): void {
    if (!!this.data['card']) {
      this.data['accountInformation'] = {
        accountIdentifier: this.data['card']['cardId'],
        productType: this.data['card']['cardType'],
      };
      this.isDebitCard = true;
    }
  }

  setupModalContentOnBlockedStatus(): void {
    const productType: string = this.data['accountInformation']['productType'];
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

  openInfo(_data: string): void {
    if ('BLOCKED' === this.data['status']) {
      this.setupModalContentOnBlockedStatus();
      this.modal.open(
        PopupInfoBlockedComponent,
        true,
        `${STANDARD_WIDTH} not-button-close`,
        true,
        this.data,
      );
    } else {
      PopupCardLockConfirmationComponent.prototype.card = this.data;
      this.modal.open(
        PopupCardLockConfirmationComponent,
        true,
        `${STANDARD_WIDTH}`,
        true,
        this.data,
      );
    }
  }

  get debitCardBackground(): string {
    return CREDIT_CARDS_BACKGROUNDS.IMG_VISA_CLASSIC;
  }
}
