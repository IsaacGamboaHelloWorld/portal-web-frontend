import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClassNotification } from '@app/core/constants/notification';
import { TYPE_ACCOUNTS } from '@app/core/constants/types_account';
import { Product } from '@app/core/models/products/product';
import {
  IBillerDetailRequest,
  IBillerDetailResponse,
} from '@app/modules/paymentsv2/public-services/payment/entities/new-payment';
import { validateData } from '@app/shared/helpers/validateData.helper';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import {
  IAnswerInformation,
  IAnswerPayRoll,
  IPayStackFormOne,
  ISendInformation,
} from '../../entities/pay-stack';
import { INavigatePayStack, NavigatePayStack } from '../../entities/routes';
import { PayStackModel } from '../../store/model/pay-stack.model';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepOneComponent implements OnInit, OnDestroy {
  public accountDefault: any;
  public formStepOne: FormGroup;
  public typeOption: string;
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  public viewMonth: boolean = false;
  public viewPayroll: boolean = false;
  public months: object[] = [];
  public type_payment: object[] = [];
  public payroll: object[] = [];
  public loadingItems: number = 1;
  public error: boolean = false;
  public loadingBtn: boolean;
  public subscribe: Subscription = new Subscription();
  public textPayroll: string;
  constructor(
    private model: PayStackModel,
    private router: Router,
    private translate: TranslateService,
  ) {}

  get navigate(): INavigatePayStack {
    return NavigatePayStack;
  }

  get productDefault$(): Observable<Product> {
    return this.model.products$.pipe(
      map((product: Product[]) =>
        product
          .filter(
            (data) =>
              data.typeAccount === TYPE_ACCOUNTS.DEPOSIT_ACCOUNT ||
              data.typeAccount === TYPE_ACCOUNTS.CURRENT_ACCOUNT,
          )
          .shift(),
      ),
    );
  }
  get productsOrigin$(): Observable<Product[]> {
    return this.model.products$.pipe(
      map((product: Product[]) =>
        product.filter(
          (data) =>
            data.typeAccount === TYPE_ACCOUNTS.DEPOSIT_ACCOUNT ||
            data.typeAccount === TYPE_ACCOUNTS.CURRENT_ACCOUNT,
        ),
      ),
    );
  }

  get payroll$(): Observable<IAnswerPayRoll> {
    return this.model.payroll.pipe(
      filter((data) => !!data && data.agreements !== null),
    );
  }

  get months$(): Observable<string[]> {
    return this.translate.get('MONTHS');
  }

  get information(): Observable<IAnswerInformation> {
    return this.model.information;
  }
  get infoBiller(): Observable<IBillerDetailResponse> {
    return this.model.selectedInfoBiller;
  }

  get infoPaystack(): Observable<IPayStackFormOne> {
    return this.model.stepOne$;
  }

  public _setStep(step: number): void {
    this.model.setStep({ step });
  }

  public _initForm(): void {
    this.model.stepOne$
      .subscribe((data: IPayStackFormOne) => {
        if (!isNullOrUndefined(data)) {
          this.subscribe = this.productDefault$.subscribe((dataProduct) => {
            if (dataProduct) {
              this.accountDefault = dataProduct;
              if (!data.payroll && this.accountDefault) {
                this.model.getPayroll(this.accountDefault['id']);
              }
              this.subscribe.unsubscribe();
            }
          });

          if (data.type_payment) {
            this.viewPayroll = true;
            this.typeOption = String(data.type_payment);
            if (data.type_payment && String(data.type_payment) === 'NP') {
              this.viewMonth = false;
            }
            if (data.type_payment && String(data.type_payment) === 'ND') {
              this.viewMonth = true;
            }
          }
          this.formStepOne = new FormGroup({
            account_origin: new FormControl(
              validateData(data.account_origin, ''),
              Validators.required,
            ),
            payroll: new FormControl(
              validateData(data.payroll, ''),
              Validators.required,
            ),
            type_payment: new FormControl(
              validateData(data.type_payment, ''),
              Validators.required,
            ),
            number_payroll: new FormControl(
              validateData(data.number_payroll, ''),
              Validators.required,
            ),
            month: new FormControl(validateData(data.month, '')),
            period: new FormControl(validateData(data.period, '')),
          });
        }
      })
      .unsubscribe();
  }

  ngOnInit(): void {
    this._setStep(1);
    this._initForm();
    this.payroll$.subscribe((data) => {
      this.payroll = [];
      for (const i of data.agreements) {
        this.payroll = [
          ...this.payroll,
          {
            label: i['entityName'],
            value: i,
            disabled: false,
          },
        ];
      }
    });
    this.months$.subscribe((data) => {
      this.months = [];
      data.forEach((e, i) => {
        this.months = [
          ...this.months,
          {
            label: e['NAME'],
            value: e['CODE'],
          },
        ];
      });
    });
    this.type_payment = [
      { label: 'PAY_STACK.FORM_ONE.PAYROLL', value: 'NP' },
      { label: 'PAY_STACK.FORM_ONE.DOCUMENT', value: 'ND' },
    ];
  }

  public eventTypePayment(event: object): void {
    this.formStepOne.controls.type_payment.setValue(event);
    this.formStepOne.controls.number_payroll.setValue('');
    this.formStepOne.controls.month.setValue('');
    this.formStepOne.controls.period.setValue('');
    this.viewPayroll = true;
    this.typeOption = String(event);
    switch (String(event)) {
      case 'NP':
        this.textPayroll = 'PAY_STACK.FORM_ONE.PAYROLL';
        this.viewMonth = false;
        this.formStepOne.controls.month.clearValidators();
        this.formStepOne.controls.month.updateValueAndValidity();
        this.formStepOne.controls.period.clearValidators();
        this.formStepOne.controls.period.updateValueAndValidity();
        break;
      case 'ND':
        this.textPayroll = 'PAY_STACK.FORM_ONE.DOCUMENT';
        this.viewMonth = true;
        this.formStepOne.controls.month.setValue(this.months[0]['value']);
        this.formStepOne.controls.month.setValidators([Validators.required]);
        this.formStepOne.controls.period.setValidators([
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
        ]);
        break;
    }
  }

  public submitForm(): void {
    switch (this.typeOption) {
      case 'NP':
        const bill: IBillerDetailRequest = {
          billerId: this.formStepOne.value.payroll['organizationId'],
          contract: this.formStepOne.value.number_payroll,
        };
        this.model.getInfoBill(bill);
        const subscribeInfo = this.infoBiller
          .pipe(takeUntil(this._destroy$))
          .subscribe((response) => {
            if (
              response['data'] &&
              response['data'].success &&
              !!response['data'].billerPayment
            ) {
              const data: IPayStackFormOne = {
                account_origin: this.formStepOne.value.account_origin,
                payroll: this.formStepOne.value.payroll,
                type_payment: this.formStepOne.value.type_payment,
                number_payroll: this.formStepOne.value.number_payroll,
                month: this.formStepOne.value.month,
                period: this.formStepOne.value.period,
                invoiceNumber: response['data'].billerPayment.invoice,
                amount: parseFloat(
                  String(response['data'].billerPayment.amount),
                ),
              };
              this._setStep(2);
              this.router.navigate([this.navigate.step2]);
              this.model.setFormOne(data);
              this.loadingBtn = false;
              subscribeInfo.unsubscribe();
            }
            if (response.errorMessage || response.description) {
              const error = response.errorMessage || response.description;
              this.model.notificationOpen(error, true, ClassNotification.ERROR);
            }
          });
        break;
      case 'ND':
        const dataInfo: ISendInformation = {
          id: this.formStepOne.value.number_payroll,
          idType: 'CC',
          pilaInformation: {
            id: this.formStepOne.value.number_payroll,
            idType: 'CC',
            referenceType: 'PERIODO',
            agreementId: this.formStepOne.value.payroll['organizationId'],
            referenceId: `${this.formStepOne.value.period}${this.formStepOne.value.month}`,
          },
        };
        this.model.getInformation(dataInfo);
        const subscribe = this.information
          .pipe(takeUntil(this._destroy$))
          .subscribe((response: IAnswerInformation) => {
            if (response.success) {
              const data: IPayStackFormOne = {
                account_origin: this.formStepOne.value.account_origin,
                payroll: this.formStepOne.value.payroll,
                type_payment: this.formStepOne.value.type_payment,
                number_payroll: this.formStepOne.value.number_payroll,
                month: this.formStepOne.value.month,
                period: this.formStepOne.value.period,
                invoiceNumber: response.invoiceNumber,
                amount: parseFloat(response.amount),
              };
              this._setStep(2);
              this.router.navigate([this.navigate.step2]);
              this.model.setFormOne(data);
              subscribe.unsubscribe();
            }
            if (response.errorMessage) {
              this.model.notificationOpen(
                response.errorMessage,
                true,
                ClassNotification.ERROR,
              );
            }
          });
        break;
    }
  }

  public selectOption(event: object): void {
    this.accountDefault = event;
    this.model.getPayroll(this.accountDefault['id']);
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }
}
