import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { BtnModule } from '@app/shared/btn/btn.module';
import { CardChangeDataModule } from '@app/shared/card-change-data/card-change-data.module';
import { CurrencyModule } from '@app/shared/currency/currency.module';
import { DsDropdownSelectModule } from '@app/shared/ds/ds-dropdown-select/ds-dropdown-select.module';
import { DsInputModule } from '@app/shared/ds/ds-input/ds-input.module';
import { DsLoadingModule } from '@app/shared/ds/ds-loading/ds-loading.module';
import { StateInputModule } from '@app/shared/state-input/state-input.module';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';

import { NewTransferComponent } from './new-transfer.component';

@NgModule({
  declarations: [NewTransferComponent],
  imports: [
    CommonModule,
    CoreModule,
    TemplateSystemModule,
    CardChangeDataModule,
    FormsModule,
    ReactiveFormsModule,
    BtnModule,
    StateInputModule,
    DsInputModule,
    DsDropdownSelectModule,
    DsLoadingModule,
    CurrencyModule.forRoot('es-US'),
  ],
  exports: [NewTransferComponent],
})
export class NewTransferModule {}
