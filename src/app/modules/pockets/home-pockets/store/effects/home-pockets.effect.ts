import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  catchError,
  concatMap,
  map,
  switchMap,
  take,
  takeUntil,
} from 'rxjs/operators';

import { CURRENT_USER } from '@app/core/constants/auth';
import { GlobalDataService } from '@app/core/services/global-data/global-data.service';
import { IPocketToSearch } from '@app/modules/pockets/move-pockets/entities/home-pockets';
import { SecurityService } from '@app/modules/security/services/security.service';
import {
  IHomePocketAccount,
  IHomePocketsRecord,
  IRespondHomePockets,
} from '@modules/pockets/home-pockets/entities/home-pockets';
import { HomePocketsService } from '@modules/pockets/home-pockets/services/home-pockets.service';
import { isNullOrUndefined } from 'util';
import { IPrefsLoadResponse } from '../../entities/home-pockets';
import { HomePocketsFacade } from '../../home-pockets.facade';
import * as HomePocketsActions from '../actions/get-pockets.action';
import * as LoadPrefActions from '../actions/load-prefs.action';
import * as SavePrefActions from '../actions/save-prefs.action';
import * as UpdatePocketsActions from '../actions/update-pockets.actions';

@Injectable()
export class HomePocketsEffect {
  constructor(
    private actions$: Actions,
    private pocketsService: HomePocketsService,
    private globalData: GlobalDataService,
    private facade: HomePocketsFacade,
    private securityService: SecurityService,
  ) {}

  HomePockets: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(HomePocketsActions.HomePocketsLoad),
      switchMap((action) => {
        return this.pocketsService.homePockets().pipe(
          takeUntil(this.globalData.cancel),
          map((data: IRespondHomePockets) => {
            if (!!data.success && data.success) {
              return HomePocketsActions.HomePocketsSuccess(
                data.currentPocketsByProduct,
              );
            }
            return HomePocketsActions.HomePocketsFail(data.errorMessage);
          }),
          catchError((error) =>
            of(HomePocketsActions.HomePocketsFail(error.errorMessage)),
          ),
        );
      }),
    ),
  );

  SavePref: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(SavePrefActions.SavePrefsLoad),
      switchMap((action) => {
        return this.pocketsService.savePrefs(action.data).pipe(
          take(1),
          map((data) => {
            if (!!data.success && data.success) {
              return SavePrefActions.SavePrefsSuccess(data);
            }
            return SavePrefActions.SavePrefsFail(data.errorMessage);
          }),
          catchError((error) =>
            of(SavePrefActions.SavePrefsFail(error.errorMessage)),
          ),
        );
      }),
    ),
  );

  LoadPref: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadPrefActions.LoadPrefsLoad),
      switchMap((action) => {
        return this.pocketsService.LoadPrefs().pipe(
          take(1),
          map((data: IPrefsLoadResponse) => {
            if (!!data.success && data.success) {
              return LoadPrefActions.LoadPrefsSuccess(data);
            }
            return LoadPrefActions.LoadPrefsFail(data.errorMessage);
          }),
          catchError((error) =>
            of(LoadPrefActions.LoadPrefsFail(error.errorMessage)),
          ),
        );
      }),
    ),
  );

  LoadPockets: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdatePocketsActions.UpdatePocketsLoad),
      concatMap((action) => {
        if (isNullOrUndefined(this.securityService.getItem(CURRENT_USER))) {
          return of(UpdatePocketsActions.UpdatePocketsReset());
        } else {
          return this.detailService(action.data);
        }
      }),
    ),
  );

  LoadPocketDetail: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdatePocketsActions.UpdateDetailPocketLoad),
      switchMap((action) => {
        return this.detailService(action.data);
      }),
    ),
  );

  private detailService(type: IPocketToSearch): Observable<Action> {
    return this.pocketsService.detailPocket(type).pipe(
      takeUntil(this.globalData.cancel),
      map((pocket: IHomePocketAccount) => {
        if (!!pocket && pocket.success) {
          return UpdatePocketsActions.UpdatePocketsSuccess(pocket.pockets[0]);
        }
        return UpdatePocketsActions.UpdatePocketsFail('');
      }),
      catchError((err) => of(UpdatePocketsActions.UpdatePocketsFail(''))),
    );
  }

  private dispatchActionDetail(pockets: IHomePocketAccount[]): void {
    pockets.forEach((list: IHomePocketAccount) => {
      list.pockets.forEach((pock: IHomePocketsRecord) => {
        const obj: IPocketToSearch = {
          pocketId: pock.pocketId,
          pocketType: pock.pocketType,
          parentAccountId: list.parent.accountIdentifier,
          parentAccountType: list.parent.productType,
        };
        this.facade.setUpdatePockets(obj);
      });
    });
  }
}
