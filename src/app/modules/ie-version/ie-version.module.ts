import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@core/core.module';
import { IeVersionRoutingModule } from './ie-version-routing.module';
import { IeVersionComponent } from './ie-version.component';

@NgModule({
  declarations: [IeVersionComponent],
  imports: [CommonModule, IeVersionRoutingModule, CoreModule],
})
export class IeVersionModule {}
