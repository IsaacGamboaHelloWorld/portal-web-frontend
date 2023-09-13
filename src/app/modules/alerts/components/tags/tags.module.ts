import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '@app/core/core.module';
import { TagsComponent } from './tags.component';

@NgModule({
  declarations: [TagsComponent],
  imports: [CommonModule, CoreModule],
  exports: [TagsComponent],
})
export class TagsModule {}
