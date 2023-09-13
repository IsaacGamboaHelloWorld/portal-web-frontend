import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { CoreModule } from '@app/core/core.module';
import { CurrencyModule } from '@app/shared/currency/currency.module';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { FastTransferRoutingModule } from './fast-transfer-routing.module';
import { FastTransferComponent } from './fast-transfer.component';
import { FastTransferModel } from './fast-transfer.model';
import { FastTransferService } from './services/fast-transfer/fast-transfer.service';
import { FastTransferEffect } from './store/effects/fast-transfer.effect';
import { FastTransferRootReducer } from './store/reducers';
import {
  FastTransferName,
  IFastTransferState,
} from './store/state/fast-transfer.state';
export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<IFastTransferState>
>('Feature FastTransferTransfer');
@NgModule({
  declarations: [FastTransferComponent],
  imports: [
    CommonModule,
    CoreModule,
    FastTransferRoutingModule,
    TemplateSystemModule,
    StoreModule.forFeature(FastTransferName, FEATURE_REDUCER_TOKEN),
    CurrencyModule.forRoot('es-US'),
    EffectsModule.forFeature([FastTransferEffect]),
  ],
  providers: [
    FastTransferModel,
    FastTransferService,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: FastTransferRootReducer,
    },
  ],
})
export class FastTransferModule {}
