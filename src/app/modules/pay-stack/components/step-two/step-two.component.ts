import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IPayStackFormOne } from '../../entities/pay-stack';
import { INavigatePayStack, NavigatePayStack } from '../../entities/routes';
import { PayStackModel } from '../../store/model/pay-stack.model';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepTwoComponent implements OnInit {
  constructor(private model: PayStackModel, private router: Router) {}

  get navigate(): INavigatePayStack {
    return NavigatePayStack;
  }

  get infoPaystack(): Observable<IPayStackFormOne> {
    return this.model.stepOne$;
  }

  public _setStep(step: number): void {
    this.model.setStep({ step });
  }

  ngOnInit(): void {
    this._setStep(2);
  }

  submitData(): void {
    this._setStep(3);
    this.router.navigate([this.navigate.step3]);
  }
}
