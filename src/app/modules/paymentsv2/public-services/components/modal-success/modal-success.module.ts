import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { BtnModule } from '@app/shared/btn/btn.module';
import { CurrencyModule } from '@app/shared/currency/currency.module';
import { DropdownModuleSelect } from '@app/shared/dropdown-select/dropdown-select.module';
import { ModalSuccessComponent } from './modal-success.component';

@NgModule({
  declarations: [ModalSuccessComponent],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModuleSelect,
    BtnModule,
    CurrencyModule.forRoot('es-US'),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  entryComponents: [ModalSuccessComponent],
  exports: [ModalSuccessComponent],
})
export class ModalSuccessModule {}
