import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';

import { AlertsService } from '../../services/alerts.service';

import * as AllTypeAlert from '@modules/alerts/store/actions/groups-type.action';
import * as AllCreateAlert from '@modules/alerts/store/actions/groups.action';

import { IGroupsAlertResponse } from '../../entities/groups';

@Injectable()
export class GroupsAlertsEffect {
  constructor(private actions$: Actions, private _service: AlertsService) {}

  GroupsAlert: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AllCreateAlert.GroupsAlertsLoadAction),
      switchMap((action) => {
        return this._service.groupsAlert(action.request).pipe(
          take(1),
          map((data: IGroupsAlertResponse) => {
            if (!!data.success && data.success) {
              return AllCreateAlert.GroupsAlertsSuccessAction(data);
            }
            return AllCreateAlert.GroupsAlertsFailAction(data.errorMessage);
          }),
          catchError((error) => {
            return of(
              AllCreateAlert.GroupsAlertsFailAction(error.errorMessage),
            );
          }),
        );
      }),
    ),
  );

  GroupsTypeAlert: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AllTypeAlert.GroupsTypeAlertsLoadAction),
      switchMap((action) => {
        return this._service.groupsTypeAlert(action.request).pipe(
          take(1),
          map((data: IGroupsAlertResponse) => {
            if (!!data.success && data.success) {
              return AllTypeAlert.GroupsTypeAlertsSuccessAction(data);
            }
            return AllTypeAlert.GroupsTypeAlertsFailAction(data.errorMessage);
          }),
          catchError((error) => {
            return of(
              AllTypeAlert.GroupsTypeAlertsFailAction(error.errorMessage),
            );
          }),
        );
      }),
    ),
  );
}
