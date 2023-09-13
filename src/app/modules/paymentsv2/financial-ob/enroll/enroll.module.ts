import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StateInputModule } from '@app/shared/state-input/state-input.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap } from '@ngrx/store';
import { CoreModule } from '../../../../core/core.module';
import { BanksEffect } from '../../../../core/effects/banks.effect';
import { TypeCreditCardPipe } from '../../../../core/pipes/type-credit-card/type-credit-card.pipe';
import { BanksService } from '../../../../core/services/banks/banks.service';
import { BtnModule } from '../../../../shared/btn/btn.module';
import { CurrencyModule } from '../../../../shared/currency/currency.module';
import { DropdownModuleSelect } from '../../../../shared/dropdown-select/dropdown-select.module';
import { TemplateSystemModule } from '../../../../shared/template-system/template-system.module';
import { PaymentEffect } from '../../../payments/effects/payment.effect';
import { PaymentModel } from '../../../payments/payment.model';
import { PaymentService } from '../../../payments/services/payment/payment.service';
import { FinancialOpFacade } from '../finantial-ob.facade';
import { EnrollFOContainer } from './enroll.container';
import { EnrollFinancialOpRootReducer } from './store/reducers';
import { EnrollFinancialModuleState } from './store/state/enroll-of-module.state';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<EnrollFinancialModuleState>
>('Feature Enroll Public Service Reducers');

@NgModule({
  declarations: [EnrollFOContainer],
  imports: [
    CommonModule,
    CoreModule,
    TemplateSystemModule,
    FormsModule,
    ReactiveFormsModule,
    StateInputModule,
    DropdownModuleSelect,
    BtnModule,
    CurrencyModule.forRoot('es-US'),
    EffectsModule.forFeature([BanksEffect, PaymentEffect]),
    RouterModule.forChild([
      {
        path: '',
        component: EnrollFOContainer,
      },
    ]),
  ],
  providers: [
    FinancialOpFacade,
    PaymentModel,
    BanksService,
    PaymentService,
    TypeCreditCardPipe,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: EnrollFinancialOpRootReducer,
    },
  ],
})
export class EnrollFOModule {}
