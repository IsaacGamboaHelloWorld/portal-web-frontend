import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TYPE_ACCOUNTS } from '../../../../../core/constants/types_account';
import {
  IHomePocketsRecord,
  IPocketToSearch,
} from '../../entities/home-pockets';
import { INavigatePockets, NavigatePockets } from '../../entities/routes';
import { HomePocketsFacade } from '../../home-pockets.facade';
import { IPocketActive } from '../../store/reducers/active-pocket.reducer';

@Component({
  selector: 'app-card-pocket',
  templateUrl: './card-pocket.component.html',
  styleUrls: ['./card-pocket.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPocketComponent implements OnInit, OnDestroy {
  @Input() parentId: string;
  @Input() pocketsList: IHomePocketsRecord[] = [];
  @Input() cardInfo: IHomePocketsRecord;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  public loading: boolean = false;
  public loadingItems: number = 1;

  constructor(
    private facade: HomePocketsFacade,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  get updateInfo$(): Observable<IHomePocketsRecord> {
    return this.facade.loadInfoPockets$;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.pocketsList.forEach((pock: IHomePocketsRecord) => {
        const obj: IPocketToSearch = {
          pocketId: pock.pocketId,
          pocketType: pock.pocketType,
          parentAccountId: this.parentId,
          parentAccountType: TYPE_ACCOUNTS.DEPOSIT_ACCOUNT,
        };
        this.facade.setUpdatePockets(obj);
      });
      this.doUpdate();
    }, 1000);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public doUpdate(): void {
    this.updateInfo$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: IHomePocketsRecord) => {
        if (data && data.pocketId) {
          this.pocketsList.forEach((e, i) => {
            if (e.pocketId === data.pocketId) {
              this.pocketsList[i] = data;
              this.loading = true;
              this.cdr.detectChanges();
            }
          });
        }
      });
  }

  public doEditPocket(cardInfo?: IHomePocketsRecord): void {
    this._setDataAndRedirect(this.navigate.edit_money, cardInfo);
  }

  public doMovePocket(cardInfo?: IHomePocketsRecord): void {
    this._setDataAndRedirect(this.navigate.move_money, cardInfo);
  }

  private _setDataAndRedirect(url: string, cardInfo: IHomePocketsRecord): void {
    const data: IPocketActive = {
      pocketId: cardInfo.pocketId,
      pocketType: cardInfo.pocketType,
      pocketName: cardInfo.pocketName,
      savingGoal: cardInfo.savingGoal,
      amountPeriodicSavings: cardInfo.amountPeriodicSavings,
      amountSaved: cardInfo.amountSaved,
      pendingAmount: cardInfo.pendingAmount,
      category: cardInfo.category,
      pocketPeriod: cardInfo.pocketPeriod,
      pocketPeriodDescription: cardInfo.pocketPeriodDescription,
      parentId: this.parentId,
      parentType: TYPE_ACCOUNTS.DEPOSIT_ACCOUNT,
      pocketList: this.pocketsList,
    };
    this.facade.setActivePocket(data);
    this.router.navigate([url]);
  }

  get navigate(): INavigatePockets {
    return NavigatePockets;
  }
}
