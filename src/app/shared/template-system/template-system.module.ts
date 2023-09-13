import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../../core/core.module';
import { LineTimeModule } from '../line-time/line-time.module';
import { TemplateSystemContainer } from './template-system.container';

@NgModule({
  declarations: [TemplateSystemContainer],
  imports: [CommonModule, CoreModule, LineTimeModule],
  exports: [TemplateSystemContainer],
})
export class TemplateSystemModule {}
