import { Injectable } from '@angular/core';
import * as statementsActions from '@app/store/actions/models/statements/statements.action';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { IPdfdata } from '../../../../../core/interfaces/statement/pdfdata';
import { IStatement } from '../../../../../core/interfaces/statement/statement';
import { StatementsService } from '../services/statements.service';

@Injectable()
export class StatementEffect {
  constructor(
    private actions$: Actions,
    private destinationService: StatementsService,
  ) {}

  @Effect()
  LoadStatements: Observable<Action> = this.actions$.pipe(
    ofType<statementsActions.StatementsLoadAction>(
      statementsActions.STATEMENTS_LOAD,
    ),
    switchMap((action: statementsActions.StatementsLoadAction) => {
      return this.destinationService
        .getPeriods(action.typeAccount, action.accountId)
        .pipe(
          map((data: IStatement) => {
            if (!isNullOrUndefined(data.periods) && data.periods) {
              return new statementsActions.StatementsSuccessAction(data);
            } else {
              return new statementsActions.StatementsFailAction();
            }
          }),
          catchError((_) => of(new statementsActions.StatementsFailAction())),
        );
    }),
  );

  @Effect()
  GeneratePDF: Observable<Action> = this.actions$.pipe(
    ofType<statementsActions.StatementsGeneratePdfAction>(
      statementsActions.STATEMENTS_PDF_LOAD,
    ),
    switchMap((action: statementsActions.StatementsGeneratePdfAction) => {
      return this.destinationService
        .getPdf(action.typeAccount, action.accountId, action.value)
        .pipe(
          map((pdfData: IPdfdata) => {
            if (!isNullOrUndefined(pdfData.base64) && pdfData.base64) {
              return new statementsActions.StatementsGeneratePdfASuccessAction(
                pdfData,
              );
            } else {
              return new statementsActions.StatementsGeneratePdfAFailAction();
            }
          }),
          catchError((_) =>
            of(new statementsActions.StatementsGeneratePdfAFailAction()),
          ),
        );
    }),
  );
}
