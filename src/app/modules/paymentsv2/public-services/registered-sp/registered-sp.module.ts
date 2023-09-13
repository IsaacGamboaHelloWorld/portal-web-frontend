import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { BtnModule } from '@app/shared/btn/btn.module';
import { ProgrammedPaymentModule } from '@app/shared/cards/payments/programmed-payment/programmed-payment.module';
import { CheckboxSlideModule } from '@app/shared/checkbox-slide/checkbox-slide.module';
import { CurrencyModule } from '@app/shared/currency/currency.module';
import { HistoricModule } from '@app/shared/historic/historic.module';
import { ModalModule } from '@app/shared/modal/modal.module';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { TableModule } from '@app/shared/table/table.module';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { TicketModule } from '@app/shared/ticket/ticket.module';
import { CalendarModule } from 'primeng/calendar';
import { RecurringPopupModule } from '../components/recurring-popup/recurring-popup.module';
import { PublicServicesFacade } from '../public-services.facade';
import { UtilsService } from '../transversal/utils.service';
import { RegisteredPublicServiceComponent } from './components/registered-public-service/registered-public-service.component';
import {
  RegisteredPublicServiceFeatureName,
  RegisteredPublicServiceModuleState,
} from './store/state/registered-sp-module.state';

import { ServicePaymentInfoModule } from '@app/shared/cards/payments/service-payment-info/service-payment-info.module';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { PaymentServiceFacade } from '../payment/payment.facade';
import { RegisteredSPRootReducer } from './store/reducers';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<RegisteredPublicServiceModuleState>
>('Feature registered public service');

@NgModule({
  declarations: [RegisteredPublicServiceComponent],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    TemplateSystemModule,
    TicketModule,
    BtnModule,
    CheckboxSlideModule,
    TableModule,
    CalendarModule,
    HistoricModule,
    ModalModule,
    ProgrammedPaymentModule,
    RecurringPopupModule,
    ServicePaymentInfoModule,
    CurrencyModule.forRoot('es-US'),
    RouterModule.forChild([
      {
        path: '',
        component: RegisteredPublicServiceComponent,
      },
    ]),
    StoreModule.forFeature(
      RegisteredPublicServiceFeatureName,
      FEATURE_REDUCER_TOKEN,
    ),
  ],
  providers: [
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: RegisteredSPRootReducer,
    },
    PublicServicesFacade,
    PaymentServiceFacade,
    ModalService,
    UtilsService,
  ],
})
export class RegisteredSpModule {}
