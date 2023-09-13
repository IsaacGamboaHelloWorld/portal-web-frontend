import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TemplateSystemModule } from '@app/shared/template-system/template-system.module';
import { YourBalanceModule } from './components/your-balance/your-balance.module';
import { OrganizerComponent } from './organizer.component';

@NgModule({
  declarations: [OrganizerComponent],
  imports: [
    CommonModule,
    TemplateSystemModule,
    YourBalanceModule,
    RouterModule.forChild([
      {
        path: '',
        component: OrganizerComponent,
      },
    ]),
  ],
})
export class OrganizerModule {}
