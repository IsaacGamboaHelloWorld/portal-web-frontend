import { CommonModule } from '@angular/common';
import { HttpUrlEncodingCodec } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { UserSecureDataService } from '@app/core/services/user_data/user-get-secure-data.service';
import { DsModalModule } from '@app/shared/ds/ds-modal/ds-modal.module';
import { ModalModule } from '@app/shared/modal/modal.module';
import { CoreModule } from '@core/core.module';
import { UserDataService } from '@core/services/user_data/user-data.service';
import { ValidatePingService } from '@core/services/validate-ping.service';
import { ProductsEffects } from '@modules/main-container/effects/products.effect';
import { ToPlusEffects } from '@modules/main-container/effects/to-plus.effects';
import { UserInfoEffects } from '@modules/main-container/effects/userInfo.effects';
import { UserSecureDataEffects } from '@modules/main-container/effects/userSecureDataMdm.effects';
import { ValidateSessionEffects } from '@modules/main-container/effects/validate-session.effects';
import { MainContainerModel } from '@modules/main-container/main-container.model';
import { DetailsService } from '@modules/main-container/services/details.service';
import { ProductsService } from '@modules/main-container/services/products.service';
import { ToPlusService } from '@modules/main-container/services/to-plus.service';
import { SecurityService } from '@modules/security/services/security.service';
import { EffectsModule } from '@ngrx/effects';
import { ModalService } from '../../shared/modal/services/modal.service';
import { AdvertisingService } from '../home/services/advertising.service';
import { UnsualOperationsService } from '../unusual-operations/services/unsual-operations.service';
import { UnusualOperationsEffect } from '../unusual-operations/store/effects/unusual-operations.effect';
import { OptionModuleService } from './../dashboard/services/option-module.service';
import { AdvertisingEffects } from './effects/advertising.effects';
import { FreeDestinyEffects } from './effects/free-destiny.effect';
import { OptionModuleEffects } from './effects/option-module.effect';
import { MainContainerRoutingModule } from './main-container-routing.module';
import { MainContainerComponent } from './main-container.component';

@NgModule({
  imports: [
    MainContainerRoutingModule,
    CommonModule,
    CoreModule,
    DsModalModule,
    ModalModule,
    EffectsModule.forFeature([
      UserInfoEffects,
      ProductsEffects,
      ValidateSessionEffects,
      ToPlusEffects,
      UserSecureDataEffects,
      FreeDestinyEffects,
      OptionModuleEffects,
      AdvertisingEffects,
      UnusualOperationsEffect,
    ]),
  ],
  declarations: [MainContainerComponent],
  providers: [
    MainContainerModel,
    UserDataService,
    SecurityService,
    ValidatePingService,
    ProductsService,
    DetailsService,
    ToPlusService,
    ModalService,
    UserSecureDataService,
    OptionModuleService,
    HttpUrlEncodingCodec,
    AdvertisingService,
    UnsualOperationsService,
  ],
})
export class MainContainerModule {
  constructor() {}
}
