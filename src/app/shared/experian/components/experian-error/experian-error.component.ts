import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-experian-error',
  templateUrl: './experian-error.component.html',
  styleUrls: ['./experian-error.component.sass'],
})
export class ExperianErrorComponent {
  @Output() submitAction: EventEmitter<any> = new EventEmitter();

  constructor() {}

  experianFlowFailed(): void {
    this.submitAction.emit('Error');
  }
}
