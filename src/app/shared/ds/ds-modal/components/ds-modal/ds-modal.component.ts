import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-ds-modal',
  templateUrl: './ds-modal.component.html',
  styleUrls: ['./ds-modal.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class DsModalComponent implements OnInit {
  @Output() actionCancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() actionAgree: EventEmitter<void> = new EventEmitter<void>();
  @Input() title: string;
  @Input() subtitle: string;
  @Input() description: string;
  @Input() img: string;
  @Input() typeModal: 'error' | 'warning' | 'success' | 'info' | 'default';
  @Input() btnCancel: string;
  @Input() btnAgree: string;
  @Input() buttonsInColumn: boolean = false;

  public loading: boolean;
  public classBtn: string;
  public classBtnCancel: string;

  constructor() {
    this.typeModal = 'default';
    this.loading = false;
  }

  ngOnInit(): void {
    this._setupButtons();
  }

  private _setupButtons(): void {
    this.classBtn = this.hasBtnCancel ? '' : 'wd-100';
  }
  get hasTitle(): boolean {
    return !!this.title;
  }

  get hasSubtitle(): boolean {
    return !!this.subtitle;
  }

  get hasDesc(): boolean {
    return !!this.description;
  }

  get hasImg(): boolean {
    return !!this.img;
  }

  get hasBtnCancel(): boolean {
    return !!this.btnCancel;
  }

  get hasBtnAgree(): boolean {
    return !!this.btnAgree;
  }

  public emitClick(): void {
    this.loading = true;
    this.actionAgree.emit();
  }
}
