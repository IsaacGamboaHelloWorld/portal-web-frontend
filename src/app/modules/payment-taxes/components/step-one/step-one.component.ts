import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TYPE_ACCOUNTS } from '@app/core/constants/types_account';
import { Product } from '@app/core/models/products/product';
import { validateData } from '@app/shared/helpers/validateData.helper';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import {
  ICities,
  IPaymentTaxesFormOne,
  IReference,
  ITaxes,
} from '../../entities/payment-taxes';
import {
  INavigatePaymentTaxes,
  NavigatePaymentTaxes,
} from '../../entities/routes';
import { PaymentTaxesModel } from '../../store/model/payment-taxes.model';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepOneComponent implements OnInit {
  public accountDefault: any;
  public formStepOne: FormGroup;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public viewTaxes: boolean;
  public cities: string[] = [];
  public taxes: object[] = [];
  public filtered: any[];
  public loadingItems: number = 1;
  public error: boolean = false;
  public subscribe: Subscription = new Subscription();
  @ViewChild('inputReference', null) inputReference: ElementRef;

  constructor(
    private model: PaymentTaxesModel,
    private router: Router,
    private render: Renderer2,
  ) {}

  get navigate(): INavigatePaymentTaxes {
    return NavigatePaymentTaxes;
  }

  get productDefault$(): Observable<Product> {
    return this.model.products$.pipe(
      map((product: Product[]) => this._filterProducts(product).shift()),
    );
  }

  get productsOrigin$(): Observable<Product[]> {
    return this.model.products$.pipe(
      map((product: Product[]) => {
        return this._filterProducts(product);
      }),
    );
  }

  private _filterProducts(product: Product[]): Product[] {
    return product.filter(
      (data) =>
        data.typeAccount === TYPE_ACCOUNTS.DEPOSIT_ACCOUNT ||
        data.typeAccount === TYPE_ACCOUNTS.CURRENT_ACCOUNT,
    );
  }

  get cities$(): Observable<ICities> {
    return this.model.cities$.pipe(
      filter((data) => !!data && data.cities !== null),
    );
  }
  get taxes$(): Observable<ITaxes> {
    return this.model.taxes$.pipe(
      filter((data) => !!data && data.agreements !== null),
    );
  }
  get reference(): Observable<IReference> {
    return this.model.reference;
  }
  get infoPaymentTaxes(): Observable<IPaymentTaxesFormOne> {
    return this.model.stepOne$;
  }

  public _setStep(step: number): void {
    this.model.setStep({ step });
  }

  public trackByFn(index: number, product: Product): string {
    return product.id;
  }
  public _initForm(): void {
    this.model.stepOne$
      .subscribe((data: IPaymentTaxesFormOne) => {
        if (!isNullOrUndefined(data)) {
          if (validateData(data.account_origin, '')) {
            this.viewTaxes = true;
          }
          if (!data.city) {
            this.model.getCities();
          }
          this.formStepOne = new FormGroup({
            account_origin: new FormControl(
              validateData(data.account_origin, ''),
              Validators.required,
            ),
            city_destination: new FormControl(
              validateData(data.city, ''),
              Validators.required,
            ),
            taxes: new FormControl(validateData(data.taxe, null), [
              Validators.required,
            ]),
            reference: new FormControl(
              {
                value: validateData(data.reference, null),
                disabled: data.reference ? false : true,
              },
              [Validators.required, Validators.min(1)],
            ),
          });
        }
      })
      .unsubscribe();
  }

  ngOnInit(): void {
    this.subscribe = this.productDefault$.subscribe((data) => {
      if (data) {
        this.accountDefault = data;
        this.subscribe.unsubscribe();
      }
    });
    this._setStep(1);
    this.viewTaxes = false;
    this._initForm();
    this.taxes$.subscribe((data) => {
      this.taxes = [];
      for (const i of data.agreements) {
        this.taxes = [
          ...this.taxes,
          {
            label: i['entityName'],
            value: i,
            disabled: false,
          },
        ];
      }
    });
    this.cities$.subscribe((data) => {
      this.cities = [];
      for (const i of data.cities) {
        this.cities = [...this.cities, i];
      }
    });
  }

  public selectCity(): void {
    this.model.resetTaxes();
    this.formStepOne.controls.taxes.setValue('');
    this.formStepOne.controls.reference.setValue('');
    const city: object = this.formStepOne.controls.city_destination.value;
    if (city) {
      this.viewTaxes = true;
      this.formStepOne.controls.taxes.enable();
      this.formStepOne.controls.reference.enable();
      this.model.getTaxes(city['id']);
    }
  }

  public selectAccount(): void {
    this.formStepOne.controls.account_origin.setErrors({ invalid: true });
    const product = this.productsOrigin$.subscribe((res) => {
      for (const i of res) {
        if (
          this.formStepOne.value.account_origin['id'] === i['id'] &&
          i['productAccountBalances']
        ) {
          this.formStepOne.controls.account_origin.setValue(i);
          this.formStepOne.controls.account_origin.setErrors(null);
          product.unsubscribe();
        }
      }
    });
  }

  public submitForm(): void {
    this.model.resetReference();
    const biller: object = this.formStepOne.controls.taxes.value;
    const reference: number = this.formStepOne.controls.reference.value;
    this.model.ifValidReference(reference, biller['organizationIdType']);

    const subscribe = this.reference.subscribe((response: IReference) => {
      if (response.success) {
        const data: IPaymentTaxesFormOne = {
          account_origin: this.formStepOne.value.account_origin,
          city: this.formStepOne.value.city_destination,
          taxe: this.formStepOne.value.taxes,
          reference: this.formStepOne.value.reference,
          amount: response.amount,
        };
        this._setStep(2);
        this.router.navigate([this.navigate.step2]);
        this.model.setFormOne(data);
        subscribe.unsubscribe();
      }
      if (response.errorMessage) {
        this.render.addClass(
          this.inputReference.nativeElement,
          'set-state-error-bg',
        );
        this.error = true;
      }
    });
  }
  public filter(event: any): void {
    this.filtered = [];
    for (const i of this.cities) {
      if (i['name'].toLowerCase().indexOf(event.query.toLowerCase()) === 0) {
        this.filtered.push(i);
      }
    }
  }
  public stateError(): void {
    if (this.error) {
      this.error = false;
      this.render.removeClass(
        this.inputReference.nativeElement,
        'set-state-error-bg',
      );
    }
  }
}
