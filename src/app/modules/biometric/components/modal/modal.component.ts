import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationModel } from '@app/application.model';
import { ClassNotification } from '@app/core/constants/notification';
import { DialogConfig } from '@app/shared/modal/services/dialog-config';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { WebAuthnService } from '@app/shared/web-authn/web-authn.service';
import { TranslateService } from '@ngx-translate/core';
import { INavigateBiometric, NavigateBiometric } from '../../entities/routes';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit {
  public viewOptions: boolean = false;
  public viewSuccess: boolean = false;
  public viewCancel: boolean = false;
  public viewQuestion: boolean = false;
  public viewValid: boolean = false;
  public rawId: string = '';
  public loading: boolean = false;
  @Output() actionCancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() actionAgree: EventEmitter<any> = new EventEmitter<any>();
  constructor(
    private translate: TranslateService,
    private modalService: ModalService,
    private dialogConfig: DialogConfig,
    private fingerprintService: WebAuthnService,
    private model: ApplicationModel,
    private router: Router,
  ) {}

  get navigate(): INavigateBiometric {
    return NavigateBiometric;
  }

  ngOnInit(): void {
    if (this.dialogConfig.data && this.dialogConfig.data['viewQuestion']) {
      this.viewQuestion = this.dialogConfig.data['viewQuestion'];
    } else if (this.dialogConfig.data && this.dialogConfig.data['viewValid']) {
      this.viewValid = this.dialogConfig.data['viewValid'];
    } else {
      this.viewOptions = true;
    }
  }

  public close(): void {
    this.actionCancel.emit();
    this.modalService.close();
  }
  public edit(): void {
    this.modalService.close();
    this.router.navigate([this.navigate.name], {
      state: {
        rawId: this.dialogConfig['data']['id'],
        name: this.dialogConfig['data']['name'],
      },
    });
  }

  public cancel(): void {
    this.viewCancel = true;
    this.viewOptions = false;
    if (this.dialogConfig && this.dialogConfig['data']) {
      this.rawId = this.dialogConfig['data']['id'];
    }
  }

  public delete(): void {
    this.fingerprintService
      .deleteCredential(this.rawId)
      .subscribe((del: any) => {
        this.modalService.close();
        this.actionAgree.emit({ reload: true });
        if (del['success']) {
          this.model.notificationOpen(
            this.translate.instant(
              'AUTH.ENROLLMENT.BIOMETRIC.MODAL.TITLE_SUCCES',
            ),
            true,
            ClassNotification.SUCCESS,
            true,
            this.translate.instant(
              'AUTH.ENROLLMENT.BIOMETRIC.MODAL.DESC_SUCCES',
            ),
          );
        } else {
          this.model.notificationOpen(
            this.translate.instant(
              'AUTH.ENROLLMENT.BIOMETRIC.MODAL_ERROR.TITLE',
            ),
            true,
            ClassNotification.ERROR,
            true,
            this.translate.instant(
              'AUTH.ENROLLMENT.BIOMETRIC.MODAL_ERROR.DESC',
            ),
          );
          this.router.navigate([this.navigate.security]);
        }
      });
  }

  public validQuestion(): void {
    this.actionAgree.emit({ valid: true });
  }
  public valid(): void {
    this.actionAgree.emit();
  }
}
