import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { CoreModule } from './../../core/core.module';
import { BtnModule } from './../../shared/btn/btn.module';
import { ModalSuccessComponent } from './shared/modal-success/modal-success.component';
import { TuPlusComponent } from './tu-plus.component';

import { HttpUrlEncodingCodec } from '@angular/common/http';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { SecurityService } from '../security/services/security.service';
import { MdlAuthOtpModule } from './shared/mdl-auth-otp/mdl-auth-otp.module';
import { ConfigurationEffect } from './store/effects/configuration.effect';
import { HistoricMovementsEffect } from './store/effects/historic-movements.effect';
import { OTPGenerationEffect } from './store/effects/otp-generation.effect';
import { RedemptionEffect } from './store/effects/redemption.effect';
import { YourPlusModel } from './store/models/your-plus.model';
import { YourPlusRootReducer } from './store/reducers';
import { IYourPlusState, YourPlusName } from './store/state/your-plus.state';
import { TuPlusRoutingModule } from './tu-plus-routing.module';
import { TuPlusSerivceFacade } from './tu-plus.facade';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<IYourPlusState>
>('Feature TuPlus');

@NgModule({
  declarations: [TuPlusComponent, ModalSuccessComponent],
  imports: [
    CommonModule,
    CoreModule,
    TemplateSystemModule,
    TuPlusRoutingModule,
    BtnModule,
    MdlAuthOtpModule,
    StoreModule.forFeature(YourPlusName, FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([
      HistoricMovementsEffect,
      ConfigurationEffect,
      RedemptionEffect,
      OTPGenerationEffect,
    ]),
  ],
  providers: [
    ModalService,
    HttpUrlEncodingCodec,
    SecurityService,
    TuPlusSerivceFacade,
    YourPlusModel,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: YourPlusRootReducer,
    },
  ],
  entryComponents: [ModalSuccessComponent],
})
export class TuPlusModule {}
