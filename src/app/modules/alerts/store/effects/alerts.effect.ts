import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';

import { AlertsService } from '../../services/alerts.service';

import * as AllCreateAlert from '@modules/alerts/store/actions/create-alert.action';
import * as AllAlerts from '@modules/alerts/store/actions/get-alerts.action';
import * as infoUserAlert from '@modules/alerts/store/actions/info-user.action';
import * as AllFinancial from '@modules/alerts/store/actions/registered-bills.action';
import * as AllBills from '@modules/alerts/store/actions/registered-services.action';

import { IinfoUser, ISearchUserAlertsResponse } from '../../entities/alerts';

@Injectable()
export class AlertsEffect {
  constructor(private actions$: Actions, private _service: AlertsService) {}

  LoadAllAlerts: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AllAlerts.LoadAlertsLoadAction),
      switchMap((action) => {
        return this._service.searchAlerts().pipe(
          take(1),
          map((data: ISearchUserAlertsResponse) => {
            if (!!data.success && data.success) {
              return AllAlerts.LoadAlertsSuccessAction(data.alerts);
            }
            return AllAlerts.LoadAlertsFailAction(data.errorMessage);
          }),
          catchError((err) =>
            of(AllAlerts.LoadAlertsFailAction(err.errorMessage)),
          ),
        );
      }),
    ),
  );

  LoadAllFinancialOp: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AllFinancial.AllFinancialOpAlertsLoad),
      switchMap((action) => {
        return this._service.allRegisteredFinancialOp().pipe(
          take(1),
          map((data) => {
            if (!!data.success && data.success) {
              return AllFinancial.AllFinancialOpAlertsSuccess(
                data.registeredLoans,
              );
            }
            return AllFinancial.AllFinancialOpAlertsFail(data.errorMessage);
          }),
          catchError((err) =>
            of(AllFinancial.AllFinancialOpAlertsFail(err.errorMessage)),
          ),
        );
      }),
    ),
  );

  LoadAllPublicServices: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AllBills.AllPublicServicesAlertsLoad),
      switchMap((action) => {
        return this._service.allRegisteredPublicServices().pipe(
          take(1),
          map((data: any) => {
            if (!!data.success && data.success) {
              return AllBills.AllPublicServicesAlertsSuccess(data.billers);
            }
            return AllBills.AllPublicServicesAlertsFail(data.errorMessage);
          }),
          catchError((error) => {
            return of(AllBills.AllPublicServicesAlertsFail(error.errorMessage));
          }),
        );
      }),
    ),
  );

  CreateAlert: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AllCreateAlert.CreateAlertsLoadAction),
      switchMap((action: any) => {
        return this._service.createAlert(action.request).pipe(
          take(1),
          map((data: any) => {
            if (!!data.success && data.success) {
              return AllCreateAlert.CreateAlertsSuccessAction(data.billers);
            }
            return AllCreateAlert.CreateAlertsFailAction(data.errorMessage);
          }),
          catchError((error) => {
            return of(
              AllCreateAlert.CreateAlertsFailAction(error.errorMessage),
            );
          }),
        );
      }),
    ),
  );

  GetInfoUser: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(infoUserAlert.InfoUserLoadAction),
      switchMap((action) => {
        return this._service.getInfoUser().pipe(
          take(1),
          map((data: IinfoUser) => {
            if (!!data.success && data.success) {
              return infoUserAlert.InfoUserSuccessAction(data);
            }
            return infoUserAlert.InfoUserFailAction(data.errorMessage);
          }),
          catchError((error) => {
            return of(infoUserAlert.InfoUserFailAction(error.errorMessage));
          }),
        );
      }),
    ),
  );
}
