import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarModule } from 'primeng/sidebar';
import { CardChangeDataComponent } from './card-change-data.component';

@NgModule({
  declarations: [CardChangeDataComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    SidebarModule,
    CoreModule,
  ],
  exports: [CardChangeDataComponent],
})
export class CardChangeDataModule {}
