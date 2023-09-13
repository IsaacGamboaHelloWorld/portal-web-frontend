import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Navigate } from '@app/core/constants/navigate';
import {
  INavigatePockets,
  NavigatePockets,
} from '@app/modules/pockets/home-pockets/entities/routes';
import { createJpeg, downloadImage } from '@app/shared/helpers/download-image';
import { IProductActive } from '@app/store/reducers/models/product-active/product-active.reducer';
import { Observable, Subject } from 'rxjs';
import { MovePocketPocketsFacade } from '../../move-pockets.facade';
import { HomePocketsFacade } from './../../../home-pockets/home-pockets.facade';
import { IPocketActive } from './../../../home-pockets/store/reducers/active-pocket.reducer';
import { IMoveMoney } from './../../store/reducers/move-money.reducer';

@Component({
  selector: 'app-step-two',
  templateUrl: './step-two.component.html',
  styleUrls: ['./step-two.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class StepTwoComponent implements OnInit, OnDestroy {
  public disabled: boolean = false;
  public amount: string;
  public nameTo: string;
  public typeActive: string;
  private destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private modelHome: HomePocketsFacade,
    private router: Router,
    private modelMove: MovePocketPocketsFacade,
    private routeAct: ActivatedRoute,
    private _facade: MovePocketPocketsFacade,
  ) {}

  get activeProduct$(): Observable<IProductActive> {
    return this.modelHome.activeProduct$;
  }
  get activePocket$(): Observable<IPocketActive> {
    return this._facade.activePocket$;
  }
  get moveMoneyPocket$(): Observable<IMoveMoney> {
    return this.modelMove.movedMoney$;
  }

  get navigate(): INavigatePockets {
    return NavigatePockets;
  }

  ngOnInit(): void {
    if (this.routeAct && this.routeAct.queryParams) {
      this.routeAct.queryParams.subscribe((params) => {
        this.amount = params.amount;
        this.nameTo = params.pocketToName;
        this.typeActive = params.typeActive;
      });
    }
  }

  public download(): void {
    this.disabled = true;
    createJpeg('move-pocket')
      .then((dataUrl) => {
        downloadImage('move-pocket.jpg', dataUrl);
        this._resetDisabled();
      })
      .catch(() => this._resetDisabled());
  }

  private _resetDisabled(): void {
    this.disabled = false;
  }

  public end(): void {
    this.modelMove.clearMovements();
    this.router.navigate([Navigate.pockets]);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
    this.modelMove.clearMovements();
  }
}
