import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StateInputDirective } from './state-input.directive';

@NgModule({
  declarations: [StateInputDirective],
  exports: [StateInputDirective],
  imports: [CommonModule],
})
export class StateInputModule {}
