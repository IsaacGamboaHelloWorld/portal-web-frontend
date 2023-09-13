import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { TYPE_ACCOUNTS } from '../../../../../../core/constants/types_account';
import { Product } from '../../../../../../core/models/products/product';
import { ISetPayment } from '../../../entities/financial-op';
import { FinancialOpFacade } from '../../../finantial-ob.facade';
import { UtilsService } from '../../../transversal/utils.service';
import { IPaymentFormOne } from '../../entities/new-payment';
import { PaymentObligationsFacade } from '../../payment.facade';
import { INavigatePayment, NavigatePayment } from '../navigate/routes';

@Component({
  selector: 'app-obligations-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepOneComponent implements OnInit, OnDestroy {
  private static readonly CURRENT_NUMBER_STEP: number = 1;
  private static readonly NEXT_STEP: number = 2;
  public formStart: FormGroup;
  public loadingItems: number = 2;
  private _lastOriginAccount: Product;
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  @Output() setStep: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private _facade: PaymentObligationsFacade,
    private _parent_facade: FinancialOpFacade,
    private util: UtilsService,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._setStep(StepOneComponent.CURRENT_NUMBER_STEP);
    this._subsStepOne();
    this.util.domMainContainreOb(true);
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  private _initForm(): void {
    this.formStart = new FormGroup({
      account_origin: new FormControl('', Validators.required),
      loan_destination: new FormControl('', Validators.required),
    });
  }

  public submitData(): void {
    const loan: IPaymentFormOne = {
      account_origin: this.formStart.value.account_origin,
      loan_destination: this.formStart.value.loan_destination,
    };
    this._facade.setFormOne(loan);
    this.nexStep();
  }

  public nexStep(): void {
    this.activePayment$
      .pipe(takeUntil(this._destroy$))
      .subscribe((billerdata: ISetPayment) => {
        if (!!billerdata && !!billerdata.activePayment) {
          this.setStep.emit(StepOneComponent.NEXT_STEP);
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

  private _subsStepOne(): void {
    this.getStepOne$.subscribe((data: any) => {
      this._lastOriginAccount = data.account_origin;
    });
  }

  get getStepOne$(): Observable<IPaymentFormOne> {
    return this._facade.getStepOne$;
  }

  get activePayment$(): Observable<ISetPayment> {
    return this._facade.selectActiveProduct$;
  }

  get productsOrigin$(): Observable<Product[]> {
    return this._facade.selectAllProducts$.pipe(
      map((product: Product[]) => {
        if (!!product) {
          return product.filter(
            (data) =>
              data.typeAccount === TYPE_ACCOUNTS.DEPOSIT_ACCOUNT ||
              data.typeAccount === TYPE_ACCOUNTS.CURRENT_ACCOUNT,
          );
        } else {
          return null;
        }
      }),
    );
  }

  get productDefault$(): Observable<Product> {
    return this._facade.selectAllProducts$.pipe(
      map((product: Product[]) => {
        if (!!product) {
          return product
            .filter((data) => {
              if (!!this._lastOriginAccount) {
                return (
                  data.accountInformation.accountIdentifier ===
                    this._lastOriginAccount.accountInformation
                      .accountIdentifier &&
                  data.accountInformation.productType ===
                    this._lastOriginAccount.accountInformation.productType
                );
              }
              return (
                data.typeAccount === TYPE_ACCOUNTS.DEPOSIT_ACCOUNT ||
                data.typeAccount === TYPE_ACCOUNTS.CURRENT_ACCOUNT
              );
            })
            .shift();
        } else {
          return null;
        }
      }),
    );
  }
}
