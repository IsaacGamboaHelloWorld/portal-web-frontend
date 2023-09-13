import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { LoanDestinationRespInterface } from '@app/core/interfaces/loan-destination.interface';
import { LoansUserService } from '@modules/payments/services/loans-user/loans-user.service';
import * as fromDestination from '@store/actions/models/payment/payment-destination/payment-destination.action';

@Injectable()
export class DestinationProductsEffect {
  constructor(
    private actions$: Actions,
    private destinationService: LoansUserService,
  ) {}

  @Effect()
  LoadLoans: Observable<Action> = this.actions$.pipe(
    ofType<fromDestination.LoansDestinationLoadAction>(
      fromDestination.PAYMENT_DESTINATION_PRODUCTS_LOAD,
    ),
    switchMap((action: fromDestination.LoansDestinationLoadAction) => {
      return this.destinationService.loansToPay().pipe(
        map(
          (items: LoanDestinationRespInterface) =>
            new fromDestination.LoansDestinationSuccessAction(
              items.registeredLoans,
            ),
        ),
        catchError((_) => of(new fromDestination.LoansDestinationFailAction())),
      );
    }),
  );
}
