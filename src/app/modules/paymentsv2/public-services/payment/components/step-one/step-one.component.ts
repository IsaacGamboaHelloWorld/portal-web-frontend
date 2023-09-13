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
import { TYPE_ACCOUNTS } from '@app/core/constants/types_account';
import { Product } from '@app/core/models/products/product';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ISetPayment } from '../../../entities/public-services';
import { PublicServicesFacade } from '../../../public-services.facade';
import { UtilsService } from '../../../transversal/utils.service';
import { IPaymentFormOne } from '../../entities/new-payment';

import { PaymentServiceFacade } from '../../payment.facade';
import { INavigatePayment, NavigatePayment } from '../navigate/routes';

@Component({
  selector: 'app-payment-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class PaymentStepOneComponent implements OnInit, OnDestroy {
  private static readonly CURRENT_NUMBER_STEP: number = 1;
  private static readonly NEXT_STEP: number = 2;
  private static readonly CONFIRMATION_STEP: number = 3;
  public formStart: FormGroup;
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  public loadingItems: number = 2;
  @Output() setStep: EventEmitter<number> = new EventEmitter<number>();
  @Output() setBack: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private _facade: PaymentServiceFacade,
    private _util: UtilsService,
    private _router: Router,
    private _parent_facade: PublicServicesFacade,
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._setStep(PaymentStepOneComponent.CURRENT_NUMBER_STEP);
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  private _initForm(): void {
    this.formStart = new FormGroup({
      account_origin: new FormControl('', Validators.required),
      service_destination: new FormControl('', Validators.required),
    });
  }

  public trackByFn(index: number, product: Product): string {
    return product.id;
  }

  public submitData(): void {
    const bill: IPaymentFormOne = {
      account_origin: this.formStart.value.account_origin,
      service_destination: this.formStart.value.service_destination,
    };

    this._facade.setFormOne(bill);
    this.nexStep();
  }

  public nexStep(): void {
    this.activePayment$
      .pipe(takeUntil(this._destroy$))
      .subscribe((billerdata: ISetPayment) => {
        if (!!billerdata && !!billerdata.payData && billerdata.payData.biller) {
          this.setStep.emit(PaymentStepOneComponent.CONFIRMATION_STEP);
          this._router.navigate([this.navigateInternal.step_confirmation]);
        } else {
          this.setStep.emit(PaymentStepOneComponent.NEXT_STEP);
          this._router.navigate([this.navigateInternal.step2]);
        }
      });
  }

  public _setStep(step: number): void {
    this._parent_facade.setStep({ step });
  }

  get navigateInternal(): INavigatePayment {
    return NavigatePayment;
  }

  get activePayment$(): Observable<ISetPayment> {
    return this._facade.selectActiveProduct$;
  }

  get navigate(): INavigatePayment {
    return NavigatePayment;
  }

  get productsOrigin$(): Observable<Product[]> {
    return this._facade.selectAllProducts$.pipe(
      map((product: Product[]) =>
        product.filter(
          (data) =>
            data.typeAccount === TYPE_ACCOUNTS.DEPOSIT_ACCOUNT ||
            data.typeAccount === TYPE_ACCOUNTS.CURRENT_ACCOUNT,
        ),
      ),
    );
  }

  get productDefault$(): Observable<Product> {
    return this._util.productDefault$;
  }
}
