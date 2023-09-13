import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { BtnModule } from '@app/shared/btn/btn.module';
import { TermsComponent } from './terms.component';

@NgModule({
  declarations: [TermsComponent],
  imports: [
    CommonModule,
    CoreModule,
    BtnModule,
    RouterModule.forChild([
      {
        path: '',
        component: TermsComponent,
      },
    ]),
  ],
})
export class TermsModule {}
