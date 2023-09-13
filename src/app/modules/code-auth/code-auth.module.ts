import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  InjectionToken,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { ApplicationModel } from '@app/application.model';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { DebitCardListService } from '../blocked-products/services/debit-card-list.service';
import { DebitCardListEffects } from '../blocked-products/store/effects/debit-card-list.effects';
import { BlockedProductsModel } from '../blocked-products/store/model/blocked-products.model';
import { BlockProductsReducers } from '../blocked-products/store/reducers';
import {
  BlockProductFeatureName,
  FEATURE_BLOCK_PRODUCT_REDUCER,
} from '../blocked-products/store/state/block-product.state';
import { CodeAuthComponent } from './code-auth.component';
import { ICodeAuthModuleState } from './entities/code-auth';
import { CodeAuthService } from './services/code-auth.service';
import { ExperianService } from './services/experian.service';
import { CodeAuthEffect } from './store/effects/code-auth.effects';
import { ExperianEffect } from './store/effects/experian.effects';
import { CodeAuthSecureDataEffect } from './store/effects/home-auth-effects';
import { CodeAuthModel } from './store/model/code-auth.model';
import { CodeAuthRootReducer } from './store/reducers';
import { NewCodeAuthFeatureName } from './store/state/code-auth.state';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<ICodeAuthModuleState>
>('Feature Payment Taxes Reducer');

@NgModule({
  declarations: [CodeAuthComponent],
  imports: [
    CommonModule,
    TranslateModule,
    TemplateSystemModule,
    RouterModule.forChild([
      {
        path: '',
        component: CodeAuthComponent,
        children: [
          {
            path: 'inicio',
            loadChildren: () =>
              import('./components/home-code-auth/home-code-auth.module').then(
                (m) => m.HomeCodeAuthModule,
              ),
          },
          {
            path: 'onboarding',
            loadChildren: () =>
              import('./components/step-one/step-one.module').then(
                (m) => m.StepOneModule,
              ),
          },
          {
            path: 'activar',
            loadChildren: () =>
              import('./components/step-two/step-two.module').then(
                (m) => m.StepTwoModule,
              ),
          },
          {
            path: 'centrales-riesgo',
            loadChildren: () =>
              import(
                // tslint:disable-next-line:trailing-comma
                './components/experian-wrapper/experian-wrapper.module'
              ).then((m) => m.ExperianWrapperModule),
          },
        ],
      },
    ]),
    StoreModule.forFeature(
      BlockProductFeatureName,
      FEATURE_BLOCK_PRODUCT_REDUCER,
    ),
    StoreModule.forFeature(NewCodeAuthFeatureName, FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([
      CodeAuthEffect,
      CodeAuthSecureDataEffect,
      ExperianEffect,
      DebitCardListEffects,
    ]),
  ],
  providers: [
    ModalService,
    CodeAuthModel,
    BlockedProductsModel,
    ApplicationModel,
    CodeAuthService,
    ExperianService,
    DebitCardListService,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: CodeAuthRootReducer,
    },
    {
      provide: FEATURE_BLOCK_PRODUCT_REDUCER,
      useValue: BlockProductsReducers,
    },
  ],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class CodeAuthModule {}
