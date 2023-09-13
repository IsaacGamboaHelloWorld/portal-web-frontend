import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

import { BLOCKED_ERRORS_CODE } from '@app/core/constants/global';
import { ClassNotification } from '@app/core/constants/notification';
import { DsModalComponent } from '@app/shared/ds/ds-modal/components/ds-modal/ds-modal.component';
import { checkNested } from '@app/shared/helpers/checkNested.helper';
import { mapErrorReponse } from '@app/shared/helpers/mapErrorResponse.helper';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { GlobalDataService } from '@core/services/global-data/global-data.service';
import { IRespondOperators } from '@modules/recharge-phone/entities/operatators';
import { IRespondRecharge } from '@modules/recharge-phone/entities/recharge';
import { CellPhoneRechargeService } from '@modules/recharge-phone/services/cell-phone-recharge.service';
import { OperatorsNameService } from '@modules/recharge-phone/services/operators-name.service';
import { TranslateService } from '@ngx-translate/core';
import {
  OperatorsFail,
  OperatorsLoad,
  OperatorsSuccess,
} from '@store/actions/models/recharge/operators-name-action';
import {
  RechargeFail,
  RechargeLoad,
  RechargeSuccess,
} from '@store/actions/models/recharge/recharge-action';
import { RechargeModel } from '../recharge.model';

@Injectable()
export class RechargeEffects {
  private codesProductBlocked: string[] = BLOCKED_ERRORS_CODE;

  constructor(
    private actions$: Actions,
    private operatorsService: OperatorsNameService,
    private globalData: GlobalDataService,
    private cellPhoneRecharge: CellPhoneRechargeService,
    private _translateService: TranslateService,
    private _modalService: ModalService,
    private model: RechargeModel,
  ) {}

  LoadOperators$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(OperatorsLoad),
      switchMap(() => {
        return this.operatorsService.operators().pipe(
          takeUntil(this.globalData.cancel),
          map((data: IRespondOperators) => {
            if (!isNullOrUndefined(data.success) && data.success) {
              return OperatorsSuccess(data.mobileOperators);
            }
            return OperatorsFail(data.errorMessage);
          }),
          catchError((err) => of(OperatorsFail(err.errorMessage))),
        );
      }),
    ),
  );

  Recharge$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(RechargeLoad),
      switchMap((action) => {
        this._loadTranslate();
        return this.cellPhoneRecharge.recharge(action.form).pipe(
          takeUntil(this.globalData.cancel),
          map((data: IRespondRecharge) => {
            if (!isNullOrUndefined(data.success) && data.success) {
              return RechargeSuccess(data);
            }
            const isErrorBlocked = this._checkErrorIsBlocked(data);
            const mapError = mapErrorReponse(data);
            if (isErrorBlocked) {
              this._openModal(mapError);
            } else {
              this._goToHome(mapError);
            }
            return RechargeFail(data.errorMessage, data.specificErrorCode);
          }),
          catchError((err) => of(RechargeFail(err.errorMessage))),
        );
      }),
    ),
  );

  private _loadTranslate(): void {
    this.codesProductBlocked = this._translateService.instant(
      'BLOCK_PRODS.POPUPS.TRANSFER_ERROR.STATUS_CODE_ERRORS',
    );
  }

  private _checkErrorIsBlocked(data: IRespondRecharge): boolean {
    return !!this.codesProductBlocked.find(
      (code: string) =>
        !!data.specificErrorCode && code === data.specificErrorCode,
    );
  }

  private _goToHome(mapError: [string, string]): void {
    setTimeout(() => {
      this.model.notificationOpen(
        mapError[0],
        true,
        ClassNotification.ERROR,
        false,
        mapError[1],
      );
      this.model.setStep(1);
    }, 10);
  }

  private _openModal(mapError: [string, string]): void {
    this._modalService.open(
      DsModalComponent,
      true,
      `${SMALL_WIDTH} not-button-close`,
    );
    setTimeout(() => this._actionsModal(mapError), 10);
  }

  public _actionsModal(mapError: [string, string]): void {
    if (
      checkNested(
        ['instance', 'componentRef', 'instance'],
        this._modalService._dialogComponentRef,
      )
    ) {
      const component = this._modalService._dialogComponentRef.instance
        .componentRef.instance;
      component.img = '/essential-warning-6@3x.png';
      component.typeModal = 'warning';
      component.title = this._translateService.instant(
        `BLOCK_PRODS.POPUPS.TRANSFER_ERROR.TITLE`,
      );
      component.subtitle = this._translateService.instant(
        `BLOCK_PRODS.POPUPS.TRANSFER_ERROR.SUBTITLE`,
      );
      component.description = this._translateService.instant(
        `BLOCK_PRODS.POPUPS.TRANSFER_ERROR.MAIN_DESCRIPTION`,
      );
      component.btnAgree = this._translateService.instant(
        `BLOCK_PRODS.POPUPS.TRANSFER_ERROR.OK_BUTTON`,
      );
      const subs = component.actionAgree.subscribe(() => {
        this._modalService.close();
        this._goToHome(mapError);
        subs.unsubscribe();
      });
    }
  }
}
