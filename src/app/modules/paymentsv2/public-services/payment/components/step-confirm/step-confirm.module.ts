import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { TypeCreditCardPipe } from '@app/core/pipes/type-credit-card/type-credit-card.pipe';

import { PaymentModel } from '@app/modules/payments/payment.model';

import { BtnModule } from '@app/shared/btn/btn.module';
import { CardChangeDataModule } from '@app/shared/card-change-data/card-change-data.module';
import { CardServiceSelectedModule } from '@app/shared/card-service-selected/card-service-selected.module';
import { CurrencyModule } from '@app/shared/currency/currency.module';
import { DsModalModule } from '@app/shared/ds/ds-modal/ds-modal.module';
import { ModalModule } from '@app/shared/modal/modal.module';
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
import { StepConfirmComponent } from './step-confirm.component';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<PaymentNewState>
>('Feature New Payment Reducers');

@NgModule({
  declarations: [StepConfirmComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: StepConfirmComponent,
      },
    ]),
    CommonModule,
    CoreModule,
    TemplateSystemModule,
    FormsModule,
    ReactiveFormsModule,
    BtnModule,
    CardChangeDataModule,
    CardServiceSelectedModule,
    TicketModule,
    ModalModule,
    DsModalModule,
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
export class StepConfirmModule {}
