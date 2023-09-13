import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@app/core/core.module';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { BtnModule } from '@app/shared/btn/btn.module';
import { TicketModule } from '@app/shared/ticket/ticket.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { FinancialOpFacade } from '../../../finantial-ob.facade';
import { FEATURE_REDUCER_TOKEN_FD } from '../../payment-fd-pse.module';
import { PsePrivateEffects } from '../../store/effects/pse-private.effects';
import { PaymentFreeDestinationModel } from '../../store/models/payment-free-destination.model';
import { PaymentObFreeDestinationReducer } from '../../store/reducers';
import { paymentObFreeDestiantionFeatureKey } from '../../store/state/payment-fd-pse.state';
import { DsStatesCardModule } from './../../../../../../shared/ds/ds-states-card/ds-states-card.module';
import { PsePrivateService } from './../../services/pse-private.service';

import { StepEndRoutingModule } from './step-end-routing.module';
import { StepEndComponent } from './step-end.component';

@NgModule({
  declarations: [StepEndComponent],
  imports: [
    CommonModule,
    CoreModule,
    StepEndRoutingModule,
    TicketModule,
    BtnModule,
    DsStatesCardModule,
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
    PsePrivateService,
    {
      provide: FEATURE_REDUCER_TOKEN_FD,
      useValue: PaymentObFreeDestinationReducer,
    },
  ],
})
export class StepEndModule {}
