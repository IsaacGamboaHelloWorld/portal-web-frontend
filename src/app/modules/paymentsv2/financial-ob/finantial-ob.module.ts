import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoanToAdminModule } from '@app/shared/cards/payments/loan-to-admin/loan-to-admin.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { CoreModule } from '../../../core/core.module';
import { BanksEffect } from '../../../core/effects/banks.effect';
import { BanksService } from '../../../core/services/banks/banks.service';
import { BtnModule } from '../../../shared/btn/btn.module';
import { FinancialToPayModule } from '../../../shared/cards/payments/financial-to-pay/financial-to-pay.module';
import { LoanPaymentInfoModule } from '../../../shared/cards/payments/loan-payment-info/loan-payment-info.module';
import { ProgrammedPaymentModule } from '../../../shared/cards/payments/programmed-payment/programmed-payment.module';
import { CurrencyModule } from '../../../shared/currency/currency.module';
import { TableModule } from '../../../shared/table/table.module';
import { TemplateSystemModule } from '../../../shared/template-system/template-system.module';
import { PaymentModel } from '../../payments/payment.model';
import { TicketModule } from './../../../shared/ticket/ticket.module';
import { FinantialObContainer } from './finantial-ob.container';
import { FinancialOpFacade } from './finantial-ob.facade';
import { PsePrivateService } from './payment-fd-pse/services/pse-private.service';
import { PsePrivateEffects } from './payment-fd-pse/store/effects/pse-private.effects';
import { PaymentFreeDestinationModel } from './payment-fd-pse/store/models/payment-free-destination.model';
import { FinancialOpService } from './services/financial-op.service';
import { FinancialOpEffect } from './store/effects/financial-op.effect';
import { PaymentHistoryEffect } from './store/effects/payment-history.effect';
import { FinancialOBRootReducer } from './store/reducers/index';
import {
  FinancialOpFeatureName,
  FinancialOpModuleState,
} from './store/state/financial-op-module.state';
import { UtilsService } from './transversal/utils.service';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<FinancialOpModuleState>
>('Feature Financial Operations Reducers');

@NgModule({
  declarations: [FinantialObContainer],
  imports: [
    CommonModule,
    CoreModule,
    TemplateSystemModule,
    TableModule,
    ProgrammedPaymentModule,
    FinancialToPayModule,
    TicketModule,
    LoanToAdminModule,
    LoanPaymentInfoModule,
    BtnModule,
    CurrencyModule.forRoot('es-US'),
    RouterModule.forChild([
      {
        path: '',
        component: FinantialObContainer,
      },
    ]),
    StoreModule.forFeature(FinancialOpFeatureName, FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([
      FinancialOpEffect,
      BanksEffect,
      PsePrivateEffects,
      PaymentHistoryEffect,
    ]),
  ],
  providers: [
    FinancialOpService,
    FinancialOpFacade,
    PaymentModel,
    BanksService,
    UtilsService,
    PaymentFreeDestinationModel,
    PsePrivateService,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: FinancialOBRootReducer,
    },
  ],
})
export class FinantialObModule {}
