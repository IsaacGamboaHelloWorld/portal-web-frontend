import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { isNullOrUndefined } from 'util';
import { INavigateWnocother, NavigateWnocother } from '../../entities/routes';
import { WnocotherMoldel } from '../../wnocother.model';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepOneComponent implements OnInit {
  public radioSelected: string;
  public transactionType: string;
  public textVoucher: string = '';
  public textBtnAgain: string = '';

  constructor(
    private model: WnocotherMoldel,
    private translate: TranslateService,
    private router: Router,
  ) {}

  get navigate(): INavigateWnocother {
    return NavigateWnocother;
  }

  ngOnInit(): void {
    this.model.setStepW(0);
    this.model.resetWithDrawal();
  }

  public SetTypeTransaction(): void {
    this.model.setTypeTransaction(this.transactionType);
    const dataToSend = {
      product: null,
      where: '',
      amount: null,
      textVoucher: this.textVoucher,
      textBtnAgain: this.textBtnAgain,
    };
    this.model.setDataForm(dataToSend);
    this.model.setStepW(1);
    this.router.navigate([this.navigate.step2]);
  }

  public doSelectOption(_data: string): void {
    this.textVoucher =
      _data === 'WITH_CARD'
        ? this.translate.instant('WITHDRAWAL.CONFIRM_STEP.AMMOUNT1')
        : this.translate.instant('WITHDRAWAL.CONFIRM_STEP.AMMOUNT2');
    this.textBtnAgain =
      _data === 'WITH_CARD'
        ? this.translate.instant('WITHDRAWAL.VALID_STEP.TRY_AGAIN1')
        : this.translate.instant('WITHDRAWAL.VALID_STEP.TRY_AGAIN2');
    this.transactionType = _data;
    this.SetTypeTransaction();
  }

  get hasTypeSelected(): boolean {
    return !isNullOrUndefined(this.transactionType);
  }
}
