import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ROOT_ROUTES } from './app.routing';

@NgModule({
  imports: [RouterModule.forRoot(ROOT_ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
