import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-alert',
  templateUrl: './new-alert.component.html',
  styleUrls: ['./new-alert.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class NewAlertComponent implements OnInit {
  @Input() url: string;
  @Output() clickBtn: EventEmitter<void> = new EventEmitter<void>();

  constructor(private _router: Router) {}

  ngOnInit(): void {}

  public redirect(): void {
    if (this.url) {
      this._router.navigate([this.url]);
    } else {
      this.clickBtn.emit();
    }
  }
}
