import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { BtnModule } from '@app/shared/btn/btn.module';
import { TicketModule } from '@app/shared/ticket/ticket.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { InputMaskModule } from 'primeng/inputmask';
import { IPayStackModuleState } from '../../entities/pay-stack';
import { PayStackEffect } from '../../store/effects/pay-stack.effects';
import { PayStackModel } from '../../store/model/pay-stack.model';
import { PayStackRootReducer } from '../../store/reducers';
import { NewPayStackFeatureName } from '../../store/state/pay-stack.state';
import { StepThreeComponent } from './step-three.component';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<IPayStackModuleState>
>('Feature Payment Taxes Reducer');
@NgModule({
  declarations: [StepThreeComponent],
  imports: [
    CoreModule,
    CommonModule,
    BtnModule,
    TicketModule,
    RouterModule.forChild([
      {
        path: '',
        component: StepThreeComponent,
      },
    ]),
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(NewPayStackFeatureName, FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([PayStackEffect]),
    InputMaskModule,
  ],
  providers: [
    PayStackModel,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: PayStackRootReducer,
    },
  ],
})
export class StepThreeModule {}
