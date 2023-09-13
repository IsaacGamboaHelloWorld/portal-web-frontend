import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-card-change-data',
  templateUrl: './card-change-data.component.html',
  styleUrls: ['./card-change-data.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class CardChangeDataComponent implements OnInit {
  @Input() label: string;
  @Input() dataCard: object;
  @Input() options: object[] = [];
  @Input() form: FormGroup;
  @Input() property: string;
  @Input() subProperty: string;
  @Input() append: any;
  @Input() ifDefaultData: object;
  @Input() modalContact: boolean = false;
  @Input() dismissible: boolean = true;
  @Input() btn: boolean = true;
  @Output() event: EventEmitter<object> = new EventEmitter<object>();

  public visibleModal: boolean;
  public viewFull: boolean;
  public data: object = null;

  constructor() {}

  ngOnInit(): void {
    this.data = this.ifDefaultData ? this.ifDefaultData : this.dataCard;
    if (this.data) {
      this.form.controls[this.property].setValue(this.data);
    }
    this.visibleModal = this.modalContact
      ? this.modalContact
      : this.visibleModal;
  }

  public selectOption(option: object): void {
    this.data = option;
    if (!this.modalContact) {
      this.form.controls[this.property].setValue(option);
    }
    this.event.emit(option);
    this.visibleModal = false;
  }
  public emitCancel(): void {
    this.event.emit({});
    this.visibleModal = false;
  }
}
