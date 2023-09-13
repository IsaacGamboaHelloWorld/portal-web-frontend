import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { EditPocketService } from '../../services/edit-pocket.service';

import { ClassNotification } from '../../../../../core/constants/notification';
import { NewPocketService } from '../../../new-pocket/services/new-pocket.service';
import { EditPocketFacade } from '../../edit-pocket.facade';
import {
  ICategoriesEPocket,
  IDeletePocketResponse,
  IEditPocketResponse,
} from '../../entities/edit-pocket';
import * as CategoriesPocketActions from '../actions/categories.action';
import * as DeletePocketActions from '../actions/delete-pocket.action';
import * as EditPocketActions from '../actions/edit-pocket.action';

@Injectable()
export class EditPocketEffect {
  constructor(
    private actions$: Actions,
    private pocketsService: EditPocketService,
    private pocketsEService: NewPocketService,
    private facade: EditPocketFacade,
  ) {}

  EditPocket: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(EditPocketActions.EditPocketLoad),
      switchMap((action) => {
        return this.pocketsService.editPocket(action.data).pipe(
          take(1),
          map((data: IEditPocketResponse) => {
            if (!!data && data.success) {
              return EditPocketActions.EditPocketSuccess(data);
            }
            this._notificationError(data);
            return EditPocketActions.EditPocketFail(data.errorMessage);
          }),
          catchError((error) => {
            this._notificationError(error);
            return of(EditPocketActions.EditPocketFail(error.errorMessage));
          }),
        );
      }),
    ),
  );

  DeletePocket: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(DeletePocketActions.DeletePocketLoad),
      switchMap((action) => {
        return this.pocketsService.deletePocket(action.data).pipe(
          take(1),
          map((data: IDeletePocketResponse) => {
            if (!!data && data.success) {
              return DeletePocketActions.DeletePocketSuccess(data);
            }
            this._notificationError(data);
            return DeletePocketActions.DeletePocketFail(data.errorMessage);
          }),
          catchError((error) => {
            this._notificationError(error);
            return of(DeletePocketActions.DeletePocketFail(error.errorMessage));
          }),
        );
      }),
    ),
  );

  LoadECategories: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesPocketActions.CategoriesEPocketLoad),
      switchMap((action) => {
        return this.pocketsEService.loadCategories().pipe(
          take(1),
          map((data: ICategoriesEPocket) => {
            if (!!data && data.success) {
              return CategoriesPocketActions.CategoriesEPocketSuccess(data);
            }
          }),
          catchError((error) => {
            return of(CategoriesPocketActions.CategoriesEPocketFail(''));
          }),
        );
      }),
    ),
  );

  private _notificationError(
    data: IEditPocketResponse | IDeletePocketResponse,
  ): void {
    this.facade.notificationOpen(
      data.errorMessage,
      true,
      ClassNotification.ERROR,
    );
  }
}
