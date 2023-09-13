import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StateInputModule } from '@app/shared/state-input/state-input.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { CoreModule } from '../../../core/core.module';
import { BtnModule } from '../../../shared/btn/btn.module';
import { ProgrammedPaymentModule } from '../../../shared/cards/payments/programmed-payment/programmed-payment.module';
import { ServicePaymentInfoModule } from '../../../shared/cards/payments/service-payment-info/service-payment-info.module';
import { ServiceToAdminModule } from '../../../shared/cards/payments/service-to-admin/service-to-admin.module';
import { ServiceToPayModule } from '../../../shared/cards/payments/service-to-pay/service-to-pay.module';
import { CurrencyModule } from '../../../shared/currency/currency.module';
import { DropdownModuleSelect } from '../../../shared/dropdown-select/dropdown-select.module';
import { ModalModule } from '../../../shared/modal/modal.module';
import { ModalService } from '../../../shared/modal/services/modal.service';
import { TableModule } from '../../../shared/table/table.module';
import { TemplateSystemModule } from '../../../shared/template-system/template-system.module';
import { ProgrammedPaymentComponent } from './../../../shared/cards/payments/programmed-payment/programmed-payment.component';
import { ModalSuccessModule } from './components/modal-success/modal-success.module';
import { RecurringPopupModule } from './components/recurring-popup/recurring-popup.module';
import { PaymentServiceFacade } from './payment/payment.facade';
import { PublicServicesContainer } from './public-services.container';
import { PublicServicesFacade } from './public-services.facade';
import { EnabledAgreementsService } from './services/enabled-agreements.service';
import { PublicServicesService } from './services/public-services.service';
import { EnabledAgreementsEffect } from './store/effects/enabled-agreements.effect';
import { PublicServicesEffect } from './store/effects/public-services.effect';
import { PublicServicesRootReducer } from './store/reducers';
import {
  PublicServiceFeatureName,
  PublicServiceModuleState,
} from './store/state/public-services-module.state';
import { UtilsService } from './transversal/utils.service';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<PublicServiceModuleState>
>('Feature Choose History Payments Reducers');

@NgModule({
  declarations: [PublicServicesContainer],
  imports: [
    CommonModule,
    TemplateSystemModule,
    CoreModule,
    ServiceToPayModule,
    ServiceToAdminModule,
    TableModule,
    ServicePaymentInfoModule,
    ProgrammedPaymentModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    DropdownModuleSelect,
    StateInputModule,
    BtnModule,
    RecurringPopupModule,
    ModalSuccessModule,
    CurrencyModule.forRoot('es-US'),
    RouterModule.forChild([
      {
        path: '',
        component: PublicServicesContainer,
      },
    ]),
    StoreModule.forFeature(PublicServiceFeatureName, FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([PublicServicesEffect, EnabledAgreementsEffect]),
  ],
  providers: [
    PublicServicesService,
    PublicServicesFacade,
    PaymentServiceFacade,
    EnabledAgreementsService,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: PublicServicesRootReducer,
    },
    ModalService,
    UtilsService,
  ],
  entryComponents: [ProgrammedPaymentComponent],
  exports: [ProgrammedPaymentComponent],
})
export class PublicServicesModule {}
