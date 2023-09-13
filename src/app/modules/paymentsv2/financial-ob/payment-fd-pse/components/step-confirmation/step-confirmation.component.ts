import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { TypeCommercePse } from '@app/core/constants/type_commerce_pse';
import { TYPE_ACCOUNTS } from '@app/core/constants/types_account';
import { UserSecureDataMdmResponse } from '@app/core/models/user/get-user-secure-data-mdm';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import {
  ITypePayments,
  TYPE_PAYMENTS,
} from '@app/modules/payments/home-payments/constants/types';
import { IProductActive } from '@app/store/reducers/models/product-active/product-active.reducer';
import { environment } from '@environment';
import { combineLatest, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { FinancialOpFacade } from '../../../finantial-ob.facade';
import { IActiveFinancialOpPaymentPayments } from '../../../store/reducers/selected-payment.reducer';
import { StepPaymentPseEnum } from '../../constants/step-payment-pse.enum';
import { TypePaymentPse } from '../../constants/type-payment-pse.enum';
import { IPaymentPseRequest } from '../../entities/payment-transaction-pse.interface';
import { ISetFormTwo } from '../../entities/step-form-two.interface';
import { PsePrivateService } from '../../services/pse-private.service';
import { PaymentFreeDestinationModel } from '../../store/models/payment-free-destination.model';
import { IInitPaymentPse } from '../../store/reducers/init-pse.reducers';
import { ISetFormThree } from './../../entities/step-form-three.interface';

@Component({
  selector: 'app-step-confirmation',
  templateUrl: './step-confirmation.component.html',
  styleUrls: ['./step-confirmation.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepConfirmationComponent implements OnInit {
  public costTransfer: number = 0;
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  private countRedirectPse: number = 0;

  private _objTypeCodeCommerce: any = {
    FREE_DESTINATION: TypeCommercePse.CREDIT,
    CREDIT: TypeCommercePse.CREDIT,
    CREDIT_CARD: TypeCommercePse.CREDIT_CARD,
    TC: TypeCommercePse.CREDIT_CARD,
    undefined: null,
  };

  private _objNamePayment: any = {
    FREE_DESTINATION: TYPE_ACCOUNTS.FREE_DESTINATION,
    CREDIT: TYPE_ACCOUNTS.FREE_DESTINATION,
    CREDIT_CARD: TYPE_ACCOUNTS.CREDIT_CARD,
    TC: TYPE_ACCOUNTS.CREDIT_CARD,
    undefined: null,
  };

  constructor(
    private model: PaymentFreeDestinationModel,
    private facade: FinancialOpFacade,
    private privatePseService: PsePrivateService,
    private cd: ChangeDetectorRef,
    private dom: ManipulateDomService,
  ) {}

  ngOnInit(): void {
    this.dom.scrollContentTop();
    this._setStep(StepPaymentPseEnum.step_confirmation);
    this._subsPaymentPse();
    setTimeout(() => this.cd.markForCheck(), 10);
  }

  public submitData(): void {
    this.countRedirectPse = 0;
    combineLatest([
      this.typeProductSelected$,
      this.formTwo$,
      this.formThree$,
      this.userInfoData$,
    ])
      .subscribe(([paymentSelected, formTwo, formThree, userInfoData]) =>
        this._mapPaymentRequest(
          paymentSelected,
          formTwo,
          formThree,
          userInfoData,
        ),
      )
      .unsubscribe();
  }

  private _mapPaymentRequest(
    paymentSelected: IActiveFinancialOpPaymentPayments,
    formTwo: ISetFormTwo,
    formThree: ISetFormThree,
    userInfoData: UserSecureDataMdmResponse,
  ): void {
    const request: IPaymentPseRequest = {
      paymentData: {
        commerceCode: this._objTypeCodeCommerce[
          paymentSelected.activePayment.accountType
        ],
        productType: this._objNamePayment[
          paymentSelected.activePayment.accountType
        ],
        productId: paymentSelected.activePayment.accountId,
        amount: formThree.amountText,
        bank: {
          bankId: formTwo.bankId,
          bankName: formTwo.bankName,
        },
        paymentType: TypePaymentPse.PayObligation,
        firstName: userInfoData['firstName'],
        lastName: userInfoData['lastName'],
        description: '',
        emailAddress: formTwo.email,
        legalUserType: formTwo.type_person,
        invoice: paymentSelected.activePayment.accountId,
        redirectSuccessUrl: environment.url_return_of_pse,
      },
    };
    this.model.fetchInitPaymentPse(request);
  }

  private _subsPaymentPse(): void {
    this.initPaymentPse$
      .pipe(takeUntil(this._destroy$))
      .subscribe((resp: IInitPaymentPse) => this._mapResponsePayment(resp));
  }

  private _mapResponsePayment(resp: IInitPaymentPse): void {
    if (
      !resp ||
      !resp.data ||
      !resp.data.pseUrlRedirect ||
      !resp.data.paymentId
    ) {
      return;
    }
    const paymentId = resp.data.paymentId;
    this.privatePseService.setPaymentId(paymentId);
    if (this.countRedirectPse < 1) {
      this.countRedirectPse++;
      this._setStep(StepPaymentPseEnum.step_end);
    }
  }

  private _setStep(step: number): void {
    this.model.setStep(step);
  }

  get initPaymentPse$(): Observable<IInitPaymentPse> {
    return this.model.initPaymentPse$;
  }

  get formTwo$(): Observable<ISetFormTwo> {
    return this.model.formTwo$;
  }

  get formThree$(): Observable<ISetFormThree> {
    return this.model.formThree$;
  }

  get selectedPayment$(): Observable<IActiveFinancialOpPaymentPayments> {
    return this.facade.selectedPayment$;
  }

  get productActive$(): Observable<IProductActive> {
    return this.facade.productActive$;
  }

  get typeProductSelected$(): Observable<IActiveFinancialOpPaymentPayments> {
    return combineLatest([this.selectedPayment$, this.productActive$]).pipe(
      map(
        ([payment, product]: [
          IActiveFinancialOpPaymentPayments,
          IProductActive,
        ]) => this._mapProductSelected(payment, product),
      ),
    );
  }

  private _mapProductSelected(
    payment: IActiveFinancialOpPaymentPayments,
    product: IProductActive,
  ): IActiveFinancialOpPaymentPayments {
    if (!product) {
      return payment;
    } else {
      return {
        activePayment: {
          accountId: product.id,
          accountType: product.type.toUpperCase(),
          bank: product.bank,
          loanName: product.name,
          bankName: product.bank_name,
          newLoan: false,
        },
      };
    }
  }

  get userInfoData$(): Observable<UserSecureDataMdmResponse> {
    return this.model.userInfoData$;
  }

  get getTypePayment(): ITypePayments {
    return TYPE_PAYMENTS;
  }
}
