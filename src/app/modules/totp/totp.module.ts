import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { BtnModule } from '@app/shared/btn/btn.module';
import { CardNotificationModule } from '@app/shared/card-notification/card-notification.module';
import { DsInputModule } from '@app/shared/ds/ds-input/ds-input.module';
import { DsLoadingModule } from '@app/shared/ds/ds-loading/ds-loading.module';
import { DsModalModule } from '@app/shared/ds/ds-modal/ds-modal.module';
import { ModalModule } from '@app/shared/modal/modal.module';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ContainerComponent } from './container.component';
import { ToptService } from './services/topt.service';
import { TotpEffect } from './store/effects/totp.effects';
import { TotpModel } from './store/models/totp.model';
import { TotpRootReducer } from './store/reducers';
import { ITotpModuleState, TotpFeatureName } from './store/state/totp.state';
import { TotpRoutingModule } from './totp-routing.module';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<ITotpModuleState>
>('Feature Totp');

@NgModule({
  declarations: [ContainerComponent, HomeComponent, RegisterComponent],
  imports: [
    CommonModule,
    TotpRoutingModule,
    CoreModule,
    BtnModule,
    CardNotificationModule,
    DsLoadingModule,
    TemplateSystemModule,
    DsInputModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(TotpFeatureName, FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([TotpEffect]),
    ModalModule,
    DsModalModule,
  ],
  providers: [
    ToptService,
    TotpModel,
    ModalService,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: TotpRootReducer,
    },
  ],
})
export class TotpModule {}
