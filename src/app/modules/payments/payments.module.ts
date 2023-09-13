import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BanksEffect } from '@app/core/effects/banks.effect';
import { TypeCreditCardPipe } from '@app/core/pipes/type-credit-card/type-credit-card.pipe';
import { BanksService } from '@app/core/services/banks/banks.service';
import { LoadBillsEffect } from '@app/modules/payments/effects/load-bills.effect';
import { PaymentBillEffect } from '@app/modules/payments/effects/payment-bill.effect';
import { BtnModule } from '@app/shared/btn/btn.module';
import { CheckboxSlideModule } from '@app/shared/checkbox-slide/checkbox-slide.module';
import { CurrencyModule } from '@app/shared/currency/currency.module';
import { DsModalModule } from '@app/shared/ds/ds-modal/ds-modal.module';
import { LineTimeModule } from '@app/shared/line-time/line-time.module';
import { LottieModule } from '@app/shared/lottie/lottie.module';
import { TicketModule } from '@app/shared/ticket/ticket.module';
import { CoreModule } from '@core/core.module';
import { DestinationProductsEffect } from '@modules/payments/effects/destination-products.effect';
import { PaymentEffect } from '@modules/payments/effects/payment.effect';
import { PaymentModel } from '@modules/payments/payment.model';
import { PaymentRoutingModule } from '@modules/payments/payments-routing.module';
import { PaymentsContainer } from '@modules/payments/payments.container';
import { PaymentBillService } from '@modules/payments/services/bills-payment/bill-payment.service';
import { LoansUserService } from '@modules/payments/services/loans-user/loans-user.service';
import { PaymentService } from '@modules/payments/services/payment/payment.service';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { CalendarModule } from 'primeng/calendar';
import { ModalModule } from '../../shared/modal/modal.module';
import { ModalService } from '../../shared/modal/services/modal.service';
import { HomeModel } from '../home/home.model';
import { FEATURE_REDUCER_TOKEN_FD } from '../paymentsv2/financial-ob/payment-fd-pse/payment-fd-pse.module';
import { PsePrivateService } from '../paymentsv2/financial-ob/payment-fd-pse/services/pse-private.service';
import { PsePrivateEffects } from '../paymentsv2/financial-ob/payment-fd-pse/store/effects/pse-private.effects';
import { PaymentFreeDestinationModel } from '../paymentsv2/financial-ob/payment-fd-pse/store/models/payment-free-destination.model';
import { PaymentObFreeDestinationReducer } from '../paymentsv2/financial-ob/payment-fd-pse/store/reducers';
import { paymentObFreeDestiantionFeatureKey } from '../paymentsv2/financial-ob/payment-fd-pse/store/state/payment-fd-pse.state';
import { AddPaymentComponent } from './components/add-payment/add-payment.component';
import { ChooseTypeComponent } from './components/choose-type/choose-type.component';
import { ModalSearchComponent } from './components/modal-search/modal-search.component';
import { NewPaymentComponent } from './components/new-payment/new-payment.component';
import { PaymentsListComponent } from './components/payments-list/payments-list.component';
import { StepAlertComponent } from './components/step-alert/step-alert.component';
import { StepConfirmationComponent } from './components/step-confirmation/step-confirmation.component';
import { StepDefaultComponent } from './components/step-default/step-default.component';
import { StepOneComponent } from './components/step-one/step-one.component';
import { StepSuccessComponent } from './components/step-success/step-success.component';
import { StepThreeComponent } from './components/step-three/step-three.component';
import { StepTwoComponent } from './components/step-two/step-two.component';
import { BillerLoanDetailEffect } from './effects/biller-loan-detail.effects';
import { RecurringPaymentEffect } from './effects/recurring-payments.effects';
import { BillsUserService } from './services/bills-user/bills-user.service';
import { LoanDetailService } from './services/loan-detail/loan-detail.service';
import { RecurringPaymentService } from './services/recurring/recurring-payment.service';
import {
  billerLoanDetailReducer,
  BillerLoanDetailState,
} from './store/reducers/biller-loan-detail.reducers';
import { NewBillerLoanDetailFeatureName } from './store/state/biller-loan-detail.state';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<BillerLoanDetailState>
>('Feature Biller Loan Detail Reducer');

@NgModule({
  declarations: [
    PaymentsContainer,
    NewPaymentComponent,
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepDefaultComponent,
    StepConfirmationComponent,
    StepSuccessComponent,
    StepAlertComponent,
    ChooseTypeComponent,
    AddPaymentComponent,
    ModalSearchComponent,
    PaymentsListComponent,
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    CoreModule,
    FormsModule,
    BtnModule,
    ReactiveFormsModule,
    LineTimeModule,
    ModalModule,
    TicketModule,
    LottieModule,
    CalendarModule,
    CheckboxSlideModule,
    DsModalModule,
    CurrencyModule.forRoot('es-US'),
    EffectsModule.forFeature([
      PaymentEffect,
      LoadBillsEffect,
      PaymentBillEffect,
      DestinationProductsEffect,
      BanksEffect,
      PsePrivateEffects,
      RecurringPaymentEffect,
      BillerLoanDetailEffect,
    ]),
    StoreModule.forFeature(
      NewBillerLoanDetailFeatureName,
      FEATURE_REDUCER_TOKEN,
    ),
    StoreModule.forFeature(
      paymentObFreeDestiantionFeatureKey,
      FEATURE_REDUCER_TOKEN_FD,
    ),
  ],
  providers: [
    PaymentModel,
    HomeModel,
    PaymentService,
    PaymentBillService,
    LoansUserService,
    BillsUserService,
    RecurringPaymentService,
    BanksService,
    TypeCreditCardPipe,
    ModalService,
    LoanDetailService,
    PaymentFreeDestinationModel,
    PsePrivateService,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: billerLoanDetailReducer,
    },
    {
      provide: FEATURE_REDUCER_TOKEN_FD,
      useValue: PaymentObFreeDestinationReducer,
    },
  ],
  entryComponents: [ModalSearchComponent],
})
export class PaymentsModule {}
