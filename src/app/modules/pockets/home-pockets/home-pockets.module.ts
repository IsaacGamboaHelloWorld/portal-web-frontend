import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { CoreModule } from '@core/core.module';
import { HomePocketsFacade } from '@modules/pockets/home-pockets/home-pockets.facade';
import { HomePocketsRootReducer } from '@modules/pockets/home-pockets/store/reducers';
import {
  HomePocketsFeatureName,
  HomePocketsModuleState,
} from '@modules/pockets/home-pockets/store/state/home-pockets-module.state';
import { BtnModule } from '../../../shared/btn/btn.module';
import { ModalModule } from '../../../shared/modal/modal.module';
import { ModalService } from '../../../shared/modal/services/modal.service';
import { CardPocketComponent } from './components/card-pocket/card-pocket.component';
import { NewPocketComponent } from './components/new-pocket/new-pocket.component';
import { PopupOnboardingComponent } from './components/popup-onboarding/popup-onboarding.component';
import { HomePocketsContainer } from './home-pockets.container';
import { HomePocketsService } from './services/home-pockets.service';
import { DetailPocketEffect } from './store/effects/detail-pocket.effect';
import { HomePocketsEffect } from './store/effects/home-pockets.effect';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<HomePocketsModuleState>
>('Feature Home Pockets Reducers');

@NgModule({
  declarations: [
    HomePocketsContainer,
    NewPocketComponent,
    CardPocketComponent,
    PopupOnboardingComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    BtnModule,
    ModalModule,
    TemplateSystemModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePocketsContainer,
      },
    ]),
    StoreModule.forFeature(HomePocketsFeatureName, FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([HomePocketsEffect, DetailPocketEffect]),
  ],
  providers: [
    HomePocketsService,
    ModalService,
    HomePocketsFacade,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: HomePocketsRootReducer,
    },
  ],
  entryComponents: [PopupOnboardingComponent],
})
export class HomePocketsModule {}
