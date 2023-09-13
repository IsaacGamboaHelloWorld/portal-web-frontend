import { Component, ViewEncapsulation } from '@angular/core';

import { INavigate, Navigate } from '@core/constants/navigate';
import { PaymentModel } from '@modules/payments/payment.model';

@Component({
  selector: 'app-step-alert',
  templateUrl: './step-alert.component.html',
  styleUrls: ['./step-alert.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class StepAlertComponent {
  constructor(private model: PaymentModel) {}

  get navigate(): INavigate {
    return Navigate;
  }

  public play(): void {
    this.model.previousStep$
      .subscribe((data) => {
        this.model.setStep(data);
      })
      .unsubscribe();
  }

  public closed(): void {
    this.model.resetFormOne();
    this.model.resetFormTwo();
    this.model.setStep(1);
  }
}
