import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { StepLineTime } from './entities/payment-taxes';
import { INavigatePaymentTaxes, NavigatePaymentTaxes } from './entities/routes';
import { PaymentTaxesModel } from './store/model/payment-taxes.model';
@Component({
  selector: 'app-payment-taxes',
  templateUrl: './payment-taxes.component.html',
  styleUrls: ['./payment-taxes.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class PaymentTaxesComponent implements OnInit, OnDestroy {
  public numberSteps: number = 4;
  public viewBack: boolean = false;
  public viewClose: boolean = false;
  public maxStep: number = 4;
  public backUrl: string;

  constructor(
    private translate: TranslateService,
    private router: Router,
    private model: PaymentTaxesModel,
  ) {}

  get items$(): Observable<string[]> {
    return this.translate.get('LINE_TIME');
  }

  get navigate(): INavigatePaymentTaxes {
    return NavigatePaymentTaxes;
  }

  get step$(): Observable<StepLineTime> {
    return this.model.step$;
  }

  ngOnDestroy(): void {
    this.model.reset();
  }

  ngOnInit(): void {
    this.router.navigate([this.navigate.step1]);
    this.validateSteps();
  }

  public validateSteps(): void {
    this.step$.subscribe((response) => {
      this.viewBack = false;
      if (response.step > 1) {
        this.viewBack = true;
      }
      switch (response.step) {
        case 1:
          this.backUrl = this.navigate.payment;
          break;
        case 2:
          this.backUrl = this.navigate.step1;
          break;
        case 3:
          this.backUrl = this.navigate.step2;
          break;
        case 4:
          this.backUrl = this.navigate.step3;
          break;
        default:
          this.backUrl = this.navigate.payment;
          break;
      }
      if (response.step === this.maxStep) {
        this.backUrl = this.navigate.payment;
      }
    });
  }

  public backHome(event: boolean): void {
    if (event) {
      this.backUrl = this.navigate.payment;
    } else {
      this.validateSteps();
    }
  }
}
