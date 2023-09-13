import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { DropdownSelectComponent } from './dropdown-select.component';

@NgModule({
  declarations: [DropdownSelectComponent],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  exports: [DropdownSelectComponent],
})
export class DropdownModuleSelect {}
