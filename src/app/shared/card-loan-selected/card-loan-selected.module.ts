import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarModule } from 'primeng/sidebar';
import { CardLoanSelectedComponent } from './card-loan-selected.component';

@NgModule({
  declarations: [CardLoanSelectedComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    SidebarModule,
    CoreModule,
  ],
  exports: [CardLoanSelectedComponent],
})
export class CardLoanSelectedModule {}
