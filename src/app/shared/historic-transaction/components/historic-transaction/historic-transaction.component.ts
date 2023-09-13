import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-historic-transaction',
  templateUrl: './historic-transaction.component.html',
  styleUrls: ['./historic-transaction.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoricTransactionComponent {
  @Input() title: string;
  @Input() columnOneName: string;
  @Input() columnTwoName: string;
  @Input() columnThreeName: string;

  @Output() clickLink: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}
}
