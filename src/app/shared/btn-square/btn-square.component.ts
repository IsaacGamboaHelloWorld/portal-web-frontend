import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-btn-square',
  templateUrl: './btn-square.component.html',
  styleUrls: ['./btn-square.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class BtnSquareComponent {
  @Input() imageUrl: string;
  @Input() title: string;
  @Input() subtitle: string;
  @Input() url: string;
  @Input() heightImg: string;
  @Input() widthImg: string;
  @Input() renderer: string;
  @Input() id: string;
  @Output() clickBtn: EventEmitter<void> = new EventEmitter<void>();

  constructor(private _router: Router) {}

  public redirect(): void {
    if (this.url) {
      this._router.navigate([this.url]);
    } else {
      this.clickBtn.emit();
    }
  }

  get isActive(): boolean {
    return !isNullOrUndefined(this.url);
  }
}
