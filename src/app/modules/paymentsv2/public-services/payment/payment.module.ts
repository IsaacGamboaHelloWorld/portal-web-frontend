import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProgrammedPaymentModule } from '@app/shared/cards/payments/programmed-payment/programmed-payment.module';
import { DsModalModule } from '@app/shared/ds/ds-modal/ds-modal.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { CoreModule } from '../../../../core/core.module';
import { BtnModule } from '../../../../shared/btn/btn.module';
import { CardChangeDataModule } from '../../../../shared/card-change-data/card-change-data.module';
import { CardServiceSelectedModule } from '../../../../shared/card-service-selected/card-service-selected.module';
import { CurrencyModule } from '../../../../shared/currency/currency.module';
import { TemplateSystemModule } from '../../../../shared/template-system/template-system.module';
import { TicketModule } from '../../../../shared/ticket/ticket.module';
import { PublicServicesFacade } from '../public-services.facade';
import { UtilsService } from './../../public-services/transversal/utils.service';
import { PaymentContainer } from './payment.container';
import { PaymentServiceFacade } from './payment.facade';
import { PaymentService } from './services/payment.service';
import { NewPaymentEffect } from './store/effects/new-payment.effect';
import { NewPaymentRootReducer } from './store/reducers/index';
import {
  NewPaymentFeatureName,
  PaymentNewState,
} from './store/state/new-payment-module.state';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<PaymentNewState>
>('Feature New Payment Reducers');

@NgModule({
  declarations: [PaymentContainer],
  imports: [
    CommonModule,
    CoreModule,
    TemplateSystemModule,
    FormsModule,
    ReactiveFormsModule,
    BtnModule,
    CardChangeDataModule,
    CardServiceSelectedModule,
    TicketModule,
    DsModalModule,
    ProgrammedPaymentModule,
    CurrencyModule.forRoot('es-US'),
    RouterModule.forChild([
      {
        path: '',
        component: PaymentContainer,
        children: [
          {
            path: 'desde',
            loadChildren: () =>
              import('./components/step-one/step-one.module').then(
                (m) => m.StepOneModule,
              ),
          },
          {
            path: 'cuanto',
            loadChildren: () =>
              import('./components/step-two/step-two.module').then(
                (m) => m.StepTwoModule,
              ),
          },
          {
            path: 'confirmar',
            loadChildren: () =>
              import('./components/step-confirm/step-confirm.module').then(
                (m) => m.StepConfirmModule,
              ),
          },
          {
            path: 'exitoso',
            loadChildren: () =>
              import('./components/step-end/step-end.module').then(
                (m) => m.StepEndModule,
              ),
          },
        ],
      },
    ]),
    StoreModule.forFeature(NewPaymentFeatureName, FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([NewPaymentEffect]),
  ],
  providers: [
    PaymentService,
    PaymentServiceFacade,
    PublicServicesFacade,
    UtilsService,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: NewPaymentRootReducer,
    },
  ],
})
export class PaymentModule {}
