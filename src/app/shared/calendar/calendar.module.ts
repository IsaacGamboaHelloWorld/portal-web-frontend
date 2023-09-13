import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { CalendarModule } from 'primeng/calendar';
import { BtnModule } from '../btn/btn.module';
import { DropdownModuleSelect } from '../dropdown-select/dropdown-select.module';
import { CalendarComponent } from './calendar.component';
import { ModalCalendarComponent } from './modal/modal-calendar/modal-calendar.component';

@NgModule({
  declarations: [CalendarComponent, ModalCalendarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    CoreModule,
    DropdownModuleSelect,
    BtnModule,
  ],
  entryComponents: [ModalCalendarComponent],
  exports: [CalendarComponent],
})
export class AppCalendarModule {}
