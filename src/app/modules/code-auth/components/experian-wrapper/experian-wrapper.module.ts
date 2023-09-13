import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  InjectionToken,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { BtnModule } from '@app/shared/btn/btn.module';
import { CurrencyModule } from '@app/shared/currency/currency.module';
import { ExperianModule } from '@app/shared/experian/experian.module';
import { ModalModule } from '@app/shared/modal/modal.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { ExperianService } from '../../services/experian.service';
import { ExperianEffect } from '../../store/effects/experian.effects';
import { CodeAuthModel } from '../../store/model/code-auth.model';
import { CodeAuthRootReducer } from '../../store/reducers';
import { NewCodeAuthFeatureName } from '../../store/state/code-auth.state';
import { ExperianWrapperComponent } from './experian-wrapper.component';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<ActionReducerMap<any>>(
  'Feature Experian Reducer',
);

@NgModule({
  declarations: [ExperianWrapperComponent],
  imports: [
    CommonModule,
    CoreModule,
    BtnModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    CurrencyModule.forRoot('es-US'),
    StoreModule.forFeature(NewCodeAuthFeatureName, FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([ExperianEffect]),
    RouterModule.forChild([
      {
        path: '',
        component: ExperianWrapperComponent,
      },
    ]),
    ExperianModule,
  ],
  providers: [
    CodeAuthModel,
    ExperianService,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: CodeAuthRootReducer,
    },
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class ExperianWrapperModule {}
