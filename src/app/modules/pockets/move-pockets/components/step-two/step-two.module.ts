import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { HomePocketsFacade } from '@app/modules/pockets/home-pockets/home-pockets.facade';
import { BtnModule } from '@app/shared/btn/btn.module';
import { CardChangeDataModule } from '@app/shared/card-change-data/card-change-data.module';
import { CurrencyModule } from '@app/shared/currency/currency.module';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { TicketModule } from '@app/shared/ticket/ticket.module';
import { StepTwoComponent } from './step-two.component';

@NgModule({
  declarations: [StepTwoComponent],
  imports: [
    CommonModule,
    CoreModule,
    BtnModule,
    FormsModule,
    ReactiveFormsModule,
    TemplateSystemModule,
    CardChangeDataModule,
    TicketModule,
    CurrencyModule.forRoot('es-US'),
    RouterModule.forChild([
      {
        path: '',
        component: StepTwoComponent,
      },
    ]),
  ],
  providers: [HomePocketsFacade],
})
export class StepTwoModule {}
