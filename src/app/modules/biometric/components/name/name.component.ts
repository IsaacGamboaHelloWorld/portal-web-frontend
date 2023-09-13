import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApplicationModel } from '@app/application.model';
import { ClassNotification } from '@app/core/constants/notification';
import { PaymentTaxesModel } from '@app/modules/payment-taxes/store/model/payment-taxes.model';
import { WebAuthnService } from '@app/shared/web-authn/web-authn.service';
import { TranslateService } from '@ngx-translate/core';
import { INavigateBiometric, NavigateBiometric } from '../../entities/routes';

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class NameComponent implements OnInit {
  public isLoading: boolean = false;
  public formNameCredential: FormGroup;
  public rawId: string = '';
  public name: string = '';

  constructor(
    private fingerprintService: WebAuthnService,
    private translate: TranslateService,
    private router: Router,
    private model: ApplicationModel,
    private modelStep: PaymentTaxesModel,
  ) {
    if (
      this.router.getCurrentNavigation() &&
      this.router.getCurrentNavigation()['extras']['state']
    ) {
      this.rawId = this.router.getCurrentNavigation().extras.state.rawId;
      this.name = this.router.getCurrentNavigation().extras.state.name;
    }
  }

  get navigate(): INavigateBiometric {
    return NavigateBiometric;
  }

  ngOnInit(): void {
    this._setStep(3);
    this.formNameCredential = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
    if (this.name) {
      this.formNameCredential.controls.name.setValue(this.name);
    }
  }

  public _setStep(step: number): void {
    this.modelStep.setStep({ step });
  }

  public submitName(): void {
    this.isLoading = true;
    this.fingerprintService
      .updateCredential(this.rawId, this.formNameCredential.value.name)
      .subscribe((data: object) => {
        if (data['success']) {
          this.router.navigate([this.navigate.home], {
            state: {
              result: true,
            },
          });
        } else {
          this.model.notificationOpen(
            this.translate.instant(
              'AUTH.ENROLLMENT.BIOMETRIC.MODAL_ERROR.TITLE',
            ),
            true,
            ClassNotification.ERROR,
            false,
            this.translate.instant(
              'AUTH.ENROLLMENT.BIOMETRIC.MODAL_ERROR.DESC',
            ),
          );
          this.router.navigate([this.navigate.security]);
        }
        this.isLoading = false;
      });
  }
}
