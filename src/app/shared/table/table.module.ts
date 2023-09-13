import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@core/core.module';
import { CalendarModule } from 'primeng/calendar';
import { CreateDateModule } from '../create-date/create-date.module';
import { CurrencyModule } from '../currency/currency.module';
import { ModalModule } from '../modal/modal.module';
import { HistoricMovementsRowComponent } from './components/historic-movements-row/historic-movements-row.component';
import { PaymentHistoryRowComponent } from './components/payment-history-row/payment-history-row.component';
import { FilterDateModule } from './shared/filterDate/filterDate.module';
import { TableComponent } from './table.component';

@NgModule({
  declarations: [
    TableComponent,
    PaymentHistoryRowComponent,
    HistoricMovementsRowComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    CurrencyModule.forRoot('es-US'),
    FormsModule,
    ReactiveFormsModule,
    CreateDateModule,
    CalendarModule,
    ModalModule,
    FilterDateModule,
  ],
  exports: [
    TableComponent,
    PaymentHistoryRowComponent,
    HistoricMovementsRowComponent,
  ],
})
export class TableModule {}
