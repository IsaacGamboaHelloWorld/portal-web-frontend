import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DsModalModule } from '@app/shared/ds/ds-modal/ds-modal.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { CoreModule } from '../../../../core/core.module';
import { TypeCreditCardPipe } from '../../../../core/pipes/type-credit-card/type-credit-card.pipe';
import { BtnModule } from '../../../../shared/btn/btn.module';
import { CardChangeDataModule } from '../../../../shared/card-change-data/card-change-data.module';
import { CardLoanSelectedModule } from '../../../../shared/card-loan-selected/card-loan-selected.module';
import { CurrencyModule } from '../../../../shared/currency/currency.module';
import { TemplateSystemModule } from '../../../../shared/template-system/template-system.module';
import { TicketModule } from '../../../../shared/ticket/ticket.module';
import { PaymentEffect } from '../../../payments/effects/payment.effect';
import { PaymentModel } from '../../../payments/payment.model';
import { PaymentService } from '../../../payments/services/payment/payment.service';
import { FinancialOpFacade } from '../finantial-ob.facade';
import { UtilsService } from '../transversal/utils.service';
import { PaymentContainer } from './payment.container';
import { PaymentObligationsFacade } from './payment.facade';
import { NewPaymentFORootReducer } from './store/reducers/index';
import {
  NewPaymentFOFeatureName,
  ObligationNewState,
} from './store/state/new-payment-module.state';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<ObligationNewState>
>('Feature New Oblifation Reducers');

@NgModule({
  declarations: [PaymentContainer],
  imports: [
    CommonModule,
    CoreModule,
    TemplateSystemModule,
    CardChangeDataModule,
    CardLoanSelectedModule,
    ReactiveFormsModule,
    FormsModule,
    TicketModule,
    BtnModule,
    DsModalModule,
    CurrencyModule.forRoot('es-US'),
    RouterModule.forChild([
      {
        path: '',
        component: PaymentContainer,
        children: [
          {
            path: 'quien',
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
            path: 'cuando',
            loadChildren: () =>
              import('./components/step-three/step-three.module').then(
                (m) => m.StepThreeModule,
              ),
          },
          {
            path: 'confirmar',
            loadChildren: () =>
              import(
                // tslint:disable-next-line: trailing-comma
                './components/step-confirmation/step-confirmation.module'
              ).then((m) => m.StepConfirmationModule),
          },
          {
            path: 'exitoso',
            loadChildren: () =>
              import(
                // tslint:disable-next-line: trailing-comma
                './components/step-end/step-end.module'
              ).then((m) => m.StepEndModule),
          },
        ],
      },
    ]),
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
    UtilsService,
  ],
})
export class PaymentOFModule {}
