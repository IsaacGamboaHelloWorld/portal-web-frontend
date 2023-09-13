import { Injectable } from '@angular/core';
import {
  AdvertisingInfo,
  AdvertisingResponse,
} from '@app/core/models/advertising/advertisingData';
import { GlobalDataService } from '@app/core/services/global-data/global-data.service';
import { AdvertisingService } from '@app/modules/home/services/advertising.service';
import { SecurityService } from '@app/modules/security/services/security.service';

import {
  advertisingFailed,
  advertisingSuccess,
  ToAdvertisingLoad,
} from '@app/store/actions/models/advertising/advertising.action';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, takeUntil } from 'rxjs/operators';

@Injectable()
export class AdvertisingEffects {
  constructor(
    private globalData: GlobalDataService,
    private actions$: Actions,
    private advertisingService: AdvertisingService,
    private secureService: SecurityService,
  ) {}
  LoadAdvertising: Observable<Action> = createEffect(() => {
    return this.actions$.pipe(
      ofType(ToAdvertisingLoad),
      switchMap(() => {
        return this.advertisingService.allAdvertising().pipe(
          take(1),
          takeUntil(this.globalData.cancel),
          map((advertisingOnStore: AdvertisingResponse) => {
            return processAdvertisingResponse(advertisingOnStore);
          }),
          catchError((err) => of(advertisingFailed(err.errorMessage))),
        );
      }),
    );
  });
}

function processAdvertisingResponse(
  advertisingOnStore: AdvertisingResponse,
): TypedAction<string> {
  if (!!advertisingOnStore && advertisingOnStore.success) {
    // filter map
    const filterMap = new Map<string, AdvertisingInfo>();
    let mapAdvertising = new Map<string, AdvertisingInfo>();
    mapAdvertising = new Map(Object.entries(advertisingOnStore.advertising));
    mapAdvertising.forEach((advertising: AdvertisingInfo, key: string) => {
      // only add advertising with ok response
      if (advertising.error_messages == null) {
        filterMap.set(key, advertising);
        // add response on storage
        sessionStorage.setItem(key, JSON.stringify(mapAdvertising.get(key)));
      }
    });

    if (filterMap.size > 0) {
      return advertisingSuccess(filterMap);
    }
  }
  return advertisingFailed(advertisingOnStore.errorMessage);
}
