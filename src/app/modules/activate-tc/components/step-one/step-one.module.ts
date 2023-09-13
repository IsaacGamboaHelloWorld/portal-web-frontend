import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { BtnModule } from '@app/shared/btn/btn.module';
import { CurrencyModule } from '@app/shared/currency/currency.module';
import { ModalModule } from '@app/shared/modal/modal.module';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { IActivateTcModuleState } from '../../entities/activate-tc';
import { ActivateTcService } from '../../services/activate-tc.service';
import { ActivateTcEffect } from '../../store/effects/activate-tc.effects';
import { ActivateTcModel } from '../../store/model/activate-tc.model';
import { ActivateTcRootReducer } from '../../store/reducers';
import { NewActivateTcFeatureName } from '../../store/state/activate-tc.state';
import { ModalSuccessComponent } from '../modal-success/modal-success.component';
import { StepOneComponent } from './step-one.component';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<IActivateTcModuleState>
>('Feature Payment Taxes Reducer');
@NgModule({
  declarations: [StepOneComponent, ModalSuccessComponent],
  imports: [
    CommonModule,
    CoreModule,
    BtnModule,
    ModalModule,
    RouterModule.forChild([
      {
        path: '',
        component: StepOneComponent,
      },
    ]),
    FormsModule,
    ReactiveFormsModule,
    CurrencyModule.forRoot('es-US'),
    StoreModule.forFeature(NewActivateTcFeatureName, FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([ActivateTcEffect]),
  ],
  entryComponents: [ModalSuccessComponent],
  providers: [
    ModalService,
    ActivateTcModel,
    ActivateTcService,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: ActivateTcRootReducer,
    },
  ],
})
export class StepOneModule {}
