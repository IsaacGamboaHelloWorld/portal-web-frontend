import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { PaymentBillsRespInterface } from '@app/core/interfaces/paymentBills.interface';
import * as fromSave from '@app/store/actions/models/payment/payment-bills/save-company.action';
import * as fromCompanies from '@app/store/actions/models/payment/payment-bills/search-company.action';
import { CompanyListInterface } from '@core/interfaces/paymentBills.interface';
import { BillsUserService } from '@modules/payments/services/bills-user/bills-user.service';
import { TranslateService } from '@ngx-translate/core';
import * as fromAllRegistered from '@store/actions/models/payment/payment-bills/all-registered-bills.action';
import * as fromDestination from '@store/actions/models/payment/payment-bills/payments-bills.action';
import { isNullOrUndefined } from 'util';
import { ClassNotification } from '../../../core/constants/notification';
import { IBillerHomeResponse } from '../../../core/interfaces/paymentBills.interface';
import { PaymentModel } from '../payment.model';

@Injectable()
export class LoadBillsEffect {
  constructor(
    private actions$: Actions,
    private destinationService: BillsUserService,
    private model: PaymentModel,
    private translate: TranslateService,
  ) {}

  @Effect()
  LoadBills: Observable<Action> = this.actions$.pipe(
    ofType(fromDestination.PaymentBillsLoadAction),
    switchMap((action) => {
      return this.destinationService.billsToPay().pipe(
        map((items: PaymentBillsRespInterface) => {
          if (!isNullOrUndefined(items.success) && items.success) {
            return fromDestination.PaymentBillsSuccessAction(
              items.billerPayments,
            );
          }
          this.model.notificationOpen(
            this.translate.instant(
              'PAYMENTS.NEW_PAYMENT_STEP.ERROR_NO_SERVICES',
            ),
            true,
            ClassNotification.ERROR,
          );
          return fromDestination.PaymentBillsFailAction(items.errorMessage);
        }),
        catchError((err) => {
          this.model.notificationOpen(
            this.translate.instant(
              'PAYMENTS.NEW_PAYMENT_STEP.ERROR_NO_SERVICES',
            ),
            true,
            ClassNotification.ERROR,
          );
          return of(fromDestination.PaymentBillsFailAction(err.errorMessage));
        }),
      );
    }),
  );

  @Effect()
  LoadCompanies: Observable<Action> = this.actions$.pipe(
    ofType(fromCompanies.CompaniesBillLoadAction),
    switchMap((action) => {
      return this.destinationService.searchBillCompany(action.dataSend).pipe(
        map((items: CompanyListInterface) => {
          if (!isNullOrUndefined(items.success) && items.success) {
            return fromCompanies.CompaniesBillSuccessAction(items);
          }
          return fromCompanies.CompaniesBillFailAction(items.errorMessage);
        }),
        catchError((err) => {
          this.model.notificationOpen(
            err.errorMessage,
            true,
            ClassNotification.ERROR,
          );
          return of(fromCompanies.CompaniesBillFailAction(err.errorMessage));
        }),
      );
    }),
  );

  @Effect()
  SaveAgreement: Observable<Action> = this.actions$.pipe(
    ofType(fromSave.SaveCompanyLoadAction),
    switchMap((action) => {
      return this.destinationService.saveCompany(action.biller).pipe(
        map((item: any) => {
          if (!isNullOrUndefined(item.success) && item.success) {
            return fromSave.SaveCompanySuccessAction(item);
          }
          this.model.notificationOpen(
            item.errorMessage,
            true,
            ClassNotification.ERROR,
          );
          return fromSave.SaveCompanyFailAction(item.errorMessage);
        }),
        catchError((err) => {
          this.model.notificationOpen(
            err.errorMessage,
            true,
            ClassNotification.ERROR,
          );
          return of(fromSave.SaveCompanyFailAction(''));
        }),
      );
    }),
  );

  @Effect()
  LoadAllBills: Observable<Action> = this.actions$.pipe(
    ofType(fromAllRegistered.BillsRegisteredLoadAction),
    switchMap((action) => {
      return this.destinationService.allRegisteredBills().pipe(
        map((data: IBillerHomeResponse) => {
          if (!isNullOrUndefined(data) && data.success) {
            return fromAllRegistered.BillsRegisteredSuccessAction(data);
          }
          this.model.notificationOpen(
            this.translate.instant(
              'PAYMENTS.NEW_PAYMENT_STEP.ERROR_NO_SERVICES_LISTED',
            ),
            true,
            ClassNotification.ERROR,
          );
          return fromAllRegistered.BillsRegisteredFailAction(data.errorMessage);
        }),
        catchError((err) => {
          this.model.notificationOpen(
            this.translate.instant(
              'PAYMENTS.NEW_PAYMENT_STEP.ERROR_NO_SERVICES_LISTED',
            ),
            true,
            ClassNotification.ERROR,
          );
          return of(fromDestination.PaymentBillsFailAction(err.errorMessage));
        }),
      );
    }),
  );
}
