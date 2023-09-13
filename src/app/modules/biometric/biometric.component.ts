import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { WebAuthnService } from '@app/shared/web-authn/web-authn.service';
import { Observable, Subject } from 'rxjs';
import { StepLineTime } from '../payment-taxes/entities/payment-taxes';
import { PaymentTaxesModel } from '../payment-taxes/store/model/payment-taxes.model';
import { INavigateBiometric, NavigateBiometric } from './entities/routes';

@Component({
  selector: 'app-biometric',
  templateUrl: './biometric.component.html',
  styleUrls: ['./biometric.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class BiometricComponent implements OnInit, OnDestroy {
  public numberSteps: number = 3;
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  public viewBack: boolean = false;
  public viewClose: boolean = false;
  public maxStep: number = 3;
  public backUrl: string;
  constructor(
    private router: Router,
    private model: PaymentTaxesModel,
    private fingerprintService: WebAuthnService,
  ) {}

  get navigate(): INavigateBiometric {
    return NavigateBiometric;
  }

  get step$(): Observable<StepLineTime> {
    return this.model.step$;
  }

  ngOnInit(): void {
    this.fingerprintService.getInitAuthData().then((init) => {
      if (init.success) {
        this._setStep(1);
        this.router.navigate([this.navigate.home]);
      } else {
        this.router.navigate([this.navigate.info]);
      }
    });
    this.validateSteps();
  }

  public _setStep(step: number): void {
    this.model.setStep({ step });
  }

  public validateSteps(): void {
    this.step$.subscribe((response) => {
      this.viewBack = false;
      if (response.step > 1) {
        this.viewBack = true;
      }
      switch (response.step) {
        case 1:
          this.backUrl = this.navigate.security;
          break;
        case 2:
          this.backUrl = this.navigate.info;
          break;
        case 3:
          this.backUrl = this.navigate.home;
          break;
        default:
          this.backUrl = this.navigate.security;
          break;
      }
      if (response.step === this.maxStep) {
        this.backUrl = this.navigate.security;
      }
    });
  }

  public backHome(event: boolean): void {
    if (event) {
      this.backUrl = this.navigate.security;
    } else {
      this.validateSteps();
    }
  }
  ngOnDestroy(): void {
    this.model.reset();
  }
}
