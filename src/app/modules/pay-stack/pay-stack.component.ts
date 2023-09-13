import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { StepLineTime } from '../payment-taxes/entities/payment-taxes';
import { INavigatePayStack, NavigatePayStack } from './entities/routes';
import { PayStackModel } from './store/model/pay-stack.model';

@Component({
  selector: 'app-pay-stack',
  templateUrl: './pay-stack.component.html',
  styleUrls: ['./pay-stack.component.sass'],
})
export class PayStackComponent implements OnInit, OnDestroy {
  public numberSteps: number = 4;
  public viewBack: boolean = false;
  public viewClose: boolean = false;
  public maxStep: number = 4;
  public backUrl: string;
  constructor(
    private translate: TranslateService,
    private router: Router,
    private modalService: ModalService,
    private model: PayStackModel,
  ) {}

  get items$(): Observable<string[]> {
    return this.translate.get('LINE_TIME_PAY_STACK');
  }

  get navigate(): INavigatePayStack {
    return NavigatePayStack;
  }

  get step$(): Observable<StepLineTime> {
    return this.model.step$;
  }

  ngOnInit(): void {
    this.router.navigate([this.navigate.step1]);
    this.step$.subscribe((reponse) => {
      if (reponse.step === 1) {
        this.viewBack = false;
        this.viewClose = true;
      }
      if (reponse.step === 2) {
        this.viewBack = true;
      }
    });
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

  ngOnDestroy(): void {
    this.model.reset();
  }
}
