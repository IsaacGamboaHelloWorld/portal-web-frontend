import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@app/core/core.module';
import { TicketComponent } from './ticket.component';

@NgModule({
  declarations: [TicketComponent],
  imports: [CommonModule, CoreModule],
  exports: [TicketComponent],
})
export class TicketModule {}
