import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import {
  DsStatesCardEnum,
  IDsStateCard,
} from './constants/ds-states-card.enum';

@Component({
  selector: 'app-ds-states-card',
  templateUrl: './ds-states-card.component.html',
  styleUrls: ['./ds-states-card.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class DsStatesCardComponent implements OnInit {
  @Input() state: DsStatesCardEnum = DsStatesCardEnum.success;
  @Input() btnTextPrimary: string = '';
  @Input() btnTextSecondary: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @Output() eventClick: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  get getStates(): IDsStateCard {
    return DsStatesCardEnum;
  }
}
