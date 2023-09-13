import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DsInputModule } from '@app/shared/ds/ds-input/ds-input.module';
import { StoreModule } from '@ngrx/store';
import { PaymentObFreeDestinationReducer } from '../../store/reducers';
import { paymentObFreeDestiantionFeatureKey } from '../../store/state/payment-fd-pse.state';
import { CoreModule } from './../../../../../../core/core.module';
import { BtnModule } from './../../../../../../shared/btn/btn.module';
import { DsDropdownSelectModule } from './../../../../../../shared/ds/ds-dropdown-select/ds-dropdown-select.module';

import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { CardAccountRadiusModule } from '@app/shared/card-account-radius/card-account-radius.module';
import { EffectsModule } from '@ngrx/effects';
import { FEATURE_REDUCER_TOKEN_FD } from '../../payment-fd-pse.module';
import { PsePrivateService } from '../../services/pse-private.service';
import { PsePrivateEffects } from '../../store/effects/pse-private.effects';
import { PaymentFreeDestinationModel } from '../../store/models/payment-free-destination.model';
import { StepTwoRoutingModule } from './step-two-routing.module';
import { StepTwoComponent } from './step-two.component';

@NgModule({
  declarations: [StepTwoComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    DsDropdownSelectModule,
    DsInputModule,
    StepTwoRoutingModule,
    CardAccountRadiusModule,
    BtnModule,
    StoreModule.forFeature(
      paymentObFreeDestiantionFeatureKey,
      FEATURE_REDUCER_TOKEN_FD,
    ),
    EffectsModule.forFeature([PsePrivateEffects]),
  ],
  providers: [
    ManipulateDomService,
    PaymentFreeDestinationModel,
    PsePrivateService,
    {
      provide: FEATURE_REDUCER_TOKEN_FD,
      useValue: PaymentObFreeDestinationReducer,
    },
  ],
})
export class StepTwoModule {}
