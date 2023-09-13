import { Injectable } from '@angular/core';
import { ClassNotification } from '@app/core/constants/notification';
import { GlobalDataService } from '@app/core/services/global-data/global-data.service';
import { NotificationShowAction } from '@app/store/actions/global/notification/notification.action';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, takeUntil } from 'rxjs/operators';
import { CustomerProfileCatalog } from '../../entities/load-catalog';
import { LoadCatalogService } from '../../services/load-catalog.service';
import * as CustomerProfileCatalogActions from '../actions/load-catalog.actions';

@Injectable()
export class LoadCustomerProfileCatalogEffect {
  constructor(
    private actions$: Actions,
    private globalData: GlobalDataService,
    private service: LoadCatalogService,
  ) {}

  LoadCustomerProfileCatalog: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomerProfileCatalogActions.CustomerProfileCatalogLoad),
      switchMap((action) => {
        return this.service.loadCatalog().pipe(
          takeUntil(this.globalData.cancel),
          take(1),
          map((data: CustomerProfileCatalog) => {
            if (!!data && data.success) {
              return CustomerProfileCatalogActions.CustomerProfileCatalogSuccess(
                data,
              );
            }
            return new NotificationShowAction(
              data.errorMessage,
              true,
              ClassNotification.ERROR,
            );
          }),
          catchError((error) => {
            new NotificationShowAction('', true, ClassNotification.ERROR);
            return of(
              CustomerProfileCatalogActions.CustomerProfileCatalogFailed(''),
            );
          }),
        );
      }),
    ),
  );
}
