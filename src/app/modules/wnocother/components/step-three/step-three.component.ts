import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { WnocotherMoldel } from '@app/modules/wnocother/wnocother.model';
import { WithDrawalState } from '@store/reducers/models/withdrawal/no-card/no-card.reducer';
import { WithDrawalStepTwoState } from '@store/reducers/models/withdrawal/steps/withdrawal-step-two.reducer';
import { combineLatest, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { WITH_CARD } from '../../../../core/constants/global';
import { INavigateWnocother, NavigateWnocother } from '../../entities/routes';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepThreeComponent implements OnInit {
  public dataToSend: WithDrawalStepTwoState;
  public typeTemporal: string;
  public cost: number = 0;
  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private model: WnocotherMoldel, private router: Router) {}
  get navigate(): INavigateWnocother {
    return NavigateWnocother;
  }
  ngOnInit(): void {
    this.model.setStepW(2);
  }

  doEdit(): void {
    this.model.setStepW(1);
    this.router.navigate([this.navigate.step1]);
  }

  submitData(): void {
    combineLatest([this.model.dataForm$, this.model.typeTransaction$])
      .subscribe(([data, type]) => {
        this.dataToSend = data;
        const product = {
          accountType: this.dataToSend.product['accountInformation']
            .productType,
          accountId: this.dataToSend.product['accountInformation']
            .accountIdentifier,
        };
        this.typeTemporal = type;

        this.model.sendWithDrawal(
          this.typeTemporal,
          product,
          this.dataToSend.where,
          this.dataToSend.amount,
          this.dataToSend.document,
        );
      })
      .unsubscribe();

    this.getOtp$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: WithDrawalState) => {
        if (!isNullOrUndefined(data.data) && data.data.success) {
          this.model.setStepW(3);
          this.router.navigate([this.navigate.step4]);
        }
      });
  }

  get dataForm$(): Observable<WithDrawalStepTwoState> {
    return this.model.dataForm$;
  }

  get typeTransaction$(): Observable<string> {
    return this.model.typeTransaction$;
  }

  get opWITHCARD(): string {
    return WITH_CARD;
  }

  get getOtp$(): Observable<WithDrawalState> {
    return this.model.getOtp$;
  }
}
