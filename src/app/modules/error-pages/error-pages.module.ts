import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BtnModule } from '@app/shared/btn/btn.module';
import { CoreModule } from '@core/core.module';
import { ErrorPagesRoutingModule } from './error-pages-routing.module';
import { ErrorPagesComponent } from './error-pages.component';

@NgModule({
  declarations: [ErrorPagesComponent],
  imports: [CommonModule, CoreModule, BtnModule, ErrorPagesRoutingModule],
})
export class ErrorPagesModule {}
