import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { BtnModule } from '@app/shared/btn/btn.module';
import { CardChangeDataModule } from '@app/shared/card-change-data/card-change-data.module';
import { DropdownModuleSelect } from '@app/shared/dropdown-select/dropdown-select.module';
import { StateInputModule } from '@app/shared/state-input/state-input.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { IPayStackModuleState } from '../../entities/pay-stack';
import { PayStackEffect } from '../../store/effects/pay-stack.effects';
import { PayStackModel } from '../../store/model/pay-stack.model';
import { PayStackRootReducer } from '../../store/reducers';
import { NewPayStackFeatureName } from '../../store/state/pay-stack.state';
import { StepOneComponent } from './step-one.component';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<IPayStackModuleState>
>('Feature Payment Taxes Reducer');

@NgModule({
  declarations: [StepOneComponent],
  imports: [
    CommonModule,
    CoreModule,
    BtnModule,
    DropdownModuleSelect,
    AutoCompleteModule,
    StateInputModule,
    CardChangeDataModule,
    RouterModule.forChild([
      {
        path: '',
        component: StepOneComponent,
      },
    ]),
    FormsModule,
    ReactiveFormsModule,
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
export class StepOneModule {}
