import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ClassNotification } from '@app/core/constants/notification';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { StepPaymentPseEnum } from '../../constants/step-payment-pse.enum';
import { ISetFormThree } from '../../entities/step-form-three.interface';
import { NavigatePaymentFD } from '../../navigate/routes';
import { PaymentFreeDestinationModel } from '../../store/models/payment-free-destination.model';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class StepThreeComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public formattedAmount: any = '';
  constructor(
    private model: PaymentFreeDestinationModel,
    private router: Router,
    private translate: TranslateService,
    private cd: ChangeDetectorRef,
    private dom: ManipulateDomService,
  ) {}

  ngOnInit(): void {
    this.dom.scrollContentTop();
    this._createForm();
    this._setStep(StepPaymentPseEnum.step_3);
    setTimeout(() => {
      this._showToastValidate();
      this.cd.markForCheck();
    }, 10);
  }

  ngOnDestroy(): void {
    this.model.notificationClosed();
  }

  public next(): void {
    const amountText = this.amountTextAlias.value;
    const formThree: ISetFormThree = {
      amountText,
    };
    this.model.setFormThree(formThree);
    this._setStep(StepPaymentPseEnum.step_confirmation);
    this.router.navigate([NavigatePaymentFD.step_confirmation]);
  }

  private _setStep(step: number): void {
    this.model.setStep(step);
  }

  private _showToastValidate(): void {
    const message = this.translate.instant(
      'PAYMENTSV2.FINANCIAL_OP.SECTIONS.PAYMENT_PSE.STEP_3.VALIDATE_VALUE',
    );
    this.model.notificationOpen(message, false, ClassNotification.INFO, false);
  }

  private _createForm(): void {
    this.form = new FormGroup({
      amountText: new FormControl('', Validators.required),
    });
  }

  get formThree$(): Observable<ISetFormThree> {
    return this.model.formThree$;
  }

  get amountTextAlias(): AbstractControl {
    return this.form.get('amountText');
  }
}
