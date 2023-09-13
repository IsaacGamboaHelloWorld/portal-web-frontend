import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { OperatorsLoad } from '@app/store/actions/models/recharge/operators-name-action';
import { IProductActive } from '@app/store/reducers/models/product-active/product-active.reducer';
import { Product } from '@core/models/products/product';
import { IFormGlobal } from '@modules/advance/entities/form-global';
import * as advance from '@modules/advance/store/actions/advance.action';
import { ITransferAdvance } from '@modules/advance/store/reducers/transfer-advance.reducer';
import {
  selectFormGlobal,
  selectProducts,
  selectTransferAdvance,
} from '@modules/advance/store/selectors/advance.selector';
import {
  NotificationResetAction,
  NotificationShowAction,
} from '@store/actions/global/notification/notification.action';
import { ApplicationState } from '@store/state/application.state';

@Injectable()
export class AdvanceFacade {
  constructor(private store: Store<ApplicationState>) {}

  public formGlobal$: Observable<IFormGlobal> = this.store.pipe(
    select(selectFormGlobal),
  );

  public transferAdvance$: Observable<ITransferAdvance> = this.store.pipe(
    select(selectTransferAdvance),
  );

  public products$: Observable<Product[]> = this.store.pipe(
    select(selectProducts),
  );

  public productActive$: Observable<IProductActive> = this.store.pipe(
    select((store) => store.models.productActive),
  );

  public setToWho(origin: Product, destination: Product): void {
    this.store.dispatch(advance.setAdvanceToWho(origin, destination));
  }
  public loadOperators(): void {
    this.store.dispatch(OperatorsLoad());
  }

  public setHowMuch(
    amount: number,
    description: string = '',
    month: string,
    year: string,
    fees: number,
  ): void {
    this.store.dispatch(
      advance.setAdvanceHowMuch(amount, description, fees, year, month),
    );
  }
  public setWhen(date: any): void {
    this.store.dispatch(advance.setAdvanceWhen(date));
  }

  public setFormReset(): void {
    this.store.dispatch(advance.setAdvanceReset());
  }

  public fetchAdvance(formGlobal: IFormGlobal): void {
    this.store.dispatch(advance.fetchAdvanceLoad(formGlobal));
  }

  public advanceReset(): void {
    this.store.dispatch(advance.fetchAdvanceReset());
  }

  public notificationOpen(
    message: string = '',
    autoClosed: boolean = false,
    typeNotification: string = '',
    hideClose: boolean = false,
    subMessage: string = '',
  ): void {
    this.store.dispatch(new NotificationResetAction());
    this.store.dispatch(
      new NotificationShowAction(
        message,
        autoClosed,
        typeNotification,
        hideClose,
        subMessage,
      ),
    );
  }
}
