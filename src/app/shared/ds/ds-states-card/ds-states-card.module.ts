import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@app/core/core.module';
import { BtnModule } from '@app/shared/btn/btn.module';
import { DsLoadingModule } from '@app/shared/ds/ds-loading/ds-loading.module';
import { DsStatesCardComponent } from './ds-states-card.component';

@NgModule({
  declarations: [DsStatesCardComponent],
  imports: [CommonModule, CoreModule, BtnModule, DsLoadingModule],
  exports: [DsStatesCardComponent],
})
export class DsStatesCardModule {}
