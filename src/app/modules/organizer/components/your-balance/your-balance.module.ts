import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { CoreModule } from '@app/core/core.module';
import { HomeModel } from '@app/modules/home/home.model';
import { HomePocketsFacade } from '@app/modules/pockets/home-pockets/home-pockets.facade';
import { HomePocketsService } from '@app/modules/pockets/home-pockets/services/home-pockets.service';
import { HomePocketsEffect } from '@app/modules/pockets/home-pockets/store/effects/home-pockets.effect';
import { HomePocketsRootReducer } from '@app/modules/pockets/home-pockets/store/reducers';
import {
  HomePocketsFeatureName,
  HomePocketsModuleState,
} from '@app/modules/pockets/home-pockets/store/state/home-pockets-module.state';
import { BarProgressModule } from '@app/shared/bar-progress/bar-progress.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { YourBalanceComponent } from './your-balance.component';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<HomePocketsModuleState>
>('Feature Home Pockets Reducers');
@NgModule({
  declarations: [YourBalanceComponent],
  imports: [
    CommonModule,
    CoreModule,
    BarProgressModule,
    StoreModule.forFeature(HomePocketsFeatureName, FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([HomePocketsEffect]),
  ],
  exports: [YourBalanceComponent],
  providers: [
    HomeModel,
    HomePocketsService,
    HomePocketsFacade,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: HomePocketsRootReducer,
    },
  ],
})
export class YourBalanceModule {}
