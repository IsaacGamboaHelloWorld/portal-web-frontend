import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BtnModule } from '@app/shared/btn/btn.module';
import { AppCalendarModule } from '@app/shared/calendar/calendar.module';
import { CreateDateModule } from '@app/shared/create-date/create-date.module';
import { CurrencyModule } from '@app/shared/currency/currency.module';
import { DsModalModule } from '@app/shared/ds/ds-modal/ds-modal.module';
import { HistoricTransactionModule } from '@app/shared/historic-transaction/historic-transaction.module';
import { HistoricModule } from '@app/shared/historic/historic.module';
import { LineTimeModule } from '@app/shared/line-time/line-time.module';
import { ModalModule } from '@app/shared/modal/modal.module';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { TicketModule } from '@app/shared/ticket/ticket.module';
import { CoreModule } from '@core/core.module';
import { BanksEffect } from '@core/effects/banks.effect';
import { CategoriesEffect } from '@core/effects/categories.effect';
import { CurrencyFormatPipe } from '@core/pipes/currency-format/currency-format.pipe';
import { BanksService } from '@core/services/banks/banks.service';
import { CategoriesService } from '@core/services/categories/categories.service';
import { HistoricErrorComponent } from '@modules/transfer-to-account/components/historic-error/historic-error.component';
import { AffiliationProductsService } from '@modules/transfer-to-account/services/affiliation-products/affiliation-products.service';
import { FavoriteService } from '@modules/transfer-to-account/services/favorite/favorite.service';
import { HistoricService } from '@modules/transfer-to-account/services/historic/historic.service';
import { TransferToAccountRoutingModule } from '@modules/transfer-to-account/transfer-to-account-routing.module';
import { TransferToAccountContainer } from '@modules/transfer-to-account/transfer-to-account.container';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { HistoricTransferComponent } from 'app/modules/transfer-to-account/components/historic-transfer/historic-transfer.component';
import { CalendarModule } from 'primeng/calendar';
import { NicknamesService } from '../detail-product/services/nicknames/nicknames.service';
import { FastTransferModule } from '../fast-transfer/fast-transfer.module';
import { FavoriteTransfersComponent } from './components/favorite-transfers/favorite-transfers.component';
import { HomeTransferComponent } from './components/home-transfer/home-transfer.component';
import { NewTransferModule } from './components/new-transfer/new-transfer.module';
import { OldTransferModule } from './components/old-transfer/old-transfer.module';
import { PendingTransferComponent } from './components/pending-transfer/pending-transfer.component';
import { ModalDetailScheduledComponent } from './components/scheduled-transfer/modal-detail-scheduled/modal-detail-scheduled.component';
import { ScheduledTransferComponent } from './components/scheduled-transfer/scheduled-transfer.component';
import { NewTransferService } from './services/new-transfer/new-transfer.service';
import { OldTransferService } from './services/old-transfer/old-transfer.service';
import { DestinationProductsEffect } from './store/effects/destination-products.effect';
import { FavoritesEffects } from './store/effects/favorites.effects';
import { HistoricTransferEffect } from './store/effects/historic-transfer.effect';
import { NewTransferEffect } from './store/effects/new-transfer.effect';
import { TransferScheduledEffect } from './store/effects/schedule-transfer.effect';
import { OldTransferEffect } from './store/effects/transfer.effect';
import { NewTransferRootReducer } from './store/reducers';
import {
  INewTransferState,
  NewTransferName,
} from './store/state/new-transfer.state';
import { TransferModel } from './transfer.model';

export const FEATURE_REDUCER_TOKEN = new InjectionToken<
  ActionReducerMap<INewTransferState>
>('Feature NewNewTransfer');
@NgModule({
  declarations: [
    TransferToAccountContainer,
    HomeTransferComponent,
    HistoricErrorComponent,
    FavoriteTransfersComponent,
    PendingTransferComponent,
    HistoricTransferComponent,
    ScheduledTransferComponent,
    ModalDetailScheduledComponent,
  ],
  entryComponents: [ModalDetailScheduledComponent],
  imports: [
    CommonModule,
    TransferToAccountRoutingModule,
    CoreModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    BtnModule,
    LineTimeModule,
    TicketModule,
    HistoricTransactionModule,
    CurrencyModule.forRoot('es-US'),
    EffectsModule.forFeature([
      OldTransferEffect,
      DestinationProductsEffect,
      CategoriesEffect,
      BanksEffect,
      HistoricTransferEffect,
      FavoritesEffects,
      TransferScheduledEffect,
      NewTransferEffect,
    ]),
    CreateDateModule,
    AppCalendarModule,
    HistoricModule,
    DsModalModule,
    ModalModule,
    TemplateSystemModule,
    OldTransferModule,
    FastTransferModule,
    NewTransferModule,
    StoreModule.forFeature(NewTransferName, FEATURE_REDUCER_TOKEN),
  ],
  providers: [
    TransferModel,
    OldTransferService,
    AffiliationProductsService,
    CurrencyFormatPipe,
    CategoriesService,
    BanksService,
    HistoricService,
    FavoriteService,
    ModalService,
    NicknamesService,
    NewTransferService,
    {
      provide: FEATURE_REDUCER_TOKEN,
      useValue: NewTransferRootReducer,
    },
  ],
})
export class TransferToAccountModule {}
