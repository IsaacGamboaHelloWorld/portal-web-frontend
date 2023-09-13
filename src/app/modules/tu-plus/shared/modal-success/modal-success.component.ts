import { HttpUrlEncodingCodec } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { SecurityService } from '@app/modules/security/services/security.service';
import { environment } from '@environment';

@Component({
  selector: 'app-modal-success',
  templateUrl: './modal-success.component.html',
  styleUrls: ['./modal-success.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalSuccessComponent implements OnInit {
  @Output() actionCancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() actionAgree: EventEmitter<void> = new EventEmitter<void>();

  img: string;

  constructor(
    private _urlEncode: HttpUrlEncodingCodec,
    private _securityService: SecurityService,
  ) {
    this.img = '/essential-warning-6@3x.png';
  }

  ngOnInit(): void {}

  public redirect(): void {
    const url = `${environment.url_redirect_tuplus}`;
    window.open(url, '_blank');
    this.actionAgree.emit();
  }
}
