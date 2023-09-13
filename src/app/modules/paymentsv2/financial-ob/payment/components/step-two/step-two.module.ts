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
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
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
import { StepTwoComponent } from './step-two.component';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<ObligationNewState>
>('Feature New Oblifation Reducers');

@NgModule({
  declarations: [StepTwoComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: StepTwoComponent,
      },
    ]),
    CommonModule,
    CoreModule,
    TemplateSystemModule,
    ReactiveFormsModule,
    FormsModule,
    BtnModule,
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
export class StepTwoModule {}
