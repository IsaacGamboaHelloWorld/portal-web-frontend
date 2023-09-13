import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { INewPaymentTaxesModuleState } from '../payment-taxes/entities/payment-taxes';
import { PaymentTaxesModel } from '../payment-taxes/store/model/payment-taxes.model';
import { PaymentTaxesRootReducer } from '../payment-taxes/store/reducers';
import { NewPaymentTaxesFeatureName } from '../payment-taxes/store/state/payment-taxes.state';
import { BiometricComponent } from './biometric.component';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<INewPaymentTaxesModuleState>
>('Feature Payment Taxes Reducer');
@NgModule({
  declarations: [BiometricComponent],
  imports: [
    CommonModule,
    CoreModule,
    TemplateSystemModule,
    RouterModule.forChild([
      {
        path: '',
        component: BiometricComponent,
        children: [
          {
            path: 'inicio',
            loadChildren: () =>
              import('./components/info/info.module').then((m) => m.InfoModule),
          },
          {
            path: 'home',
            loadChildren: () =>
              import('./components/home/home.module').then((m) => m.HomeModule),
          },
          {
            path: 'name',
            loadChildren: () =>
              import('./components/name/name.module').then((m) => m.NameModule),
          },
          {
            path: 'condiciones',
            loadChildren: () =>
              import('./components/terms/terms.module').then(
                (m) => m.TermsModule,
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
export class BiometricModule {}
