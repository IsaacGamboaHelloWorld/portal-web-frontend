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
import { ICodeAuthModuleState } from '../../entities/code-auth';
import { CodeAuthService } from '../../services/code-auth.service';
import { CodeAuthEffect } from '../../store/effects/code-auth.effects';
import { CodeAuthModel } from '../../store/model/code-auth.model';
import { CodeAuthRootReducer } from '../../store/reducers';
import { NewCodeAuthFeatureName } from '../../store/state/code-auth.state';
import { StepTwoComponent } from './step-two.component';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<ICodeAuthModuleState>
>('Feature Payment Taxes Reducer');

@NgModule({
  declarations: [StepTwoComponent],
  imports: [
    CommonModule,
    CoreModule,
    BtnModule,
    ModalModule,
    RouterModule.forChild([
      {
        path: '',
        component: StepTwoComponent,
      },
    ]),
    FormsModule,
    ReactiveFormsModule,
    CurrencyModule.forRoot('es-US'),
    StoreModule.forFeature(NewCodeAuthFeatureName, FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([CodeAuthEffect]),
  ],
  providers: [
    ModalService,
    CodeAuthModel,
    CodeAuthService,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: CodeAuthRootReducer,
    },
  ],
})
export class StepTwoModule {}
