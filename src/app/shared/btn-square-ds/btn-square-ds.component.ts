import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-btn-square-ds',
  templateUrl: './btn-square-ds.component.html',
  styleUrls: ['./btn-square-ds.component.sass'],
})
export class BtnSquareDsComponent {
  @Input() image: string = '';
  @Input() imageDisabled: string = '';
  @Input() classIcon: string = '';
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() url: string;
  @Output() clickBtn: EventEmitter<void> = new EventEmitter<void>();

  constructor(private _router: Router) {}

  public redirect(): void {
    if (this.disabled) {
      return;
    }
    if (this.url) {
      this._router.navigate([this.url]);
    } else {
      this.clickBtn.emit();
    }
  }
}
