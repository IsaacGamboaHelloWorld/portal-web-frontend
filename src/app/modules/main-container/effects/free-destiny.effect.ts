import { Injectable } from '@angular/core';
import { CURRENT_USER } from '@app/core/constants/auth';
import {
  ResponseFreeDestinationAll,
  ResponseFreeDestinationDetail,
} from '@app/core/interfaces/free-destination.interface';
import { SecurityService } from '@app/modules/security/services/security.service';
import {
  freeDestinyDetailFail,
  freeDestinyDetailLoad,
  freeDestinyDetailSuccess,
} from '@app/store/actions/models/free-destiny/free-destination-detail.actions';
import { TYPE_ACCOUNTS } from '@core/constants/types_account';
import { ProductsService } from '@modules/main-container/services/products.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { MainContainerModel } from '../main-container.model';
import { DetailsService } from '../services/details.service';
import { FreeDestination } from './../../../core/interfaces/free-destination.interface';
import { GlobalDataService } from './../../../core/services/global-data/global-data.service';
import {
  freeDestinyAllCancel,
  freeDestinyAllFailed,
  freeDestinyAllLoad,
  freeDestinyAllSuccess,
} from './../../../store/actions/models/free-destiny/free-destinations.action';

@Injectable()
export class FreeDestinyEffects {
  constructor(
    private actions$: Actions,
    private globalData: GlobalDataService,
    private productService: ProductsService,
    private detailPService: DetailsService,
    private model: MainContainerModel,
    private securityService: SecurityService,
  ) {}

  LoadFreeDestinations: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(freeDestinyAllLoad),
      switchMap(() => {
        return this.productService.allFreeDestination().pipe(
          takeUntil(this.globalData.cancel),
          map((freeDestiny: ResponseFreeDestinationAll) => {
            if (!!freeDestiny && freeDestiny.freeDestinationCredits) {
              const data = freeDestiny.freeDestinationCredits.map(
                (item: FreeDestination) => {
                  return {
                    ...item,
                    accountInformation: {
                      productType: TYPE_ACCOUNTS.FREE_DESTINATION,
                      accountIdentifier: item.accountIdentifier,
                    },
                  };
                },
              );
              this._dispatchActionDetail(data);
              return freeDestinyAllSuccess(data);
            }
            return freeDestinyAllFailed(freeDestiny.errorMessage);
          }),
          catchError((err) => of(freeDestinyAllFailed(err.errorMessage))),
        );
      }),
    ),
  );

  LoadFreeDestiny: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(freeDestinyDetailLoad),
      concatMap((action) => {
        if (isNullOrUndefined(this.securityService.getItem(CURRENT_USER))) {
          return of(freeDestinyAllCancel());
        } else {
          return this._requestDetailService(action.accountIdentifier);
        }
      }),
    ),
  );

  private _dispatchActionDetail(freeDestiny: FreeDestination[]): void {
    freeDestiny.forEach((item: FreeDestination) => {
      this.model.fetchFreeDestiny(item.accountIdentifier, item);
    });
  }

  private _requestDetailService(id: string): Observable<Action> {
    return this.detailPService.getFreeDestinationDetail(id).pipe(
      takeUntil(this.globalData.cancel),
      map((freeDestinationsDetail: ResponseFreeDestinationDetail) => {
        if (
          !!freeDestinationsDetail &&
          freeDestinationsDetail.freeDestinationCredit
        ) {
          return freeDestinyDetailSuccess(
            id,
            freeDestinationsDetail.freeDestinationCredit,
          );
        }
        return freeDestinyDetailFail(id, freeDestinationsDetail.errorMessage);
      }),
      catchError((err) => of(freeDestinyDetailFail(id, ''))),
    );
  }
}
