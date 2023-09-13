import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  BLOCKED_ERRORS_CODE,
  errorMessage500,
} from '@app/core/constants/global';
import { DsModalComponent } from '@app/shared/ds/ds-modal/components/ds-modal/ds-modal.component';
import { checkNested } from '@app/shared/helpers/checkNested.helper';
import { mapErrorReponse } from '@app/shared/helpers/mapErrorResponse.helper';
import { SMALL_WIDTH } from '@app/shared/modal/constants/modal.style';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { INavigate, Navigate, Titles } from '@core/constants/navigate';
import { ClassNotification } from '@core/constants/notification';
import { AccountTransferInterface } from '@core/interfaces/accountTransfer.interface';
import { TransferModel } from '@modules/transfer-to-account/transfer.model';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { IResNewTransfer } from '../../entities/new-transfer.interface';
import { NewTransferService } from '../../services/new-transfer/new-transfer.service';
import {
  NewTransferActionFail,
  NewTransferActionLoad,
  NewTransferActionSuccess,
} from '../actions/new-transfer.actions';

@Injectable()
export class NewTransferEffect {
  private codesProductBlocked: string[] = BLOCKED_ERRORS_CODE;

  constructor(
    private actions$: Actions,
    private newTransferService: NewTransferService,
    private _modelTransfer: TransferModel,
    private router: Router,
    private translateService: TranslateService,
    private modalService: ModalService,
  ) {}

  get navigate(): INavigate {
    return Navigate;
  }

  LoadTransfer: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(NewTransferActionLoad),
      switchMap((action: any) => {
        return this.newTransferService.accountTransfer(action.newTransfer).pipe(
          map((data: IResNewTransfer) => {
            this._loadTranslate();
            if (!isNullOrUndefined(data.success) && data.success) {
              return NewTransferActionSuccess({ data });
            } else {
              const isErrorBlocked = this._checkErrorIsBlocked(data);
              const mapError = mapErrorReponse(data);
              if (isErrorBlocked) {
                this._openModal(mapError);
              } else {
                this._goToHome(mapError);
              }
              return NewTransferActionFail({
                errorMessage: data.specificErrorCode,
              });
            }
          }),
          catchError((err) => {
            const message = isNullOrUndefined(err)
              ? ''
              : typeof err === 'string'
              ? err
              : err.errorMessage;
            this._modelTransfer.notificationOpen(
              message,
              false,
              ClassNotification.ERROR,
            );
            return of(
              NewTransferActionFail({
                errorMessage: errorMessage500,
                specificErrorMessage: errorMessage500,
              }),
            );
          }),
        );
      }),
    ),
  );

  private _loadTranslate(): void {
    this.codesProductBlocked = this.translateService.instant(
      'BLOCK_PRODS.POPUPS.TRANSFER_ERROR.STATUS_CODE_ERRORS',
    );
  }

  private _checkErrorIsBlocked(payment: AccountTransferInterface): boolean {
    return !!this.codesProductBlocked.find(
      (code: string) =>
        !!payment.specificErrorCode && code === payment.specificErrorCode,
    );
  }

  private _goToHome(mapError: [string, string]): void {
    this._modelTransfer.notificationOpen(
      mapError[0],
      false,
      ClassNotification.ERROR,
      false,
      mapError[1],
    );
    this.router.navigate([this.navigate.transfer]);
  }

  private _openModal(mapError: [string, string]): void {
    this.modalService.open(
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
        this.modalService._dialogComponentRef,
      )
    ) {
      const component = this.modalService._dialogComponentRef.instance
        .componentRef.instance;
      component.img = '/essential-warning-6@3x.png';
      component.typeModal = 'warning';
      component.title = this.translateService.instant(
        `BLOCK_PRODS.POPUPS.TRANSFER_ERROR.TITLE`,
      );
      component.subtitle = this.translateService.instant(
        `BLOCK_PRODS.POPUPS.TRANSFER_ERROR.SUBTITLE`,
      );
      component.description = this.translateService.instant(
        `BLOCK_PRODS.POPUPS.TRANSFER_ERROR.MAIN_DESCRIPTION`,
      );
      component.btnAgree = this.translateService.instant(
        `BLOCK_PRODS.POPUPS.TRANSFER_ERROR.OK_BUTTON`,
      );

      const subs = component.actionAgree.subscribe(() => {
        this.modalService.close();
        this._goToHome(mapError);
        subs.unsubscribe();
      });
    }
  }
}
