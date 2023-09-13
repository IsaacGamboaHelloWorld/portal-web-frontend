import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take, takeUntil } from 'rxjs/operators';

import { ClassNotification } from '../../../../../core/constants/notification';
import { GlobalDataService } from '../../../../../core/services/global-data/global-data.service';
import { NotificationShowAction } from '../../../../../store/actions/global/notification/notification.action';
import { IAnswerPocket, ICategoriesPocket } from '../../entities/new-pockets';
import { NewPocketFacade } from '../../new-pocket.facade';
import { NewPocketService } from '../../services/new-pocket.service';
import * as CategoriesPocketActions from '../actions/categories.action';
import * as SavePocketActions from '../actions/new-pocket.action';

@Injectable()
export class NewPocketEffect {
  constructor(
    private actions$: Actions,
    private pocketsService: NewPocketService,
    private facade: NewPocketFacade,
    private globalData: GlobalDataService,
  ) {}

  NewPocket: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(SavePocketActions.CreatePocketLoad),
      switchMap((action) => {
        return this.pocketsService.createPocket(action.data).pipe(
          takeUntil(this.globalData.cancel),
          take(1),
          map((data: IAnswerPocket) => {
            if (!!data && data.success) {
              return SavePocketActions.CreatePocketSuccess(data);
            }
            this.facade.creationFail(data.errorMessage);
            return new NotificationShowAction(
              data.errorMessage,
              true,
              ClassNotification.ERROR,
            );
          }),
          catchError((error) => {
            new NotificationShowAction('', true, ClassNotification.ERROR);
            return of(SavePocketActions.CreatePocketFail(''));
          }),
        );
      }),
    ),
  );

  LoadCategories: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesPocketActions.CategoriesocketLoad),
      switchMap((action) => {
        return this.pocketsService.loadCategories().pipe(
          takeUntil(this.globalData.cancel),
          take(1),
          map((data: ICategoriesPocket) => {
            if (!!data && data.success) {
              return CategoriesPocketActions.CategoriesPocketSuccess(data);
            }
            this.facade.creationFail(data.errorMessage);
            return new NotificationShowAction(
              data.errorMessage,
              true,
              ClassNotification.ERROR,
            );
          }),
          catchError((error) => {
            new NotificationShowAction('', true, ClassNotification.ERROR);
            return of(CategoriesPocketActions.CategoriesPocketFail(''));
          }),
        );
      }),
    ),
  );
}
