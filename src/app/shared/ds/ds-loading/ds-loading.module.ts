import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DsLoadingComponent } from './ds-loading.component';

@NgModule({
  declarations: [DsLoadingComponent],
  imports: [CommonModule],
  exports: [DsLoadingComponent],
})
export class DsLoadingModule {}
