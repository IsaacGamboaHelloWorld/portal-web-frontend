import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { ManipulateDomService } from './../../core/services/manipulate-dom/manipulate-dom.service';
import { SecurityDsContainerComponent } from './security-ds-container.component';

import { CoreModule } from '@app/core/core.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { CardHomeOptionsComponent } from './components/card-home-options/card-home-options.component';
import { HomeSecurityComponent } from './components/home-security/home-security.component';
import { LimitManagementService } from './modules/limit-management/services/limit-management.service';
import {
  LimitManagementEffect,
  LimitManagementModel,
} from './modules/limit-management/store';
import { SecurityDsRoutingModule } from './security-ds-routing.module';
import { SecurityModel } from './store/model/security.model';
import { SecurityRootReducer } from './store/reducers';
import {
  ISecurityModuleState,
  SecurityFeatureName,
} from './store/state/security-state';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<ISecurityModuleState>
>('Feature Security Ds');

@NgModule({
  declarations: [
    SecurityDsContainerComponent,
    HomeSecurityComponent,
    CardHomeOptionsComponent,
  ],
  imports: [
    CommonModule,
    SecurityDsRoutingModule,
    TemplateSystemModule,
    CoreModule,
    StoreModule.forFeature(SecurityFeatureName, FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([LimitManagementEffect]),
  ],
  providers: [
    ManipulateDomService,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: SecurityRootReducer,
    },
    SecurityModel,
    LimitManagementModel,
    LimitManagementService,
  ],
})
export class SecurityDsModule {}
