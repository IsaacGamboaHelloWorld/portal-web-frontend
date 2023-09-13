import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TributaryRoutingModule } from './tributary-routing.module';
import { TributaryComponent } from './tributary.component';

@NgModule({
  declarations: [TributaryComponent],
  imports: [CommonModule, TributaryRoutingModule],
})
export class TributaryModule {}
