import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@app/core/core.module';
import { BtnModule } from '@app/shared/btn/btn.module';
import { TicketModule } from '@app/shared/ticket/ticket.module';

import { StepSevenRoutingModule } from './step-seven-routing.module';
import { StepSevenComponent } from './step-seven.component';

@NgModule({
  declarations: [StepSevenComponent],
  imports: [
    CommonModule,
    StepSevenRoutingModule,
    CoreModule,
    TicketModule,
    BtnModule,
  ],
})
export class StepSevenModule {}
