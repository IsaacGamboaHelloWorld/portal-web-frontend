import { Injectable } from '@angular/core';
import { GlobalDataService } from '@core/services/global-data/global-data.service';
import { Actions } from '@ngrx/effects';
import { PaymentObligationsFacade } from '../../payment.facade';
import { PaymentFOService } from '../../services/payment.service';

@Injectable()
export class NewPaymentFOEffect {
  constructor(
    private actions$: Actions,
    private _service: PaymentFOService,
    private globalData: GlobalDataService,
    private _facade: PaymentObligationsFacade,
  ) {}

  // NewFOPayment: Observable<Action> = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(SavePaymentActions.CreateFOPaymentLoad),
  //     switchMap((action) => {
  //       return this._service.publicBillPayment(action.data).pipe(
  //         takeUntil(this.globalData.cancel),
  //         take(1),
  //         map((data) => {
  //           if (!!data && data.success) {
  //             return SavePaymentActions.CreateFOPaymentSuccess(data);
  //           }
  //           this._facade.notificationOpen(
  //             data.errorMessage,
  //             true,
  //             ClassNotification.ERROR,
  //           );
  //           return SavePaymentActions.CreateFOPaymentFail(data.errorMessage);
  //         }),
  //         catchError((error) => {
  //           this._facade.notificationOpen(
  //             error.errorMessage,
  //             true,
  //             ClassNotification.ERROR,
  //           );
  //           return of(
  //             SavePaymentActions.CreateFOPaymentFail(error.errorMessage),
  //           );
  //         }),
  //       );
  //     }),
  //   ),
  // );
}
