import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { BtnModule } from '@app/shared/btn/btn.module';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { NewPaymentTaxesFeatureName } from '../../store/state/payment-taxes.state';
import { StepThreeComponent } from './step-three.component';

import { EffectsModule } from '@ngrx/effects';
import { INewPaymentTaxesModuleState } from '../../entities/payment-taxes';
import { PaymentTaxesService } from '../../services/payment-taxes.service';
import { PaymentTaxesEffect } from '../../store/effects/payment-taxes.effects';
import { PaymentTaxesModel } from '../../store/model/payment-taxes.model';
import { PaymentTaxesRootReducer } from '../../store/reducers';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<INewPaymentTaxesModuleState>
>('Feature Payment Taxes Reducer');
@NgModule({
  declarations: [StepThreeComponent],
  imports: [
    CoreModule,
    CommonModule,
    BtnModule,
    RouterModule.forChild([
      {
        path: '',
        component: StepThreeComponent,
      },
    ]),
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(NewPaymentTaxesFeatureName, FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([PaymentTaxesEffect]),
  ],
  providers: [
    PaymentTaxesModel,
    PaymentTaxesService,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: PaymentTaxesRootReducer,
    },
  ],
})
export class StepThreeModule {}
