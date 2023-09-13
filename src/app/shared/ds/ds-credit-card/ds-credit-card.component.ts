import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-ds-credit-card',
  templateUrl: './ds-credit-card.component.html',
  styleUrls: ['./ds-credit-card.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class DsCreditCardComponent implements OnInit {
  @Input() loading: boolean;
  @Input() name: string;
  @Input() className: string;
  @Input() number: number;
  @Input() thruText: string;
  @Input() symbols: string;
  @Input() logo: string;
  @Input() isClassic: boolean;
  @Input() cardId: number = 0;

  @Input() isSelected: boolean = false;

  @Input() actionText: string;
  @Input() actionImage: string;

  @Output() actionEvent: EventEmitter<void>;

  isDebitCard: boolean = false;

  constructor() {
    this.loading = false;
    this.name = '';
    this.thruText = '';
    this.symbols = '';
    this.logo = '';
    this.isClassic = false;

    this.actionText = '';
    this.actionImage = '';

    this.actionEvent = new EventEmitter<void>();
  }

  ngOnInit(): void {}

  actionClick(): void {
    this.actionEvent.emit();
  }
}
