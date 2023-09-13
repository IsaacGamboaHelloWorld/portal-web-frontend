import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { CoreModule } from '@app/core/core.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { ModalService } from '../modal/services/modal.service';
import { OtpModalModule } from './components/otp-ath-modal.module';
import { OtpAthWrapperComponent } from './otp-ath-wrapper.component';
import { OtpAthService } from './services/otp-ath.service';
import {
  IOtpAthModuleState,
  OtpAthEffect,
  otpAthFeatureName,
  OtpAthModel,
  OtpAthRootReducer,
} from './store';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<IOtpAthModuleState>
>('Feature Otp Ath');

@NgModule({
  declarations: [OtpAthWrapperComponent],
  imports: [
    CommonModule,
    OtpModalModule,
    CoreModule,
    StoreModule.forFeature(otpAthFeatureName, FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([OtpAthEffect]),
  ],
  providers: [
    OtpAthService,
    OtpAthModel,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: OtpAthRootReducer,
    },
  ],
  entryComponents: [OtpAthWrapperComponent],
  exports: [OtpAthWrapperComponent],
})
export class OtpAthWrapperModule {}
