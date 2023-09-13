import { Component, ViewEncapsulation } from '@angular/core';
import { ModalService } from '@app/shared/modal/services/modal.service';

@Component({
  selector: 'app-popup-info-blocked',
  templateUrl: './popup-info-blocked.component.html',
  styleUrls: ['./popup-info-blocked.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class PopupInfoBlockedComponent {
  public title: string;
  public subtitle: string;
  public mainContent: string;
  public secondaryContent: string;
  public buttonContent: string;
  public mustAlignCenterOnMainContent: boolean;

  constructor(private modal: ModalService) {}

  close(): void {
    this.modal.close();
  }
}
