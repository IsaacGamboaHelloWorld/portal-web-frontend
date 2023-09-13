import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { INewPaymentTaxesModuleState } from '@app/modules/payment-taxes/entities/payment-taxes';
import { PaymentTaxesModel } from '@app/modules/payment-taxes/store/model/payment-taxes.model';
import { PaymentTaxesRootReducer } from '@app/modules/payment-taxes/store/reducers';
import { NewPaymentTaxesFeatureName } from '@app/modules/payment-taxes/store/state/payment-taxes.state';
import { BtnModule } from '@app/shared/btn/btn.module';
import { DsInputModule } from '@app/shared/ds/ds-input/ds-input.module';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { NameComponent } from './name.component';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<INewPaymentTaxesModuleState>
>('Feature Payment Taxes Reducer');
@NgModule({
  declarations: [NameComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    BtnModule,
    DsInputModule,
    RouterModule.forChild([
      {
        path: '',
        component: NameComponent,
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
export class NameModule {}
