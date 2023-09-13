import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { TypeCreditCardPipe } from '@app/core/pipes/type-credit-card/type-credit-card.pipe';

import { PaymentModel } from '@app/modules/payments/payment.model';

import { BtnModule } from '@app/shared/btn/btn.module';
import { ProgrammedPaymentModule } from '@app/shared/cards/payments/programmed-payment/programmed-payment.module';
import { CurrencyModule } from '@app/shared/currency/currency.module';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { TicketModule } from '@app/shared/ticket/ticket.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { PaymentServiceFacade } from '../../payment.facade';
import { PaymentService } from '../../services/payment.service';
import { NewPaymentEffect } from '../../store/effects/new-payment.effect';

import { NewPaymentRootReducer } from '../../store/reducers';
import {
  NewPaymentFeatureName,
  PaymentNewState,
} from '../../store/state/new-payment-module.state';
import { StepEndComponent } from './step-end.component';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<PaymentNewState>
>('Feature New Payment Reducers');

@NgModule({
  declarations: [StepEndComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: StepEndComponent,
      },
    ]),
    CommonModule,
    CoreModule,
    TemplateSystemModule,
    FormsModule,
    ReactiveFormsModule,
    BtnModule,
    ProgrammedPaymentModule,
    TicketModule,
    CurrencyModule.forRoot('es-US'),
    StoreModule.forFeature(NewPaymentFeatureName, FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([NewPaymentEffect]),
  ],
  providers: [
    PaymentModel,
    PaymentService,
    PaymentServiceFacade,
    TypeCreditCardPipe,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: NewPaymentRootReducer,
    },
  ],
})
export class StepEndModule {}
