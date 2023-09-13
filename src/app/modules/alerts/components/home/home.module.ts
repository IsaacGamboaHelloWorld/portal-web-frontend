import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreModule } from '@app/core/core.module';
import { AlertModule } from '@app/shared/cards/alerts/alert/alert.module';
import { NewAlertModule } from '@app/shared/cards/alerts/new-alert/new-alert.module';
import { ListModule } from '../list/list.module';
import { SearchModule } from '../search/search.module';
import { TagsModule } from '../tags/tags.module';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    CoreModule,
    AlertModule,
    NewAlertModule,
    ListModule,
    TagsModule,
    SearchModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
  ],
})
export class HomeModule {}
