import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-modal-success',
  templateUrl: './modal-success.component.html',
  styleUrls: ['./modal-success.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalSuccessComponent implements OnInit {
  @Output() actionCancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() actionAgree: EventEmitter<void> = new EventEmitter<void>();
  @Input() title: string;
  @Input() desc: string;
  @Input() img: string;
  @Input() btnCancel: string;
  @Input() btnAgree: string;
  @Input() isError: boolean;

  public loading: boolean = false;
  public classBtn: string;
  public classBtnCancel: string;

  constructor() {
    this.isError = false;
  }

  ngOnInit(): void {
    setTimeout(() => this._updateButtons(), 10);
  }

  private _updateButtons(): void {
    this.classBtn = this.hasBtnCancel
      ? 'btn btn-primary'
      : 'btn btn-primary btn-if';
    this.classBtnCancel =
      this.btnCancel === 'CODE_AUTH.MODAL_ALERT.CANCEL'
        ? 'btn btn-gray btn-if-green'
        : 'btn btn-gray';
  }

  get hasTitle(): boolean {
    return !isNullOrUndefined(this.title);
  }

  get hasDesc(): boolean {
    return !isNullOrUndefined(this.desc);
  }

  get hasImg(): boolean {
    return !isNullOrUndefined(this.img);
  }

  get hasBtnCancel(): boolean {
    return !isNullOrUndefined(this.btnCancel);
  }

  get hasBtnAgree(): boolean {
    return !isNullOrUndefined(this.btnAgree);
  }

  public emitClick(): void {
    this.loading = true;
    this.actionAgree.emit();
  }
}
