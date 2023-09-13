import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

import * as payment_bank_loans from '@app/store/actions/models/banks/payments-bank-loans.action';
import { IBank } from '@core/interfaces/banks.interface';
import { BanksService } from '@core/services/banks/banks.service';
import * as banks from '@store/actions/models/banks/banks.action';
import * as payment_banks from '@store/actions/models/banks/payments-banks.action';
import { IBankLoan } from '../interfaces/bankLoan.interface';

@Injectable()
export class BanksEffect {
  constructor(private actions$: Actions, private banksService: BanksService) {}

  @Effect()
  LoadBanks: Observable<Action> = this.actions$.pipe(
    ofType<banks.LoadBanksAction>(banks.LOAD_BANKS),
    switchMap((_) => {
      return this.banksService.banks().pipe(
        map((resp: IBank) => {
          if (!isNullOrUndefined(resp.success) && resp.success) {
            return new banks.SuccessBanksAction(resp.banks);
          } else {
            return new banks.ErrorBanksAction();
          }
        }),
        catchError((err) => of(new banks.ErrorBanksAction())),
      );
    }),
  );

  @Effect()
  LoadLoansAvailableBanks: Observable<Action> = this.actions$.pipe(
    ofType<payment_banks.LoadLoansAvailableBanksAction>(
      payment_banks.LOAD_LOANS_AVAILABLE_BANKS,
    ),
    switchMap((_) => {
      return this.banksService.loansAvailablebanks().pipe(
        map((resp: IBank) => {
          if (!isNullOrUndefined(resp.success) && resp.success) {
            return new payment_banks.SuccessBanksAction(resp.banks);
          } else {
            return new payment_banks.ErrorBanksAction();
          }
        }),
        catchError((err) => of(new payment_banks.ErrorBanksAction())),
      );
    }),
  );

  @Effect()
  LoadBankLoans: Observable<Action> = this.actions$.pipe(
    ofType<payment_bank_loans.LoadBankLoansAction>(
      payment_bank_loans.LOAD_BANK_LOANS,
    ),
    switchMap((action: payment_bank_loans.LoadBankLoansAction) => {
      return this.banksService.bankLoans(action.bank).pipe(
        map((resp: IBankLoan) => {
          if (!isNullOrUndefined(resp.success) && resp.success) {
            return new payment_bank_loans.SuccessBankLoansAction(resp.loans);
          } else {
            return new payment_bank_loans.ErrorBankLoansAction();
          }
        }),
        catchError((err) => of(new payment_bank_loans.ErrorBankLoansAction())),
      );
    }),
  );
}
