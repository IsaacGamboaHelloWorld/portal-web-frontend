import { Location } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { createJpeg, downloadImage } from '@app/shared/helpers/download-image';
import { TIME_OTP, WITH_CARD } from '@core/constants/global';
import { WithDrawalState } from '@store/reducers/models/withdrawal/no-card/no-card.reducer';
import { WithDrawalStepTwoState } from '@store/reducers/models/withdrawal/steps/withdrawal-step-two.reducer';
import { Observable } from 'rxjs';
import { INavigateWnocother, NavigateWnocother } from '../../entities/routes';
import { WnocotherMoldel } from '../../wnocother.model';

@Component({
  selector: 'app-step-four',
  templateUrl: './step-four.component.html',
  styleUrls: ['./step-four.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepFourComponent implements OnInit, OnDestroy {
  public disabled: boolean = false;
  public cost: number = 0;
  constructor(
    private model: WnocotherMoldel,
    private location: Location,
    private cd: ChangeDetectorRef,
    private router: Router,
  ) {}

  get navigate(): INavigateWnocother {
    return NavigateWnocother;
  }
  ngOnInit(): void {
    this.model.setStepW(3);
  }

  ngOnDestroy(): void {
    this.model.setStepW(0);
    this.model.setTypeTransaction(null);
    this.model.resetWithDrawal();
    const dataToSend = {
      product: null,
      where: null,
      amount: null,
      document: '',
    };
    this.model.setDataForm(dataToSend);
  }

  get typeTransaction$(): Observable<string> {
    return this.model.typeTransaction$;
  }

  get getOtp$(): Observable<WithDrawalState> {
    return this.model.getOtp$;
  }
  get dataForm$(): Observable<WithDrawalStepTwoState> {
    return this.model.dataForm$;
  }

  public getTime(_time: number): number {
    return Math.round(_time / TIME_OTP);
  }

  get opWITHCARD(): string {
    return WITH_CARD;
  }

  doRestart(): void {
    this.model.setStepW(0);
    this.router.navigate([this.navigate.step1]);
  }

  goBack(): void {
    this.router.navigate([this.navigate.payment_type]);
  }

  public download(): void {
    this.disabled = true;
    createJpeg('voucher-withdrawals')
      .then((dataUrl) => {
        downloadImage('voucher-withdrawals.jpg', dataUrl);
        this._resetDisabled();
      })
      .catch(() => this._resetDisabled());
  }

  private _resetDisabled(): void {
    this.disabled = false;
    this.cd.detectChanges();
  }
}
