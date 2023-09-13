import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, take } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { IAgreementSaved, ICompanyListResponse } from '../../entities/enroll';
import { EnrollService } from '../../services/enroll-service.service';
import * as fromSave from '../actions/save-agreement.action';
import * as fromSearch from '../actions/search-companies.action';

@Injectable()
export class EnrollServiceEffect {
  constructor(private actions$: Actions, private _service: EnrollService) {}

  @Effect()
  SearchCompany: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromSearch.SearchCompanyLoadAction),
      switchMap((action) => {
        return this._service.searchBillCompany(action.dataSend).pipe(
          take(1),
          map((items: ICompanyListResponse) => {
            if (!isNullOrUndefined(items.success) && items.success) {
              return fromSearch.SearchCompanySuccessAction(items);
            }
            return fromSearch.SearchCompanyFailAction(items.errorMessage);
          }),
          catchError((err) => {
            return of(fromSearch.SearchCompanyFailAction(err.errorMessage));
          }),
        );
      }),
    ),
  );

  SaveAgreement: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(fromSave.EnrollLoadAction),
      switchMap((action) => {
        return this._service.saveCompany(action.biller).pipe(
          map((item: IAgreementSaved) => {
            if (!isNullOrUndefined(item.success) && item.success) {
              return fromSave.EnrollSuccessAction(item);
            }
            return fromSave.EnrollFailAction(item.errorMessage);
          }),
          catchError((err) => {
            return of(fromSave.EnrollFailAction(''));
          }),
        );
      }),
    ),
  );
}
