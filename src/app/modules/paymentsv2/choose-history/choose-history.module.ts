import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  ChooseHistoryFeatureName,
  ChooseHistoryModuleState,
} from '@app/modules/paymentsv2/choose-history/store/state/choose-history-module.state';
import { CoreModule } from '@core/core.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { BtnSquareModule } from '../../../shared/btn-square/btn-square.module';
import { CurrencyModule } from '../../../shared/currency/currency.module';
import { TableModule } from '../../../shared/table/table.module';
import { TemplateSystemModule } from '../../../shared/template-system/template-system.module';
import { ChooseHistoryContainer } from './choose-history.container';
import { ChooseHistoryFacade } from './choose-history.facade';
import { ChooseHistoryService } from './services/choose-history.service';
import { ChooseHistoryEffect } from './store/effects/choose-history.effect';
import { ChooseHistoryRootReducer } from './store/reducers/index';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<ChooseHistoryModuleState>
>('Feature Choose History Payments Reducers');

@NgModule({
  declarations: [ChooseHistoryContainer],
  imports: [
    CommonModule,
    TemplateSystemModule,
    CoreModule,
    BtnSquareModule,
    TableModule,
    CurrencyModule.forRoot('es-US'),
    RouterModule.forChild([
      {
        path: '',
        component: ChooseHistoryContainer,
      },
    ]),
    StoreModule.forFeature(ChooseHistoryFeatureName, FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([ChooseHistoryEffect]),
  ],
  providers: [
    ChooseHistoryService,
    ChooseHistoryFacade,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: ChooseHistoryRootReducer,
    },
  ],
})
export class ChooseHistoryModule {}
