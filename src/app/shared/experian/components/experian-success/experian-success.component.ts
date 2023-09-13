import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'app-experian-success',
  templateUrl: './experian-success.component.html',
  styleUrls: ['./experian-success.component.sass'],
})
export class ExperianSuccessComponent {
  @Output() submitAction: EventEmitter<any> = new EventEmitter();

  @Input() loading: boolean;

  constructor() {}

  experianFlowSuccess(): void {
    this.submitAction.emit('Success');
  }
}
