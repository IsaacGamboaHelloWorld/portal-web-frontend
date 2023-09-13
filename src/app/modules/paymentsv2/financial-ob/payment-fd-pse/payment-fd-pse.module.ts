import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { FinancialOpFacade } from '../finantial-ob.facade';
import { CoreModule } from './../../../../core/core.module';
import { TemplateSystemModule } from './../../../../shared/template-system/template-system.module';
import { PaymentFdPseRoutingModule } from './payment-fd-pse-routing.module';
import { PaymentFdPseContanier } from './payment-fd-pse.container';
import { PsePrivateService } from './services/pse-private.service';
import { PsePrivateEffects } from './store/effects/pse-private.effects';
import { PaymentFreeDestinationModel } from './store/models/payment-free-destination.model';
import { PaymentObFreeDestinationReducer } from './store/reducers';
import {
  IPaymentObFreeDestiantionState,
  paymentObFreeDestiantionFeatureKey,
} from './store/state/payment-fd-pse.state';

export const FEATURE_REDUCER_TOKEN_FD = new InjectionToken<
  ActionReducerMap<IPaymentObFreeDestiantionState>
>('Feature Payment Free Destination Reducers');

@NgModule({
  declarations: [PaymentFdPseContanier],
  imports: [
    CommonModule,
    CoreModule,
    TemplateSystemModule,
    PaymentFdPseRoutingModule,
    StoreModule.forFeature(
      paymentObFreeDestiantionFeatureKey,
      FEATURE_REDUCER_TOKEN_FD,
    ),
    EffectsModule.forFeature([PsePrivateEffects]),
  ],
  providers: [
    PaymentFreeDestinationModel,
    FinancialOpFacade,
    PsePrivateService,
    {
      provide: FEATURE_REDUCER_TOKEN_FD,
      useValue: PaymentObFreeDestinationReducer,
    },
  ],
})
export class PaymentFdPseModule {}
