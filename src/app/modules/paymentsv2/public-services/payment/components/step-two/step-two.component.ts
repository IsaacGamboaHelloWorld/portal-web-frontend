import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '@app/core/models/products/product';
import { ClassNotification } from '@core/constants/notification';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PublicServicesFacade } from '../../../public-services.facade';
import { UtilsService } from '../../../transversal/utils.service';
import { IPaymentFormTwo } from '../../entities/new-payment';
import { PaymentServiceFacade } from '../../payment.facade';
import { INavigatePayment, NavigatePayment } from '../navigate/routes';

@Component({
  selector: 'app-payment-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class StepTwoComponent implements OnInit, OnDestroy {
  private static readonly NEXT_STEP: number = 3;
  private static readonly CURRENT_STEP: number = 2;
  public formSecondStep: FormGroup;
  private _productDefault: Product;
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  @Output() setStep: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private _facade: PaymentServiceFacade,
    private _translate: TranslateService,
    private _util: UtilsService,
    private _router: Router,
    private _parent_facade: PublicServicesFacade,
  ) {}

  ngOnInit(): void {
    this._subsProductDefault();
    this._initForm();
    this._setStep(StepTwoComponent.CURRENT_STEP);
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  private _subsProductDefault(): void {
    this.productDefault$
      .pipe(takeUntil(this._destroy$))
      .subscribe((product: Product) => (this._productDefault = product));
  }

  private _initForm(): void {
    this.formSecondStep = new FormGroup({
      amount: new FormControl('', Validators.required),
    });
  }

  public submitData(): void {
    const _amount = this.formSecondStep.value.amount;
    const _balance = this._productDefault.productAccountBalances
      ? this._productDefault.productAccountBalances.saldo_disponible.amount
      : 0;
    if (_amount > _balance) {
      this._insufficientBalance();
      return;
    }
    const amount: IPaymentFormTwo = {
      amount: _amount,
    };

    this._facade.setFormTwo(amount);
    this.nexStep();
  }

  public nexStep(): void {
    this._router.navigate([this.navigateInternal.step_confirmation]);
    this.setStep.emit(StepTwoComponent.NEXT_STEP);
  }

  public _setStep(step: number): void {
    this._parent_facade.setStep({ step });
  }

  get navigateInternal(): INavigatePayment {
    return NavigatePayment;
  }

  private _insufficientBalance(): void {
    this._facade.notificationOpen(
      this._translate.instant(
        'PAYMENTSV2.PUBLIC_SERVICES.SECTIONS.PAYMENT.STEPS.STEP2.INSUFFICIENT_BALANCE',
      ),
      true,
      ClassNotification.ERROR,
    );
  }

  get productDefault$(): Observable<Product> {
    return this._util.productDefault$;
  }
}
