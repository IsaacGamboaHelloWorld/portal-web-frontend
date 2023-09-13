import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Product } from '@app/core/models/products/product';
import { STANDARD_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { PopupAccountLockConfirmationComponent } from '../popup-account-lock-confirmation/popup-account-lock-confirmation.component';
import { PopupInfoBlockedComponent } from '../popup-info-blocked/popup-info-blocked.component';

@Component({
  selector: 'app-account-base',
  templateUrl: './account-base.component.html',
  styleUrls: ['./account-base.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class AccountBaseComponent {
  @Input() data: Product = null;
  constructor(
    private modal: ModalService,
    private translate: TranslateService,
  ) {}

  openOnBlockedStatus(): void {
    PopupInfoBlockedComponent.prototype.title = this.translate.instant(
      `BLOCK_PRODS.POPUPS.ACCOUNT_LOCK_INFO.TITLE_ALREADY_LOCKED`,
    );
    PopupInfoBlockedComponent.prototype.subtitle = this.translate.instant(
      `BLOCK_PRODS.POPUPS.ACCOUNT_LOCK_INFO.SUBTITLE`,
    );
    PopupInfoBlockedComponent.prototype.mainContent = this.translate.instant(
      `BLOCK_PRODS.POPUPS.ACCOUNT_LOCK_INFO.MAIN_DESCRIPTION`,
    );
    PopupInfoBlockedComponent.prototype.secondaryContent = null;
    PopupInfoBlockedComponent.prototype.mustAlignCenterOnMainContent = true;
    PopupInfoBlockedComponent.prototype.buttonContent = this.translate.instant(
      `BLOCK_PRODS.POPUPS.ACCOUNT_LOCK_INFO.OK_BUTTON`,
    );
  }

  openInfo(_data: string): void {
    this.openOnBlockedStatus();
    if ('BLOCKED' === this.data['status']) {
      this.modal.open(
        PopupInfoBlockedComponent,
        true,
        `${STANDARD_WIDTH} not-button-close`,
        true,
        this.data,
      );
    } else {
      PopupAccountLockConfirmationComponent.prototype.card = this.data;
      this.modal.open(
        PopupAccountLockConfirmationComponent,
        true,
        `${STANDARD_WIDTH}  not-button-close`,
        true,
        this.data,
      );
    }
  }
}
