import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { PaymentModel } from '@app/modules/payments/payment.model';
import { BtnModule } from '@app/shared/btn/btn.module';
import { CheckboxSlideModule } from '@app/shared/checkbox-slide/checkbox-slide.module';
import { CurrencyModule } from '@app/shared/currency/currency.module';
import { HistoricModule } from '@app/shared/historic/historic.module';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { TableModule } from '@app/shared/table/table.module';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { TicketModule } from '@app/shared/ticket/ticket.module';
import { TransferModel } from '@modules/transfer-to-account/transfer.model';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { CalendarModule } from 'primeng/calendar';
import { UtilsService } from '../transversal/utils.service';
import { ManipulateDomService } from './../../../../core/services/manipulate-dom/manipulate-dom.service';
import { FinancialOpFacade } from './../finantial-ob.facade';
import { FavoritePaymentsComponent } from './components/favorite-payments/favorite-payments.component';
import { RegisteredObligationComponent } from './components/registered-obligation/registered-obligation.component';
import { RegisteredOBRootReducer } from './store/reducers';
import {
  RegisteredObFeatureName,
  RegisteredObModuleState,
} from './store/state/registered-ob-module.state';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<RegisteredObModuleState>
>('Feature Registered Obligations Reducers');

@NgModule({
  declarations: [RegisteredObligationComponent, FavoritePaymentsComponent],
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
    CurrencyModule.forRoot('es-US'),
    RouterModule.forChild([
      {
        path: '',
        component: RegisteredObligationComponent,
      },
    ]),
    StoreModule.forFeature(RegisteredObFeatureName, FEATURE_REDUCER_TOKEN),
  ],
  providers: [
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: RegisteredOBRootReducer,
    },
    FinancialOpFacade,
    ModalService,
    TransferModel,
    UtilsService,
    ManipulateDomService,
    PaymentModel,
  ],
})
export class RegisteredObModule {}
