import { Component, Input, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

import { SERVICE_PUBLIC } from '../../../../core/constants/global';
import { PaymentModel } from '../../payment.model';

@Component({
  selector: 'app-step-default',
  templateUrl: './step-default.component.html',
  styleUrls: ['./step-default.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class StepDefaultComponent {
  @Input() step: number;

  constructor(
    private model: PaymentModel,
    private translate: TranslateService,
  ) {}

  get paymentType(): string {
    return this.model.paymentType;
  }

  get servicepublic(): string {
    return SERVICE_PUBLIC;
  }

  get items$(): Observable<string[]> {
    return this.translate.get('LINE_TIME');
  }
}
