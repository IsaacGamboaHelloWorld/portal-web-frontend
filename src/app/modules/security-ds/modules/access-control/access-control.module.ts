import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { CoreModule } from '@app/core/core.module';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap } from '@ngrx/store';
import { AccessControlContainerComponent } from './access-control-container.component';
import { CardHomeOptionsComponent } from './components/card-home-options/card-home-options.component';
import { AccessControlEffect } from './store/effects/access-control.effects';

import { CheckboxSlideModule } from '@app/shared/checkbox-slide/checkbox-slide.module';
import { DsModalModule } from '@app/shared/ds/ds-modal/ds-modal.module';
import { AccessControlRoutingModule } from './access-control-routing.module';
import { AccessControlHomeComponent } from './components/access-control-home/access-control-home.component';
import { ChannelLockService } from './services/channel-lock.service';
import { AccessControlModel } from './store/models/access-control.models';
import { IAccessControlModuleState } from './store/state/access-control.state';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<IAccessControlModuleState>
>('Feature AccessControl');

@NgModule({
  declarations: [
    AccessControlContainerComponent,
    AccessControlHomeComponent,
    CardHomeOptionsComponent,
  ],
  imports: [
    CommonModule,
    AccessControlRoutingModule,
    TemplateSystemModule,
    CoreModule,
    CheckboxSlideModule,
    DsModalModule,
    EffectsModule.forFeature([AccessControlEffect]),
  ],
  providers: [ChannelLockService, AccessControlModel],
})
export class AccessControlModule {}
