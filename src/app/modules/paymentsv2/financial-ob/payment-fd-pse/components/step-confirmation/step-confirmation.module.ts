import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApplicationModel } from '@app/application.model';
import { CoreModule } from '@app/core/core.module';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { BtnModule } from '@app/shared/btn/btn.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FinancialOpFacade } from '../../../finantial-ob.facade';
import { FEATURE_REDUCER_TOKEN_FD } from '../../payment-fd-pse.module';
import { PsePrivateService } from '../../services/pse-private.service';
import { PaymentFreeDestinationModel } from '../../store/models/payment-free-destination.model';
import { PaymentObFreeDestinationReducer } from '../../store/reducers';
import { paymentObFreeDestiantionFeatureKey } from '../../store/state/payment-fd-pse.state';
import { TicketModule } from './../../../../../../shared/ticket/ticket.module';
import { PsePrivateEffects } from './../../store/effects/pse-private.effects';

import { StepConfirmationRoutingModule } from './step-confirmation-routing.module';
import { StepConfirmationComponent } from './step-confirmation.component';

@NgModule({
  declarations: [StepConfirmationComponent],
  imports: [
    CommonModule,
    CoreModule,
    StepConfirmationRoutingModule,
    TicketModule,
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
    FinancialOpFacade,
    ApplicationModel,
    PsePrivateService,
    {
      provide: FEATURE_REDUCER_TOKEN_FD,
      useValue: PaymentObFreeDestinationReducer,
    },
  ],
})
export class StepConfirmationModule {}
