import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { INavigate, Navigate } from '@app/core/constants/navigate';
import { TYPE_ACCOUNTS } from '@app/core/constants/types_account';
import { TYPE_PAYMENTS } from '@app/modules/payments/home-payments/constants/types';
import { PaymentModel } from '@app/modules/payments/payment.model';
import { UtilsService } from '@app/modules/paymentsv2/financial-ob/transversal/utils.service';
import { OptionModuleState } from '@app/store/reducers/global/option-module/option-module.reducer';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Record } from '../../../../choose-history/entities/choose-history';
import { IFinancialOp } from '../../../entities/financial-op';
import { FinancialOpFacade } from '../../../finantial-ob.facade';
import { IHistoricPayments } from '../../../store/reducers/payment-history.reducer';
import { IActiveFinancialOpPaymentPayments } from '../../../store/reducers/selected-payment.reducer';
import { ID_BANK_POPULAR } from './../../../../../../core/constants/global';
import { ManipulateDomService } from './../../../../../../core/services/manipulate-dom/manipulate-dom.service';

@Component({
  selector: 'app-registered-obligation',
  templateUrl: './registered-obligation.component.html',
  styleUrls: ['./registered-obligation.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisteredObligationComponent implements OnInit, OnDestroy {
  actived: boolean = false;
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  public paymentSelected?: IFinancialOp;
  public showFavorite: boolean = false; // TODO: quitar cuando se habilite el servicio para marcar como favorito
  public showHistoryTable: boolean = false; // TODO: quitar cuando se ajuste el servicio que trae el historial completo

  constructor(
    private _facade: FinancialOpFacade,
    private _model: PaymentModel,
    private _router: Router,
    private _util: UtilsService,
    private dom: ManipulateDomService,
  ) {
    this._subscriptions();
  }

  ngOnInit(): void {
    this._setupDom(true);
    this._dispatchActions();
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
    this._util.OnDestroy();
    this._setupDom(false);
  }

  private _setupDom(isAdd: boolean): void {
    if (isAdd) {
      this.dom.addClass('.main-container-transaction', 'pb-width-full');
      this.dom.addClass('.main-container-transaction', 'pb-col-sp-4');
      this.dom.addClass(
        '.main-container-transaction',
        'changes-styles-in-security',
      );
      this.dom.addClass('.main-container-transaction-section', 'pb-col-ld-10');
    } else {
      this.dom.removeClass('.main-container-transaction', 'pb-width-full');
      this.dom.removeClass('.main-container-transaction', 'pb-col-sp-4');
      this.dom.removeClass(
        '.main-container-transaction',
        'changes-styles-in-security',
      );
      this.dom.removeClass(
        '.main-container-transaction-section',
        'pb-col-ld-10',
      );
    }
  }

  paymentSubmit(): void {
    if (!isNullOrUndefined(this.paymentSelected)) {
      this._facade.selectPayment(this.paymentSelected);
      this.optionsModule$
        .subscribe((data: OptionModuleState) =>
          this._mapOptionModule(this.paymentSelected, data),
        )
        .unsubscribe();
    }
  }

  private _mapOptionModule(
    $event: IFinancialOp,
    data: OptionModuleState,
  ): void {
    if (
      !data ||
      !data.data ||
      !data.data.payments ||
      !data.data.payments.options
    ) {
      this._doPayRedirect($event, false, false);
      return;
    }
    const isPseTC = data.data.payments.options.payment_pse_credit_card;
    const isPseFD = data.data.payments.options.payment_pse_free_destiny;
    this._doPayRedirect($event, isPseFD, isPseTC);
  }

  private _doPayRedirect(
    $event: IFinancialOp,
    isPseFD: boolean,
    isPseTC: boolean,
  ): void {
    const typeProduct = $event.accountType;
    const bank = $event.bank;
    const isPseTCNavigate =
      isPseTC &&
      (typeProduct === TYPE_PAYMENTS.CREDIT_CARD ||
        typeProduct === TYPE_PAYMENTS.TC) &&
      bank === ID_BANK_POPULAR;
    const isPseFDNavigate =
      isPseFD &&
      typeProduct === TYPE_PAYMENTS.CREDIT &&
      bank === ID_BANK_POPULAR;
    const isPseNavigate = isPseFDNavigate || isPseTCNavigate;
    this._facade.setFlowFreeDestination(isPseNavigate);
    this._router.navigate([
      isPseNavigate ? Navigate.paymentsv2payForPse : Navigate.paymentsv2payloan,
    ]);
  }

  changeStatusClick(_event: any): void {}

  private _dispatchActions(): void {
    this._facade.fetchHistoric();
  }

  private _subscriptions(): void {
    this.selectedPayment$
      .pipe(takeUntil(this._destroy$))
      .subscribe((data: IActiveFinancialOpPaymentPayments) => {
        this.paymentSelected = data.activePayment;
      });

    this._util
      .getRefresh()
      .pipe(takeUntil(this._destroy$))
      .subscribe((_) => {
        this._router.navigate([Navigate.paymentsv2obligations]);
      });
  }

  public doDeleteFinancialOp($event: any): void {
    const data = {
      data: $event,
    };
    this._util.doDeleteFinancialOp(data);
  }

  private _filterForPayment(histories: IHistoricPayments): Record[] {
    if (
      histories &&
      histories.data &&
      histories.data.length > 0 &&
      this.paymentSelected &&
      this.paymentSelected.accountId
    ) {
      return histories.data.filter((history) => {
        if (
          !!history.loanPaymentData &&
          history.loanPaymentData.accountId &&
          history.loanPaymentData.accountId === this.paymentSelected.accountId
        ) {
          return history.loanPaymentData;
        }
        if (
          !!history.creditCardPaymentData &&
          history.creditCardPaymentData.accountId &&
          history.creditCardPaymentData.accountId ===
            this.paymentSelected.accountId
        ) {
          return history.creditCardPaymentData;
        }
        if (
          !!history.billerPaymentData &&
          history.billerPaymentData.accountId &&
          history.billerPaymentData.accountId === this.paymentSelected.accountId
        ) {
          return history.billerPaymentData;
        }
        if (
          !!history.nonBillerPaymentData &&
          history.nonBillerPaymentData.accountId &&
          history.nonBillerPaymentData.accountId ===
            this.paymentSelected.accountId
        ) {
          return history.nonBillerPaymentData;
        }
        if (
          !!history.taxPaymentData &&
          history.taxPaymentData.accountId &&
          history.taxPaymentData.accountId === this.paymentSelected.accountId
        ) {
          return history.taxPaymentData;
        }
        if (
          !!history.psePaymentData &&
          history.psePaymentData.accountId &&
          history.psePaymentData.accountId === this.paymentSelected.accountId
        ) {
          return history.psePaymentData;
        }
      });
    }
  }

  get navigate(): INavigate {
    return Navigate;
  }

  get selectedPayment$(): Observable<IActiveFinancialOpPaymentPayments> {
    return this._facade.selectedPayment$;
  }

  get historicPayments$(): Observable<IHistoricPayments> {
    return this._facade.historicPayments$.pipe(
      takeUntil(this._destroy$),
      map((histories: IHistoricPayments) => {
        const result: IHistoricPayments = {
          ...histories,
          data: this._filterForPayment(histories) as any,
        };
        return result;
      }),
    );
  }

  get T_CC(): boolean {
    return (
      this.paymentSelected.accountType === TYPE_ACCOUNTS.CREDIT_CARD ||
      this.paymentSelected.accountType === 'TC'
    );
  }

  get optionsModule$(): Observable<OptionModuleState> {
    return this._model.optionModule$;
  }
}
