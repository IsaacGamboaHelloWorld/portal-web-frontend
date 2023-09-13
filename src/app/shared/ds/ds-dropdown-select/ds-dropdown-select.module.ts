import { CommonModule } from '@angular/common';
import {
  CUSTOM_ELEMENTS_SCHEMA,
  NgModule,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { DsDropdownSelectComponent } from './ds-dropdown-select.component';
import { ModalDropdownComponent } from './modal-dropdown/modal-dropdown.component';

@NgModule({
  declarations: [DsDropdownSelectComponent, ModalDropdownComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CoreModule],
  schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ModalDropdownComponent],
  providers: [ModalService],
  exports: [DsDropdownSelectComponent],
})
export class DsDropdownSelectModule {}
