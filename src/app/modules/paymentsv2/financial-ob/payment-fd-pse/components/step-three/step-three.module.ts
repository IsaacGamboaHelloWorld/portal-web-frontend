import { CommonModule, CurrencyPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { BtnModule } from '@app/shared/btn/btn.module';
import { CurrencyModule } from '@app/shared/currency/currency.module';
import { DsInputModule } from '@app/shared/ds/ds-input/ds-input.module';
import { StoreModule } from '@ngrx/store';
import { FEATURE_REDUCER_TOKEN_FD } from '../../payment-fd-pse.module';
import { PaymentFreeDestinationModel } from '../../store/models/payment-free-destination.model';
import { PaymentObFreeDestinationReducer } from '../../store/reducers';
import { paymentObFreeDestiantionFeatureKey } from '../../store/state/payment-fd-pse.state';

import { StepThreeRoutingModule } from './step-three-routing.module';
import { StepThreeComponent } from './step-three.component';

@NgModule({
  declarations: [StepThreeComponent],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    StepThreeRoutingModule,
    BtnModule,
    DsInputModule,
    CurrencyModule.forRoot('es-US'),
    StoreModule.forFeature(
      paymentObFreeDestiantionFeatureKey,
      FEATURE_REDUCER_TOKEN_FD,
    ),
  ],
  providers: [
    ManipulateDomService,
    PaymentFreeDestinationModel,
    CurrencyPipe,
    {
      provide: FEATURE_REDUCER_TOKEN_FD,
      useValue: PaymentObFreeDestinationReducer,
    },
  ],
})
export class StepThreeModule {}
