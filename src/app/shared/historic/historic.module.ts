import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { CalendarModule } from 'primeng/calendar';
import { BtnModule } from '../btn/btn.module';
import { CreateDateModule } from '../create-date/create-date.module';
import { ModalModule } from '../modal/modal.module';
import { ModalService } from '../modal/services/modal.service';
import { CardRegisteredPaymentComponent } from './components/cards/card-registered-payment/card-registered-payment.component';
import { DateComponentTable } from './components/date/date.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { SearchPipe } from './components/search/search.pipe';
import { TableHistoricComponent } from './components/table/table-historic.component';
import { HistoricComponent } from './historic.component';

@NgModule({
  declarations: [
    PaginatorComponent,
    DateComponentTable,
    TableHistoricComponent,
    HistoricComponent,
    SearchPipe,
    CardRegisteredPaymentComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    CreateDateModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    BtnModule,
    CalendarModule,
  ],
  providers: [ModalService],
  entryComponents: [DateComponentTable],
  exports: [HistoricComponent],
})
export class HistoricModule {}
