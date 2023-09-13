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
import { OtpAthWrapperModule } from '@app/shared/otp-ath-wrapper/otp-ath-wrapper.module';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { ModalComponent } from '../modal/modal.component';
import { ModalModule } from '../modal/modal.module';
import { InfoComponent } from './info.component';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<INewPaymentTaxesModuleState>
>('Feature Payment Taxes Reducer');
@NgModule({
  declarations: [InfoComponent],
  entryComponents: [ModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    BtnModule,
    OtpAthWrapperModule,
    ModalModule,
    RouterModule.forChild([
      {
        path: '',
        component: InfoComponent,
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
export class InfoModule {}
