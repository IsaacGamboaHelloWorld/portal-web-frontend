import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  InjectionToken,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { AlertsComponent } from './alerts.component';
import { AlertsService } from './services/alerts.service';
import { AlertsEffect } from './store/effects/alerts.effect';
import { GroupsAlertsEffect } from './store/effects/groups.effect';
import { UserAlertsEffect } from './store/effects/user.effect';
import { AlertsModel } from './store/model/alerts.model';
import { AlertsHomeRootReducer } from './store/reducers';
import {
  AlertsFeatureName,
  AlertsModuleState,
} from './store/state/alerts-module.state';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<AlertsModuleState>
>('Feature Alerts Notifications Reducers');

@NgModule({
  declarations: [AlertsComponent],
  imports: [
    CommonModule,
    TemplateSystemModule,
    TranslateModule,
    RouterModule.forChild([
      {
        path: '',
        component: AlertsComponent,
        children: [
          {
            path: 'onboarding',
            loadChildren: () =>
              import('./components/onboarding/onboarding.module').then(
                (m) => m.OnboardingModule,
              ),
          },
          {
            path: 'mis-alertas',
            loadChildren: () =>
              import('./components/home/home.module').then((m) => m.HomeModule),
          },
          {
            path: 'crear-alerta',
            loadChildren: () =>
              import('./components/create/create.module').then(
                (m) => m.CreateModule,
              ),
          },
        ],
      },
    ]),
    StoreModule.forFeature(AlertsFeatureName, FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([
      AlertsEffect,
      UserAlertsEffect,
      GroupsAlertsEffect,
    ]),
  ],
  providers: [
    AlertsService,
    AlertsModel,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: AlertsHomeRootReducer,
    },
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class AlertsModule {}
