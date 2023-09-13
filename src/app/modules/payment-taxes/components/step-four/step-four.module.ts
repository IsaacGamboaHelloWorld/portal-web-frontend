import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { BtnModule } from '@app/shared/btn/btn.module';
import { DsModalModule } from '@app/shared/ds/ds-modal/ds-modal.module';
import { TicketModule } from '@app/shared/ticket/ticket.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { INewPaymentTaxesModuleState } from '../../entities/payment-taxes';
import { PaymentTaxesService } from '../../services/payment-taxes.service';
import { PaymentTaxesEffect } from '../../store/effects/payment-taxes.effects';
import { PaymentTaxesModel } from '../../store/model/payment-taxes.model';
import { PaymentTaxesRootReducer } from '../../store/reducers';
import { NewPaymentTaxesFeatureName } from '../../store/state/payment-taxes.state';
import { StepFourComponent } from './step-four.component';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<INewPaymentTaxesModuleState>
>('Feature Payment Taxes Reducer');
@NgModule({
  declarations: [StepFourComponent],
  imports: [
    CommonModule,
    BtnModule,
    TicketModule,
    RouterModule.forChild([
      {
        path: '',
        component: StepFourComponent,
      },
    ]),
    CoreModule,
    DsModalModule,
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
export class StepFourModule {}
