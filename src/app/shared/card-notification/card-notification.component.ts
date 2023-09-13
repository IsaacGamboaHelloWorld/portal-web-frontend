import { Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-card-notification',
  templateUrl: './card-notification.component.html',
  styleUrls: ['./card-notification.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class CardNotificationComponent {
  @Input() message: string = '';
  @Input() subMessage: string = '';
  @Input() backgroundWhite: boolean = false;
  @Input() typeNotification: 'success' | 'info' | 'warning' | 'error' = 'info';

  constructor() {}
}
