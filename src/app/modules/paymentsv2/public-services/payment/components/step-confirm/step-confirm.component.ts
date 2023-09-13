import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { Product } from '../../../../../../core/models/products/product';
import { IPublicService } from '../../../entities/public-services';
import { PublicServicesFacade } from '../../../public-services.facade';
import { BillerDetailState } from '../../../store/reducers/biller-detail.reducer';
import {
  IPaymentFormOne,
  IPaymentFormTwo,
  IServicePublicRequest,
  ISuccessServicePayment,
} from '../../entities/new-payment';
import { PaymentServiceFacade } from '../../payment.facade';
import { INavigatePayment, NavigatePayment } from '../navigate/routes';

@Component({
  selector: 'app-payment-step-confirm',
  templateUrl: './step-confirm.component.html',
  styleUrls: ['./step-confirm.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepConfirmComponent implements OnInit, OnDestroy {
  private static readonly NEXT_STEP: number = 4;
  private static readonly CURRENT_STEP: number = 3;
  public billerId: string;
  public billerNickname: string;
  public contract: string;
  public amount: string | number;
  public from: Product;
  public to: IPublicService;
  public costTransfer: number = 0;
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  public date: object = new Date();

  @Input() backStep: number;
  @Output() setStep: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private _facade: PaymentServiceFacade,
    private _facade_parent: PublicServicesFacade,
    private _router: Router,
    private _parent_facade: PublicServicesFacade,
  ) {}

  ngOnInit(): void {
    this._setData();
    this._setStep(StepConfirmComponent.CURRENT_STEP);
    this._facade.clearPayment();
    this.paymentBill$
      .pipe(takeUntil(this._destroy$))
      .subscribe((billerdata) => this._checkPayment(billerdata));
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  private _setData(): void {
    combineLatest([this.formStepOne$, this.formStepTwo$])
      .pipe(
        take(1),
        map((data) => ({ formOne: data[0], formTwo: data[1] })),
      )
      .subscribe((info) => {
        this.billerId = info.formOne.service_destination.billerId;
        this.contract = info.formOne.service_destination.contract;
        this.amount = info.formTwo.amount
          ? info.formTwo.amount
          : info.formOne.service_destination.amount;
        this.from = info.formOne.account_origin;
        this.to = info.formOne.service_destination;
        this.billerNickname = !!info.formOne.service_destination.billerNickName
          ? info.formOne.service_destination.billerNickName
          : info.formOne.service_destination.billerNickname;
      });
  }

  public submitData(): void {
    this.selectedPayment$
      .pipe(takeUntil(this._destroy$))
      .subscribe((billerdata: BillerDetailState) => {
        const isBillerLoanDetail: boolean = !!billerdata.data;
        const dataToSend: IServicePublicRequest = {
          originAccountId: this.from.accountInformation.accountIdentifier,
          originAccountType: this.from.accountInformation.productType,
          amount:
            isBillerLoanDetail && !!this.to.amount
              ? this.to.amount
              : this.amount,
          biller: this.to.biller ? true : false,
          billerId: this.to.billerId,
          billerName: this.to.billerName,
          billerNickName: this.billerNickname,
          contract: this.to.contract,
          invoice: this.to.invoice,
          dueDate: this.to.dueDate,
          scheduledDate: this.to.scheduledDate,
          expirationDate: this.to.expirationDate,
          isScheduledPayment: this.to.isScheduledPayment,
          isDonePayment: this.to.isDonePayment,
          currencyCode: this.to.currencyCode,
          originAccountBank: this.from.accountInformation.bank,
          primaryBillerAmount:
            isBillerLoanDetail && !!billerdata.data.billerPayment
              ? this.to.primaryBillerAmount
              : null,
          primaryBillerCurrencyCode:
            isBillerLoanDetail && !!billerdata.data.billerPayment
              ? this.to.primaryBillerCurrencyCode
              : null,
          reference: this.to.contract,
          secondaryBillerAmount:
            isBillerLoanDetail && !!billerdata.data.billerPayment
              ? this.to.secondaryBillerAmount
              : null,
          secondaryBillerCurrencyCode:
            isBillerLoanDetail && !!billerdata.data.billerPayment
              ? this.to.secondaryBillerCurrencyCode
              : null,
        };
        this._facade.setPayment(dataToSend);
      });
  }

  public nexStep(): void {
    this.setStep.emit(StepConfirmComponent.NEXT_STEP);
    this._router.navigate([this.navigateInternal.step_end]);
  }

  public _setStep(step: number): void {
    this._parent_facade.setStep({ step });
  }

  private _checkPayment(payment: ISuccessServicePayment): void {
    if (payment === null || payment.data === null) {
      return;
    }
    if (!!payment && !!payment.data) {
      if (payment.data.success) {
        this.nexStep();
      }
    }
  }

  get navigateInternal(): INavigatePayment {
    return NavigatePayment;
  }

  get formStepOne$(): Observable<IPaymentFormOne> {
    return this._facade.getStepOne$;
  }

  get formStepTwo$(): Observable<IPaymentFormTwo> {
    return this._facade.getStepTwo$;
  }

  get selectedPayment$(): Observable<BillerDetailState> {
    return this._facade_parent.selectedPayment$;
  }

  get paymentBill$(): Observable<any> {
    return this._facade.paymentBill$;
  }
}
