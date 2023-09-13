import { Injectable } from '@angular/core';
import { BLOCKED_ERRORS_CODE } from '@app/core/constants/global';
import { TYPE_ACCOUNTS } from '@app/core/constants/types_account';
import {
  BlockProductFail,
  BlockProductLoad,
  BlockProductSuccess,
} from '@app/modules/blocked-products/store/actions/block-product.action';
import { DsModalComponent } from '@app/shared/ds/ds-modal/components/ds-modal/ds-modal.component';
import { checkNested } from '@app/shared/helpers/checkNested.helper';
import { mapErrorReponse } from '@app/shared/helpers/mapErrorResponse.helper';
import {
  SMALL_WIDTH,
  STANDARD_WIDTH,
} from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { ClassNotification } from '@core/constants/notification';
import { GlobalDataService } from '@core/services/global-data/global-data.service';
import { BlockProductService } from '@modules/blocked-products/services/block-products.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { PopupInfoBlockedComponent } from '../../components/popup-info-blocked/popup-info-blocked.component';
import { IBlockProductResponse } from '../../entities/block-product-response';
import { BlockedProductsModel } from '../model/blocked-products.model';

@Injectable()
export class BlockProductsEffects {
  private codesProductBlocked: string[] = BLOCKED_ERRORS_CODE;

  constructor(
    private actions$: Actions,
    private model: BlockedProductsModel,
    private globalData: GlobalDataService,
    private blockProds: BlockProductService,
    private translate: TranslateService,
    private modal: ModalService,
  ) {}

  BlockProd$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(BlockProductLoad),
      switchMap((action) => {
        this._loadTranslate();
        return this.blockProds.blockProduct(action.request).pipe(
          takeUntil(this.globalData.cancel),
          map((data: IBlockProductResponse) => {
            let lockType: string;
            switch (action.request.accountType) {
              case TYPE_ACCOUNTS.CREDIT_CARD:
                lockType = TYPE_ACCOUNTS.CREDIT_CARD;
                break;
              case 'DEBIT_CARD':
                lockType = 'DEBIT_CARD';
                break;
              default:
                lockType = 'ACCOUNT';
            }
            if (!isNullOrUndefined(data.success) && data.success) {
              this.setupModalContentOnBlockedStatus(lockType);

              setTimeout(() => {
                this.modal.open(
                  PopupInfoBlockedComponent,
                  true,
                  `${STANDARD_WIDTH} not-button-close`,
                  true,
                  {},
                );
              }, 500);
              return BlockProductSuccess(data);
            }
            setTimeout(() => {
              const isErrorBlocked = this._checkErrorIsBlocked(data);
              if (isErrorBlocked) {
                this._openBlockedModal();
              }
              const mapResponse = mapErrorReponse(data);
              this.model.notificationOpen(
                mapResponse[0],
                true,
                ClassNotification.ERROR,
                false,
                mapResponse[1],
              );
            }, 500);

            return BlockProductFail(data.errorMessage);
          }),
          catchError((err) => {
            return of(BlockProductFail(err.errorMessage));
          }),
        );
      }),
    ),
  );

  setupModalContentOnBlockedStatus(productType: string): void {
    PopupInfoBlockedComponent.prototype.title = this.translate.instant(
      `BLOCK_PRODS.POPUPS.${productType}_LOCK_INFO.TITLE_LOCK_SUCCESS`,
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

  private _loadTranslate(): void {
    this.codesProductBlocked = this.translate.instant(
      'BLOCK_PRODS.POPUPS.TRANSFER_ERROR.STATUS_CODE_ERRORS',
    );
  }

  private _checkErrorIsBlocked(data: IBlockProductResponse): boolean {
    return !!this.codesProductBlocked.find(
      (code: string) =>
        !!data.specificErrorCode && code === data.specificErrorCode,
    );
  }

  private _openBlockedModal(): void {
    this.modal.open(DsModalComponent, true, `${SMALL_WIDTH} not-button-close`);
    setTimeout(() => this._actionsModal(), 10);
  }

  public _actionsModal(): void {
    if (
      checkNested(
        ['instance', 'componentRef', 'instance'],
        this.modal._dialogComponentRef,
      )
    ) {
      const component = this.modal._dialogComponentRef.instance.componentRef
        .instance;
      component.img = '/essential-warning-6@3x.png';
      component.typeModal = 'warning';
      component.title = this.translate.instant(
        `BLOCK_PRODS.POPUPS.TRANSFER_ERROR.TITLE`,
      );
      component.subtitle = this.translate.instant(
        `BLOCK_PRODS.POPUPS.TRANSFER_ERROR.SUBTITLE`,
      );
      component.description = this.translate.instant(
        `BLOCK_PRODS.POPUPS.TRANSFER_ERROR.MAIN_DESCRIPTION`,
      );
      component.btnAgree = this.translate.instant(
        `BLOCK_PRODS.POPUPS.TRANSFER_ERROR.OK_BUTTON`,
      );

      const subs = component.actionAgree.subscribe(() => {
        this.modal.close();
        subs.unsubscribe();
      });
    }
  }
}
