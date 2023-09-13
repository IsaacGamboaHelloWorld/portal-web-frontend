import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { INavigate, Navigate } from '@core/constants/navigate';
import { PaymentInterface } from '@core/interfaces/paymentObligation.interface';
import { AccountPaymentState } from '@store/reducers/models/payment/account-payment/account-payment.reducer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  createJpeg,
  downloadImage,
} from '../../../../../../shared/helpers/download-image';
import { PaymentModel } from '../../../../../payments/payment.model';
import { FinancialOpFacade } from '../../../finantial-ob.facade';
import {
  IPaymentFormOne,
  IPaymentFormThree,
  IPaymentFormTwo,
} from '../../entities/new-payment';
import { PaymentObligationsFacade } from '../../payment.facade';
import { INavigatePayment, NavigatePayment } from '../navigate/routes';

@Component({
  selector: 'app-obligations-step-end',
  templateUrl: './step-end.component.html',
  styleUrls: ['./step-end.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class StepEndComponent implements OnInit, OnDestroy {
  private static readonly CURRENT_STEP: number = 5;
  public disabled: boolean = false;
  public costTransfer: number = 0.0;

  constructor(
    private _model: PaymentModel,
    private _facade: PaymentObligationsFacade,
    private cd: ChangeDetectorRef,
    private _parent_facade: FinancialOpFacade,
  ) {}

  ngOnInit(): void {
    this._setStep(StepEndComponent.CURRENT_STEP);
  }
  ngOnDestroy(): void {
    this._model.resetPayment();
  }

  public download(): void {
    this.disabled = true;
    createJpeg('voucher-payment')
      .then((dataUrl) => {
        downloadImage('voucher-payment.jpg', dataUrl);
        this._resetDisabled();
      })
      .catch(() => this._resetDisabled());
  }

  private _resetDisabled(): void {
    this.disabled = false;
    this.cd.detectChanges();
  }

  get payment$(): Observable<PaymentInterface> {
    return this._model.payment$.pipe(
      map((data: AccountPaymentState) => data.data),
    );
  }

  get stepOne$(): Observable<IPaymentFormOne> {
    return this._facade.getStepOne$;
  }

  get stepTwo$(): Observable<IPaymentFormTwo> {
    return this._facade.getStepTwo$;
  }

  get stepThree$(): Observable<IPaymentFormThree> {
    return this._facade.getStepThree$;
  }

  get navigate(): INavigate {
    return Navigate;
  }

  public _setStep(step: number): void {
    this._parent_facade.setStep({ step });
  }

  get navigateInternal(): INavigatePayment {
    return NavigatePayment;
  }
}
