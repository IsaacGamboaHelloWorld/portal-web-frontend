import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { ModalService } from 'app/shared/modal/services/modal.service';

@Component({
  selector: 'app-notification-timeout',
  templateUrl: './notification-timeout.component.html',
  styleUrls: ['./notification-timeout.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationTimeoutComponent {
  constructor(private modalService: ModalService) {}

  public closeModal(): void {
    this._closeNotification();
  }
  private _closeNotification(): void {
    this.modalService.close();
  }
}
