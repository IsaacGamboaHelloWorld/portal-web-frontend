import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Events } from '@core/constants/events';
import { Navigate, Titles } from '@core/constants/navigate';
import { PageView } from '@core/decorators/page-view.decorator';
import { TODAY } from '@modules/transfer-to-account/constants/calendar';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { environment } from '../../../../../environments/environment';
import { SERVICE_PUBLIC } from '../../../../core/constants/global';
import {
  IRecurringPayment,
  IRecurringPaymentResponse,
  PaymentBillsInterface,
} from '../../../../core/interfaces/paymentBills.interface';
import { ManipulateDomService } from '../../../../core/services/manipulate-dom/manipulate-dom.service';
import { FormStepOneState } from '../../../../store/reducers/models/payment/steps/form-step-one.reducer';
import { PaymentModel } from '../../payment.model';

@PageView(Navigate.when, Titles.when, Events.page_view)
@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class StepThreeComponent implements OnInit, OnDestroy {
  public typeActive: string = '';
  public formStepThree: FormGroup;
  public today: object = new Date();
  public optionOne: string = TODAY;
  public optionTwo: string = '';
  public billTopay: PaymentBillsInterface = null;
  public productId: string;
  public productType: string;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public recursive: boolean = false;
  public itemsRange: number = 5;

  constructor(private model: PaymentModel, private dom: ManipulateDomService) {}

  ngOnInit(): void {
    this._initForm();

    this.model.formOne$
      .subscribe((data: FormStepOneState) => {
        if (this.paymentType === SERVICE_PUBLIC) {
          this.billTopay = data.account_destination as PaymentBillsInterface;
          this.productId =
            data.account_origin.accountInformation.accountIdentifier;
          this.productType = data.account_origin.accountInformation.productType;
          this.optionTwo = this.billTopay.dueDate;
        }
      })
      .unsubscribe();

    this.formStepThree
      .get('recursive')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((recursive: boolean) => {
        if (recursive) {
          this.setClass('.date-custom');
          this.formStepThree.controls.scheduledPayment.setValue(this.optionTwo);
        }
        this.recursive = recursive;
      });

    this.formStepThree
      .get('scheduledPayment')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((scheduled: string) => {
        if (scheduled === this.optionOne) {
          this.formStepThree.value.recursive = true;
        }
      });

    this.model.recurring$
      .pipe(takeUntil(this.destroy$))
      .subscribe((recurring: IRecurringPaymentResponse) => {
        if (!isNullOrUndefined(recurring) && recurring.success) {
          this.model.setStep(4);
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private _initForm(): void {
    this.formStepThree = new FormGroup({
      scheduledPayment: new FormControl('', [Validators.required]),
      dueDate: new FormControl(''),
      recursive: new FormControl(''),
      amounttext: new FormControl('', [
        Validators.min(1),
        Validators.max(999999),
      ]),
      range: new FormControl(''),
    });
    this.formStepThree.controls.range.setValue(1);
  }

  public submitForm(): void {
    if (
      this.formStepThree.value.scheduledPayment === this.optionTwo &&
      this.recursive
    ) {
      const data: IRecurringPayment = {
        billerId: this.billTopay.billerId,
        billerNickname: this.billTopay.billerNickName,
        contract: this.billTopay.contract,
        reference: this.billTopay.invoice,
        paymentType: 'X_DAYS_BEFORE_DUE_DATE',
        maxAmount: this.formStepThree.controls.amounttext.value,
        daysBeforeAfterExpiration: 4,
        originAccountId: this.productId,
        originAccountType: this.productType,
      };

      this.model.createRecurring(data);
    } else {
      this.model.setStep(4);
    }
  }

  get formOne$(): Observable<FormStepOneState> {
    return this.model.formOne$;
  }

  public selectedOption(nameScheduled: string): void {
    this.typeActive = nameScheduled;
  }

  public setClass(_id: string): void {
    this.dom.removeMultipleClass('.form-radiobutton-contanier', 'active');
    this.dom.addClass(_id, 'active');
    this.formStepThree.controls.recursive.setValue(false);
  }

  public compareFnOptions(c1: any, c2: any): boolean {
    return c1 && c2 ? c1.value === 1 : c1 === 1;
  }

  public setFocus(): void {
    if (this.formStepThree.controls.amounttext.value.length <= 0) {
      this.formStepThree.controls.amounttext.setValue(0);
    }
  }

  get paymentType(): string {
    return this.model.paymentType;
  }

  get pilotView(): boolean {
    return environment.pilot;
  }

  get paymentpublic(): string {
    return SERVICE_PUBLIC;
  }
}
