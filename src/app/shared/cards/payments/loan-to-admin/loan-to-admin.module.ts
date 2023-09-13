import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../../../../core/core.module';
import { LoanToAdminComponent } from './loan-to-admin.component';

@NgModule({
  declarations: [LoanToAdminComponent],
  imports: [CommonModule, CoreModule],
  exports: [LoanToAdminComponent],
})
export class LoanToAdminModule {}
