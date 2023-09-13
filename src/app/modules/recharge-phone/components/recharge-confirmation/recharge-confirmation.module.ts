import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { BtnModule } from '@app/shared/btn/btn.module';
import { CurrencyModule } from '@app/shared/currency/currency.module';
import { DsModalModule } from '@app/shared/ds/ds-modal/ds-modal.module';
import { ModalModule } from '@app/shared/modal/modal.module';
import { TicketModule } from '@app/shared/ticket/ticket.module';
import { EffectsModule } from '@ngrx/effects';
import { TranslateModule } from '@ngx-translate/core';
import { RechargeEffects } from '../../effects/recharge.effects';
import { RechargeConfirmationComponent } from './recharge-confirmation.component';

@NgModule({
  declarations: [RechargeConfirmationComponent],
  imports: [
    CommonModule,
    TranslateModule,
    TicketModule,
    BtnModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([RechargeEffects]),
    CurrencyModule.forRoot('es-US'),
    ModalModule,
    DsModalModule,
    CoreModule,
    RouterModule.forChild([
      {
        path: '',
        component: RechargeConfirmationComponent,
      },
    ]),
  ],
})
export class RechargeConfirmationModule {}
