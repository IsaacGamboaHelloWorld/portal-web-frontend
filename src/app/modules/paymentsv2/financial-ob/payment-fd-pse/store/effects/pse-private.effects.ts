import { Injectable } from '@angular/core';
import { errorMessage500 } from '@app/core/constants/global';
import { ClassNotification } from '@app/core/constants/notification';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { BanksPseResponse } from '../../entities/banks-pse.interface';
import { IPaymentPseResponse } from '../../entities/payment-transaction-pse.interface';
import { IPaymentPseStatusResponse } from '../../entities/status-pse.interface';
import { PsePrivateService } from '../../services/pse-private.service';
import {
  failBanksPseAction,
  loadBanksPseAction,
  successBanksPseAction,
} from '../actions/banks-pse.actions';
import {
  failInitPseAction,
  loadInitPseAction,
  successInitPseAction,
} from '../actions/init-pse.actions';
import {
  failStatusPseAction,
  loadStatusPseAction,
  successStatusPseAction,
} from '../actions/status-pse.action';
import { PaymentFreeDestinationModel } from '../models/payment-free-destination.model';

@Injectable()
export class PsePrivateEffects {
  constructor(
    private actions$: Actions,
    private psePrivateService: PsePrivateService,
    private model: PaymentFreeDestinationModel,
  ) {}

  loadBanks$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBanksPseAction),
      switchMap(() =>
        this.psePrivateService.banksPse().pipe(
          map((resp: BanksPseResponse) => {
            if (resp.success) {
              return successBanksPseAction({ banks: resp.banks });
            }
            return failBanksPseAction({ errorMessage: resp.errorMessage });
          }),
          catchError(() => {
            this._notificationError(errorMessage500);
            return of(failBanksPseAction({ errorMessage: errorMessage500 }));
          }),
        ),
      ),
    ),
  );

  loadInitPayment$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(loadInitPseAction),
      switchMap((action) =>
        this.psePrivateService.initPse(action.body).pipe(
          map((resp: IPaymentPseResponse) => {
            if (resp.success) {
              if (!!resp.pseUrlRedirect) {
                const pseUrlRedirect = resp.pseUrlRedirect.replace(
                  '&#x3D;',
                  '=',
                );
                this._openPse(pseUrlRedirect);
              }
              return successInitPseAction({ data: resp });
            }
            this._notificationError(resp.errorMessage);
            return failInitPseAction({ errorMessage: resp.errorMessage });
          }),
          catchError(() => {
            this._notificationError(errorMessage500);
            return of(failInitPseAction({ errorMessage: errorMessage500 }));
          }),
        ),
      ),
    ),
  );

  loadStatusPayment$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(loadStatusPseAction),
      switchMap((action) =>
        this.psePrivateService.getStatusPse(action.paymentId).pipe(
          map((resp: IPaymentPseStatusResponse) => {
            if (resp.success) {
              return successStatusPseAction({ data: resp });
            }
            this._notificationError(resp.errorMessage);
            return failStatusPseAction({ errorMessage: resp.errorMessage });
          }),
          catchError(() => {
            this._notificationError(errorMessage500);
            return of(failStatusPseAction({ errorMessage: errorMessage500 }));
          }),
        ),
      ),
    ),
  );

  private _openPse(pseUrlRedirect: string): void {
    const width = window.innerWidth;
    const height = window.innerHeight * 0.8;
    const left = window.innerWidth * 0.2;
    const top = window.innerHeight * 0.2;

    window.open(
      pseUrlRedirect,
      '_blank',
      `toolbar=yes,scrollbars=yes,resizable=yes,top=${top},left=${left},width=${width},height=${height}`,
    );
  }

  private _notificationError(error: string, specificError: string = ''): void {
    this.model.notificationOpen(
      error,
      true,
      ClassNotification.ERROR,
      false,
      specificError,
    );
  }
}
