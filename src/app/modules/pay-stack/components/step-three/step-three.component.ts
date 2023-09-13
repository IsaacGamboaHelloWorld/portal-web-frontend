import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { TODAY } from '@app/modules/transfer-to-account/constants/calendar';
import { INavigatePayStack, NavigatePayStack } from '../../entities/routes';
import { PayStackModel } from '../../store/model/pay-stack.model';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepThreeComponent implements OnInit {
  public today: object = new Date();
  public typeActive: string = '';
  public formStepThree: FormGroup;
  public optionOne: string = TODAY;
  public valueDate: object;
  public viewCalendar: boolean = false;
  constructor(
    private model: PayStackModel,
    private router: Router,
    private dom: ManipulateDomService,
  ) {}

  get navigate(): INavigatePayStack {
    return NavigatePayStack;
  }

  public _setStep(step: number): void {
    this.model.setStep({ step });
  }

  ngOnInit(): void {
    this._setStep(3);
    this._initForm();
    this.setClass('0');
    this.formStepThree.controls.today.setValue(this.today);
    this.valueDate = this.formStepThree.value.today;
  }

  private _initForm(): void {
    this.formStepThree = new FormGroup({
      today: new FormControl(''),
      radio: new FormControl('0'),
      date: new FormControl(''),
    });
  }

  public selectedOption(nameScheduled: string): void {
    this.typeActive = nameScheduled;
  }

  public setClass(_id: string): void {
    this.dom.removeMultipleClass('.form-radiobutton-contanier', 'active');
    this.dom.addClass('.type-pocket-' + _id, 'active');
  }

  public validFormThree(): void {
    const valueRadio = this.formStepThree.value.radio;
    switch (valueRadio) {
      case '0':
        this.valueDate = this.formStepThree.value.today;
        break;
      case '1':
        this.valueDate = new Date(
          this.formarDate(this.formStepThree.value.date),
        );
        break;
    }
    if (this.valueDate) {
      this.viewCalendar = true;
    }
  }
  public submitFormThree(): void {
    this.model.setDate({ date: this.formStepThree.value.today });
    this._setStep(4);
    this.router.navigate([this.navigate.step4]);
  }

  public formarDate(value: string): string {
    const day = value.split('/')[0];
    const month = value.split('/')[1];
    const year = value.split('/')[2];
    return `${year}/${month}/${day}`;
  }
}
