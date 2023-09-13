import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';

import { NicknamesService } from '@app/modules/detail-product/services/nicknames/nicknames.service';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { AdvanceFacade } from '@modules/advance/advance.facade';
import {
  advanceRootRoute,
  advanceSuccess,
} from '@modules/advance/constants/routes';
import { IFormGlobal } from '@modules/advance/entities/form-global';
import { StepService } from '@modules/advance/services/step.service';
import { ITransferAdvance } from '@modules/advance/store/reducers/transfer-advance.reducer';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationComponent implements OnInit, OnDestroy {
  public date: object = new Date();
  public cost: number = 0;
  public nicknameFrom: string = '';
  public nicknameTo: string = '';

  private _destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private _facade: AdvanceFacade,
    private _router: Router,
    private _stepService: StepService,
    private dom: ManipulateDomService,
    private nickNames: NicknamesService,
  ) {}

  ngOnInit(): void {
    this.transferAdvance$
      .pipe(
        takeUntil(this._destroy$),
        filter((data) => data.loaded),
        tap((resp) => {
          this._stepService.setStep(5);
          this._router.navigate([`/${advanceRootRoute}/${advanceSuccess}`]);
        }),
      )
      .subscribe();
    this.dom.scrollTop();
    this.getNickname();
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.unsubscribe();
  }

  get formGlobal$(): Observable<IFormGlobal> {
    return this._facade.formGlobal$;
  }

  get transferAdvance$(): Observable<ITransferAdvance> {
    return this._facade.transferAdvance$;
  }

  public edit(): void {
    this._stepService.setStep(1);
    this._router.navigate([`/${advanceRootRoute}`]);
  }

  public advanceTransfer(form: IFormGlobal): void {
    if (form) {
      form.origin.nickName = this.nicknameFrom;
      form.destination.nickName = this.nicknameTo;
    }
    this._facade.fetchAdvance(form);
  }

  public getNickname(): void {
    combineLatest([this.nickNames.nicknamesAll(), this.formGlobal$]).subscribe(
      ([nick, formOne]: any) => {
        if (nick && formOne) {
          const nickname = nick.nicknames.filter(
            (e: any) =>
              e['accountId'] ===
              formOne.account_origin.accountInformation.accountIdentifier,
          );
          nickname['name'] = nickname['name']
            ? nickname['name']
            : formOne.account_origin.accountInformation.productName;
          this.nicknameFrom = nickname['name'];
          this.nicknameTo = formOne.account_destination.customerName;
        }
      },
    );
  }
}
