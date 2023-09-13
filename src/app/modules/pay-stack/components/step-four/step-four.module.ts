import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { BtnModule } from '@app/shared/btn/btn.module';
import { DsModalModule } from '@app/shared/ds/ds-modal/ds-modal.module';
import { ModalModule } from '@app/shared/modal/modal.module';
import { TicketModule } from '@app/shared/ticket/ticket.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

import { IPayStackModuleState } from '../../entities/pay-stack';
import { PayStackEffect } from '../../store/effects/pay-stack.effects';
import { PayStackModel } from '../../store/model/pay-stack.model';
import { PayStackRootReducer } from '../../store/reducers';
import { NewPayStackFeatureName } from '../../store/state/pay-stack.state';
import { StepFourComponent } from './step-four.component';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<IPayStackModuleState>
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
    ModalModule,
    DsModalModule,
    StoreModule.forFeature(NewPayStackFeatureName, FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([PayStackEffect]),
  ],
  providers: [
    PayStackModel,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: PayStackRootReducer,
    },
  ],
})
export class StepFourModule {}
