import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  NotificationResetAction,
  NotificationShowAction,
} from '../../../store/actions/global/notification/notification.action';
import { ApplicationState } from '../../../store/state/application.state';
import { IPocketActive } from '../home-pockets/store/reducers/active-pocket.reducer';
import { IHomePockets } from '../home-pockets/store/reducers/get-pockets.reducer';
import {
  selectActivePocket,
  selectHomePockets,
} from '../home-pockets/store/selectors/home-pockets.selector';
import {
  ICategoriesEPocket,
  IDeletePocketRequest,
  IEditPocketRequest,
} from './entities/edit-pocket';
import { CategoriesEPocketLoad } from './store/actions/categories.action';
import {
  DeletePocketLoad,
  DeletePocketReset,
} from './store/actions/delete-pocket.action';
import {
  EditPocketLoad,
  EditPocketReset,
} from './store/actions/edit-pocket.action';
import { IDeletePocket } from './store/reducers/delete-pocket.reducer';
import { IEditPocket } from './store/reducers/edit-pocket.reducer';
import {
  selectCategories,
  selectDeletedPocket,
  selectEditedPocket,
} from './store/selectors/edit-pocket.selector';

@Injectable()
export class EditPocketFacade {
  constructor(private store: Store<ApplicationState>) {}

  public homePockets$: Observable<IHomePockets> = this.store.pipe(
    select(selectHomePockets),
  );

  public activePocket$: Observable<IPocketActive> = this.store.pipe(
    select(selectActivePocket),
  );

  public deletePocket$: Observable<IDeletePocket> = this.store.pipe(
    select(selectDeletedPocket),
  );

  public editPocket$: Observable<IEditPocket> = this.store.pipe(
    select(selectEditedPocket),
  );

  public categories$: Observable<ICategoriesEPocket> = this.store.pipe(
    select(selectCategories),
  );

  public clearDelete(): void {
    this.store.dispatch(DeletePocketReset());
  }

  public clearEdit(): void {
    this.store.dispatch(EditPocketReset());
  }

  public editPocket(_data: IEditPocketRequest): void {
    this.store.dispatch(EditPocketLoad(_data));
  }

  public deletePocket(_data: IDeletePocketRequest): void {
    this.store.dispatch(DeletePocketLoad(_data));
  }

  public getCategories(): void {
    this.store.dispatch(CategoriesEPocketLoad());
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
