import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { CoreModule } from '../../../../core/core.module';
import { BtnModule } from '../../../../shared/btn/btn.module';
import { CurrencyModule } from '../../../../shared/currency/currency.module';
import { TemplateSystemModule } from '../../../../shared/template-system/template-system.module';
import { EnrollPublicServiceContainer } from './enroll.container';
import { EnrollFacade } from './enroll.facade';
import { EnrollService } from './services/enroll-service.service';
import { EnrollServiceEffect } from './store/effects/enroll-service.effect';
import { EnrollServiceRootReducer } from './store/reducers/index';

import {
  EnrollServiceFeatureName,
  EnrollServiceModuleState,
} from './store/state/enroll-module.state';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<EnrollServiceModuleState>
>('Feature Enroll Public Service Reducers');

@NgModule({
  declarations: [EnrollPublicServiceContainer],
  imports: [
    CommonModule,
    CoreModule,
    TemplateSystemModule,
    FormsModule,
    ReactiveFormsModule,
    BtnModule,
    CurrencyModule.forRoot('es-US'),
    RouterModule.forChild([
      {
        path: '',
        component: EnrollPublicServiceContainer,
      },
    ]),
    StoreModule.forFeature(EnrollServiceFeatureName, FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([EnrollServiceEffect]),
  ],
  providers: [
    EnrollService,
    EnrollFacade,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: EnrollServiceRootReducer,
    },
  ],
})
export class EnrollPublicServiceModule {}
