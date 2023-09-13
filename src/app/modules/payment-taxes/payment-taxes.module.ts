import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { LineTimeModule } from '@app/shared/line-time/line-time.module';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { TranslateModule } from '@ngx-translate/core';
import { INewPaymentTaxesModuleState } from './entities/payment-taxes';
import { PaymentTaxesComponent } from './payment-taxes.component';
import { PaymentTaxesModel } from './store/model/payment-taxes.model';
import { PaymentTaxesRootReducer } from './store/reducers';
import { NewPaymentTaxesFeatureName } from './store/state/payment-taxes.state';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<INewPaymentTaxesModuleState>
>('Feature Payment Taxes Reducer');
@NgModule({
  declarations: [PaymentTaxesComponent],
  imports: [
    CommonModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    LineTimeModule,
    TranslateModule,
    TemplateSystemModule,
    RouterModule.forChild([
      {
        path: '',
        component: PaymentTaxesComponent,
        children: [
          {
            path: 'a-quien',
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
    StoreModule.forFeature(NewPaymentTaxesFeatureName, FEATURE_REDUCER_TOKEN),
  ],
  providers: [
    PaymentTaxesModel,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: PaymentTaxesRootReducer,
    },
  ],
})
export class PaymentTaxesModule {}
