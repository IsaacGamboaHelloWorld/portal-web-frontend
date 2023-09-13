import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BLOCKED_ERRORS_CODE } from '@app/core/constants/global';
import { DsModalComponent } from '@app/shared/ds/ds-modal/components/ds-modal/ds-modal.component';
import { checkNested } from '@app/shared/helpers/checkNested.helper';
import { mapErrorReponse } from '@app/shared/helpers/mapErrorResponse.helper';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { ClassNotification } from '@core/constants/notification';
import { GlobalDataService } from '@core/services/global-data/global-data.service';
import { AdvanceFacade } from '@modules/advance/advance.facade';
import { IAdvanceResp } from '@modules/advance/entities/advance';
import { AdvanceService } from '@modules/advance/services/advance.service';
import {
  fetchAdvanceFail,
  fetchAdvanceLoad,
  fetchAdvanceSuccess,
} from '@modules/advance/store/actions/advance.action';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';
import { advanceRootRoute } from '../../constants/routes';
import { StepService } from '../../services/step.service';

@Injectable()
export class TransferAdvanceEffect {
  private codesProductBlocked: string[] = BLOCKED_ERRORS_CODE;

  constructor(
    private actions$: Actions,
    private advanceService: AdvanceService,
    private globalDataService: GlobalDataService,
    private _facade: AdvanceFacade,
    private translate: TranslateService,
    private router: Router,
    private _modalService: ModalService,
    private _stepService: StepService,
  ) {}

  TransferAdvance: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchAdvanceLoad),
      switchMap((action) => {
        this._loadTranslate();
        return this.advanceService.advanceTransfer(action.body).pipe(
          takeUntil(this.globalDataService.cancel),
          map((data: IAdvanceResp) => {
            if (data.success) {
              return fetchAdvanceSuccess(data);
            }
            const isErrorBlocked = this._checkErrorIsBlocked(data);
            const mapResponse = mapErrorReponse(data);
            if (isErrorBlocked) {
              this._openModal();
            } else {
              this._goToHome();
            }
            this._notificationError(mapResponse[0], mapResponse[1]);
            return fetchAdvanceFail(data.errorMessage);
          }),
          catchError((err) => {
            const { errorMessage } = err;
            if (!!errorMessage) {
              this._notificationError(err);
            }
            return of(fetchAdvanceFail(null));
          }),
        );
      }),
    ),
  );

  private _notificationError(error: string, specificError: string = ''): void {
    this._facade.notificationOpen(
      error,
      true,
      ClassNotification.ERROR,
      false,
      specificError,
    );
  }

  private _loadTranslate(): void {
    this.codesProductBlocked = this.translate.instant(
      'BLOCK_PRODS.POPUPS.TRANSFER_ERROR.STATUS_CODE_ERRORS',
    );
  }

  private _checkErrorIsBlocked(payment: any): boolean {
    return !!this.codesProductBlocked.find(
      (code: string) =>
        !!payment.specificErrorCode && code === payment.specificErrorCode,
    );
  }

  private _goToHome(): void {
    this.router.navigate([`/${advanceRootRoute}`]);
    this._stepService.setStep(1);
    this._facade.advanceReset();
  }

  private _openModal(): void {
    this._modalService.open(
      DsModalComponent,
      true,
      `${SMALL_WIDTH} not-button-close`,
    );
    setTimeout(() => this._actionsModal(), 10);
  }

  public _actionsModal(): void {
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
        this._modalService.close();
        this._goToHome();
        subs.unsubscribe();
      });
    }
  }
}
