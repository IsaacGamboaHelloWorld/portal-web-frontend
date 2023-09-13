import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { TypeCreditCardPipe } from '@app/core/pipes/type-credit-card/type-credit-card.pipe';
import { PaymentEffect } from '@app/modules/payments/effects/payment.effect';
import { PaymentModel } from '@app/modules/payments/payment.model';
import { BtnModule } from '@app/shared/btn/btn.module';
import { CurrencyModule } from '@app/shared/currency/currency.module';
import { DsModalModule } from '@app/shared/ds/ds-modal/ds-modal.module';
import { ModalModule } from '@app/shared/modal/modal.module';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { TicketModule } from '@app/shared/ticket/ticket.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { PaymentService } from '../../../../../payments/services/payment/payment.service';
import { FinancialOpFacade } from '../../../finantial-ob.facade';
import { PaymentObligationsFacade } from '../../payment.facade';
import { NewPaymentFORootReducer } from '../../store/reducers';
import {
  NewPaymentFOFeatureName,
  ObligationNewState,
} from '../../store/state/new-payment-module.state';
import { StepConfirmationComponent } from './step-confirmation.component';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<ObligationNewState>
>('Feature New Oblifation Reducers');

@NgModule({
  declarations: [StepConfirmationComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: StepConfirmationComponent,
      },
    ]),
    CommonModule,
    CoreModule,
    TemplateSystemModule,
    ReactiveFormsModule,
    FormsModule,
    TicketModule,
    BtnModule,
    ModalModule,
    DsModalModule,
    CurrencyModule.forRoot('es-US'),
    StoreModule.forFeature(NewPaymentFOFeatureName, FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([PaymentEffect]),
  ],
  providers: [
    PaymentObligationsFacade,
    FinancialOpFacade,
    PaymentModel,
    PaymentService,
    TypeCreditCardPipe,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: NewPaymentFORootReducer,
    },
  ],
})
export class StepConfirmationModule {}
