import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BtnModule } from '@app/shared/btn/btn.module';
import { CurrencyModule } from '@app/shared/currency/currency.module';
import { DropdownModuleSelect } from '@app/shared/dropdown-select/dropdown-select.module';
import { TranslateModule } from '@ngx-translate/core';
import { RecurringPopupComponent } from './recurring-popup.component';

@NgModule({
  declarations: [RecurringPopupComponent],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    ReactiveFormsModule,
    DropdownModuleSelect,
    BtnModule,
    CurrencyModule.forRoot('es-US'),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  entryComponents: [RecurringPopupComponent],
  exports: [RecurringPopupComponent],
})
export class RecurringPopupModule {}
