import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { BtnModule } from '@app/shared/btn/btn.module';
import { TicketModule } from '@app/shared/ticket/ticket.module';
import { StepFourComponent } from './step-four.component';

@NgModule({
  declarations: [StepFourComponent],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    TicketModule,
    BtnModule,
    RouterModule.forChild([
      {
        path: '',
        component: StepFourComponent,
      },
    ]),
  ],
})
export class StepFourModule {}
