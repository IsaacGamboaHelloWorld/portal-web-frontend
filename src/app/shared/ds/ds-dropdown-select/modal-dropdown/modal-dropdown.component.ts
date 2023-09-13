import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-modal-dropdown',
  templateUrl: './modal-dropdown.component.html',
  styleUrls: ['./modal-dropdown.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalDropdownComponent implements OnInit {
  @Output() actionCancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() actionAgree: EventEmitter<object> = new EventEmitter<object>();
  @Input() options: object[] = [];
  @Input() index: number;

  public viewFull: boolean = false;
  constructor() {}

  ngOnInit(): void {}

  public selectOption(option: object, ind: number): void {
    option['ind'] = ind;
    this.actionAgree.emit(option);
  }
  public emitCancel(): void {
    this.actionCancel.emit();
  }
}
