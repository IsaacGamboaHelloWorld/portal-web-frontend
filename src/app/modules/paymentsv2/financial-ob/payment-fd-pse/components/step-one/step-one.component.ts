import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TYPE_ACCOUNTS } from '@app/core/constants/types_account';
import { Product } from '@app/core/models/products/product';
import { NavigatePayment } from '@app/modules/paymentsv2/financial-ob/payment/components/navigate/routes';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ISetPayment } from '../../../entities/financial-op';
import { FinancialOpFacade } from '../../../finantial-ob.facade';
import { IPaymentFormOne } from '../../../payment/entities/new-payment';
import { PaymentObligationsFacade } from '../../../payment/payment.facade';
import { StepPaymentPseEnum } from '../../constants/step-payment-pse.enum';
import { NavigatePaymentFD } from '../../navigate/routes';
import { PaymentFreeDestinationModel } from '../../store/models/payment-free-destination.model';
import { ManipulateDomService } from './../../../../../../core/services/manipulate-dom/manipulate-dom.service';
import { ISetFormOne } from './../../entities/step-form-one.interface';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class StepOneComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public indexSelected: number = -1;
  private _accountsForPayments: Product[] = [];
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _model: PaymentFreeDestinationModel,
    private _facade_parent: FinancialOpFacade,
    private _facade: PaymentObligationsFacade,
    private _router: Router,
    private _cd: ChangeDetectorRef,
    private _dom: ManipulateDomService,
  ) {
    this._createForm();
  }

  ngOnInit(): void {
    this._dom.scrollContentTop();
    this._model.fetchBanksPse();
    this._model.resetInitPaymentPse();
    this._model.resetStatusPaymentPse();
    this._subsActivePayment();
    this.setStep(StepPaymentPseEnum.step_1);
    setTimeout(() => this._cd.markForCheck(), 10);
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  private _createForm(): void {
    this.form = new FormGroup({
      index: new FormControl('', Validators.required),
      origin: new FormControl(null),
      destination: new FormControl(null),
    });
    this._setValuesForm();
  }

  private _setValuesForm(): void {
    this.formOne$
      .subscribe((data: ISetFormOne) => {
        this.indexAlias.setValue(data.index);
      })
      .unsubscribe();
  }

  private setStep(step: number): void {
    this._model.setStep(step);
  }

  public next(): void {
    if (this.indexSelected !== -1) {
      this._model.resetStep();
      setTimeout(() => this._facade_parent.setFlowFreeDestination(true), 100);
      const formOneOb: IPaymentFormOne = {
        account_origin: this.originAlias.value,
        loan_destination: this.destinationAlias.value,
      };
      this._facade.setFormOne(formOneOb);
      this._router.navigate([NavigatePayment.step2]);
      return;
    }
    const form: ISetFormOne = {
      origin: this.originAlias.value,
      destination: null,
      index: this.indexSelected,
    };
    this._model.setFormOne(form);
    this._model.setStep(StepPaymentPseEnum.step_2);
    this._router.navigate([NavigatePaymentFD.step2]);
  }

  public selectCard(index: number): void {
    this.indexSelected = index;
    if (index !== -1) {
      const account = this._accountsForPayments[this.indexSelected];
      this.originAlias.setValue(account);
    }
  }

  private _subsActivePayment(): void {
    this.activePayment$
      .pipe(takeUntil(this._destroy$))
      .subscribe((active: ISetPayment) => {
        this.destinationAlias.setValue(active);
      });
  }

  get indexAlias(): AbstractControl {
    return this.form.get('index');
  }

  get originAlias(): AbstractControl {
    return this.form.get('origin');
  }

  get destinationAlias(): AbstractControl {
    return this.form.get('destination');
  }

  get formOne$(): Observable<ISetFormOne> {
    return this._model.formOne$;
  }

  get selectAllProducts$(): Observable<Product[]> {
    return this._model.selectAllProducts$;
  }

  get activePayment$(): Observable<ISetPayment> {
    return this._facade.selectActiveProduct$;
  }

  get getDespositeAccountProducts$(): Observable<Product[]> {
    return this.selectAllProducts$.pipe(
      map((products: Product[]) => {
        const filtered = products.filter((product: Product) => {
          return (
            !!product &&
            !!product.accountInformation &&
            !!product.accountInformation.productType &&
            (product.accountInformation.productType ===
              TYPE_ACCOUNTS.DEPOSIT_ACCOUNT ||
              product.accountInformation.productType ===
                TYPE_ACCOUNTS.CURRENT_ACCOUNT)
          );
        });
        this._accountsForPayments = filtered;
        return filtered;
      }),
    );
  }
}
