import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarModule } from 'primeng/sidebar';
import { CardServiceSelectedComponent } from './card-service-selected.component';

@NgModule({
  declarations: [CardServiceSelectedComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    SidebarModule,
    CoreModule,
  ],
  exports: [CardServiceSelectedComponent],
})
export class CardServiceSelectedModule {}
