import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ApplicationState } from '@store/state/application.state';
import {
  NotificationResetAction,
  NotificationShowAction,
} from '../../../store/actions/global/notification/notification.action';
import { IProductActive } from '../../../store/reducers/models/product-active/product-active.reducer';
import { IPocketActive } from '../home-pockets/store/reducers/active-pocket.reducer';
import { IHomePockets } from '../home-pockets/store/reducers/get-pockets.reducer';
import {
  selectActivePocket,
  selectActiveProduct,
  selectHomePockets,
} from '../home-pockets/store/selectors/home-pockets.selector';
import {
  MoveMoneyPocketsLoad,
  MoveMoneyPocketsReset,
} from './store/actions/move-money.action';
import { IMoveMoney } from './store/reducers/move-money.reducer';
import { selectMovedMoney } from './store/selectors/move-money.selector';

@Injectable()
export class MovePocketPocketsFacade {
  constructor(private store: Store<ApplicationState>) {}

  public homePockets$: Observable<IHomePockets> = this.store.pipe(
    select(selectHomePockets),
  );

  public activeProduct$: Observable<IProductActive> = this.store.pipe(
    select(selectActiveProduct),
  );

  public activePocket$: Observable<IPocketActive> = this.store.pipe(
    select(selectActivePocket),
  );

  public movedMoney$: Observable<IMoveMoney> = this.store.pipe(
    select(selectMovedMoney),
  );

  public moveToPocket(_data: any): void {
    this.store.dispatch(MoveMoneyPocketsLoad(_data));
  }

  public moveToAccount(_data: any): void {
    this.store.dispatch(MoveMoneyPocketsLoad(_data));
  }

  public clearMovements(): void {
    this.store.dispatch(MoveMoneyPocketsReset());
  }

  public notificationOpen(
    message: string = '',
    autoClosed: boolean = false,
    typeNotification: string = '',
  ): void {
    this.store.dispatch(new NotificationResetAction());
    this.store.dispatch(
      new NotificationShowAction(message, autoClosed, typeNotification),
    );
  }
}
