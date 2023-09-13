import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';

import { RechargeModel } from '@app/modules/recharge-phone/recharge.model';
import { BtnModule } from '@app/shared/btn/btn.module';
import { CurrencyModule } from '@app/shared/currency/currency.module';
import { DsModalModule } from '@app/shared/ds/ds-modal/ds-modal.module';
import { ModalModule } from '@app/shared/modal/modal.module';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { TicketModule } from '@app/shared/ticket/ticket.module';
import { CoreModule } from '@core/core.module';
import { RechargeEffects } from '@modules/recharge-phone/effects/recharge.effects';
import { RechargePhoneRoutingModule } from '@modules/recharge-phone/recharge-phone-routing.module';
import { RechargePhoneContainer } from '@modules/recharge-phone/recharge-phone.container';
import { CellPhoneRechargeService } from '@modules/recharge-phone/services/cell-phone-recharge.service';
import { OperatorsNameService } from '@modules/recharge-phone/services/operators-name.service';
@NgModule({
  declarations: [RechargePhoneContainer],
  imports: [
    CommonModule,
    RechargePhoneRoutingModule,
    CoreModule,
    TicketModule,
    BtnModule,
    FormsModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([RechargeEffects]),
    CurrencyModule.forRoot('es-US'),
    ModalModule,
    DsModalModule,
    TemplateSystemModule,
  ],
  providers: [
    OperatorsNameService,
    CellPhoneRechargeService,
    RechargeModel,
    ModalService,
  ],
})
export class RechargePhoneModule {}
