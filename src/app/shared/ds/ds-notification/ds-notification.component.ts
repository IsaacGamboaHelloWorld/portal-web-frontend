import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-ds-notification',
  templateUrl: './ds-notification.component.html',
  styleUrls: ['./ds-notification.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class DsNotificationComponent implements OnInit {
  @Input() message: string;
  @Input() isOpen: boolean;
  @Input() hideClose: boolean;
  @Input() typeNotification: 'success' | 'info' | 'warning' | 'error';
  @Input() action: string;
  @Input() subMessage: string;
  @Output() closeEmit: EventEmitter<void>;

  public isComplex: boolean;

  constructor(@Inject('isMobile') public isMobile: boolean) {
    this.message = '';
    this.isOpen = false;
    this.hideClose = false;
    this.typeNotification = 'success';
    this.action = '';
    this.subMessage = '';
    this.closeEmit = new EventEmitter();

    this.isComplex = false;
  }

  ngOnInit(): void {
    this.isComplex = !!this.subMessage;
  }
}
