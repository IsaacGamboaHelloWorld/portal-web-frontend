import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DsModalModule } from '@app/shared/ds/ds-modal/ds-modal.module';
import { LineTimeModule } from '@app/shared/line-time/line-time.module';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { IPayStackModuleState } from './entities/pay-stack';
import { PayStackComponent } from './pay-stack.component';
import { PayStackModel } from './store/model/pay-stack.model';
import { PayStackRootReducer } from './store/reducers';
import { NewPayStackFeatureName } from './store/state/pay-stack.state';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<IPayStackModuleState>
>('Feature Payment Taxes Reducer');

@NgModule({
  declarations: [PayStackComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    LineTimeModule,
    TranslateModule,
    TemplateSystemModule,
    DsModalModule,
    RouterModule.forChild([
      {
        path: '',
        component: PayStackComponent,
        children: [
          {
            path: 'donde',
            loadChildren: () =>
              import('./components/step-one/step-one.module').then(
                (m) => m.StepOneModule,
              ),
          },
          {
            path: 'por-cuanto',
            loadChildren: () =>
              import('./components/step-two/step-two.module').then(
                (m) => m.StepTwoModule,
              ),
          },
          {
            path: 'cuando',
            loadChildren: () =>
              import('./components/step-three/step-three.module').then(
                (m) => m.StepThreeModule,
              ),
          },
          {
            path: 'confirmar',
            loadChildren: () =>
              import('./components/step-four/step-four.module').then(
                (m) => m.StepFourModule,
              ),
          },
        ],
      },
    ]),
    StoreModule.forFeature(NewPayStackFeatureName, FEATURE_REDUCER_TOKEN),
  ],
  providers: [
    PayStackModel,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: PayStackRootReducer,
    },
  ],
})
export class PayStackModule {}
