import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { RechargeModel } from '@app/modules/recharge-phone/recharge.model';
import { createJpeg, downloadImage } from '@app/shared/helpers/download-image';
import { IRecharge } from '@store/reducers/models/recharge/recharge.reducer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { IFormOneRecharge } from '../../entities/formOne';
import {
  INavigateRechargePhone,
  NavigateRechargePhone,
} from '../../entities/routes';

@Component({
  selector: 'app-recharge-success',
  templateUrl: './recharge-success.component.html',
  styleUrls: ['./recharge-success.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class RechargeSuccessComponent implements OnInit, OnDestroy {
  public disabled: boolean = false;
  public cost: number = 0;

  constructor(
    private model: RechargeModel,
    private cd: ChangeDetectorRef,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.model.setStep(3);
    this.model.resetFormOne();
  }

  ngOnDestroy(): void {
    this.newRecharge();
  }

  get infoRecharge$(): Observable<IRecharge> {
    return this.model.recharge$;
  }

  get formOne$(): Observable<IFormOneRecharge> {
    return this.model.formOne$;
  }

  get hasInfo$(): Observable<boolean> {
    return this.infoRecharge$.pipe(
      map(
        (info: IRecharge) =>
          !isNullOrUndefined(info) && !isNullOrUndefined(info.data),
      ),
    );
  }

  public newRecharge(): void {
    this.model.resetRecharge();
    this.model.setStep(1);
    this.router.navigate([this.navigate.step1]);
  }

  public download(): void {
    this.disabled = true;
    createJpeg('voucher-recharge')
      .then((dataUrl) => {
        downloadImage('voucher-recharge.jpg', dataUrl);
        this._resetDisabled();
      })
      .catch(() => this._resetDisabled());
  }

  private _resetDisabled(): void {
    this.disabled = false;
    this.cd.detectChanges();
  }
  get navigate(): INavigateRechargePhone {
    return NavigateRechargePhone;
  }
}
