import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';

import { CreateDateModule } from '@app/shared/create-date/create-date.module';
import { HistoricTransactionModule } from '@app/shared/historic-transaction/historic-transaction.module';
import { CoreModule } from '@core/core.module';
import { HomePaymentContainer } from '@modules/payments/home-payments/home-payment.container';
import { HomePaymentsFacade } from '@modules/payments/home-payments/home-payments.facade';
import { HistoricPaymentsService } from '@modules/payments/home-payments/services/historic-payments.service';
import { HistoricPaymentsEffect } from '@modules/payments/home-payments/store/effects/historic-payments.effect';
import { HomePaymentRootReducer } from '@modules/payments/home-payments/store/reducers';
import {
  HomePaymentFeatureName,
  HomePaymentModuleState,
} from '@modules/payments/home-payments/store/state/home-payments-module.state';
import { EmptyHistoricComponent } from './components/empty-historic/empty-historic.component';
import { HistoricStatusComponent } from './components/historic-status/historic-status.component';
import { HistoricComponent } from './components/historic/historic.component';
import { TransactionComponent } from './components/transaction/transaction.component';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<HomePaymentModuleState>
>('Feature Home Payments Reducers');

@NgModule({
  declarations: [
    HomePaymentContainer,
    EmptyHistoricComponent,
    TransactionComponent,
    HistoricComponent,
    HistoricStatusComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    HistoricTransactionModule,
    CreateDateModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePaymentContainer,
      },
    ]),
    StoreModule.forFeature(HomePaymentFeatureName, FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([HistoricPaymentsEffect]),
  ],
  providers: [
    HistoricPaymentsService,
    HomePaymentsFacade,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: HomePaymentRootReducer,
    },
  ],
})
export class HomePaymentsModule {}
