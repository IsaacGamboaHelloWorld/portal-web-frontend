import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { CoreModule } from './../../../../../../core/core.module';
import { BtnModule } from './../../../../../../shared/btn/btn.module';
import { CardAccountRadiusModule } from './../../../../../../shared/card-account-radius/card-account-radius.module';

import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { FinancialOpFacade } from '../../../finantial-ob.facade';
import { FEATURE_REDUCER_TOKEN } from '../../../payment/components/step-two/step-two.module';
import { PaymentObligationsFacade } from '../../../payment/payment.facade';
import { NewPaymentFORootReducer } from '../../../payment/store/reducers';
import { NewPaymentFOFeatureName } from '../../../payment/store/state/new-payment-module.state';
import { FEATURE_REDUCER_TOKEN_FD } from '../../payment-fd-pse.module';
import { PaymentFreeDestinationModel } from '../../store/models/payment-free-destination.model';
import { PaymentObFreeDestinationReducer } from '../../store/reducers';
import { paymentObFreeDestiantionFeatureKey } from '../../store/state/payment-fd-pse.state';
import { StepOneRoutingModule } from './step-one-routing.module';
import { StepOneComponent } from './step-one.component';

@NgModule({
  declarations: [StepOneComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    StepOneRoutingModule,
    CoreModule,
    CardAccountRadiusModule,
    BtnModule,
    StoreModule.forFeature(
      paymentObFreeDestiantionFeatureKey,
      FEATURE_REDUCER_TOKEN_FD,
    ),
    StoreModule.forFeature(NewPaymentFOFeatureName, FEATURE_REDUCER_TOKEN),
  ],
  providers: [
    ManipulateDomService,
    PaymentFreeDestinationModel,
    FinancialOpFacade,
    PaymentObligationsFacade,
    {
      provide: FEATURE_REDUCER_TOKEN_FD,
      useValue: PaymentObFreeDestinationReducer,
    },
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: NewPaymentFORootReducer,
    },
  ],
})
export class StepOneModule {}
