import { Injectable } from '@angular/core';
import { ApplicationModel } from '@app/application.model';
import { UserPocketsState } from '@app/store/reducers/models/pockets/user-pockets.reducer';
import { select } from '@ngrx/store';
import {
  MovementResetFilterAction,
  MovementSaveFilterAction,
} from '@store/actions/models/movements/filterMovement.action';
import {
  MovementResetDataAction,
  MovementSaveDataAction,
} from '@store/actions/models/movements/infoProductMovement.action';
import {
  MovementLoadAction,
  MovementResetAction,
} from '@store/actions/models/movements/movement.action';
import { SetSProductActive } from '@store/actions/models/product-active/product-active.action';
import { MovementFilterState } from '@store/reducers/models/movements/filterMovement.reducer';
import { MovementDataState } from '@store/reducers/models/movements/infoProductMovement.reducer';
import { MovementsState } from '@store/reducers/models/movements/movement.reducer';
import { IProductActive } from '@store/reducers/models/product-active/product-active.reducer';
import { Observable } from 'rxjs';
import {
  MovementsFileResponse,
  MovementsFileState,
} from './entities/movements-file';
import {
  IAnswerNicknamesCreate,
  IAnswerNicknamesDelete,
  IAnswerNicknamesUpdate,
  INicknamesAll,
  ISendNicknames,
} from './entities/nicknames';
import {
  MovementsFileLoad,
  MovementsFileReset,
} from './store/actions/movements-file.action';
import {
  NicknamesAllFail,
  NicknamesAllLoad,
  NicknamesAllReset,
  NicknamesCreateFail,
  NicknamesCreateLoad,
  NicknamesCreateReset,
  NicknamesDeleteFail,
  NicknamesDeleteLoad,
  NicknamesDeleteReset,
  NicknamesUpdateFail,
  NicknamesUpdateLoad,
  NicknamesUpdateReset,
} from './store/actions/nicknames.actions';
import {
  movementsFileResponse,
  movementsFileState,
  nicknamesAllState,
  nicknamesCreateState,
  nicknamesDeleteState,
  nicknamesUpdateState,
} from './store/selectors/detail-product.selector';

@Injectable()
export class DetailProductModel extends ApplicationModel {
  public movement$: Observable<MovementsState> = this.store.pipe(
    select((store) => store.models.movements.movement),
  );

  public movementInfo$: Observable<MovementDataState> = this.store.pipe(
    select((store) => store.models.movements.movementInfo),
  );

  public movementFilter$: Observable<MovementFilterState> = this.store.pipe(
    select((store) => store.models.movements.movementFilter),
  );

  public pockets$: Observable<UserPocketsState> = this.store.pipe(
    select((store) => store.models.pockets),
  );

  public nicknames$: Observable<INicknamesAll> = this.store.pipe(
    select(nicknamesAllState),
  );

  public nicknamesCreate$: Observable<IAnswerNicknamesCreate> = this.store.pipe(
    select(nicknamesCreateState),
  );
  public nicknamesDelete$: Observable<IAnswerNicknamesDelete> = this.store.pipe(
    select(nicknamesDeleteState),
  );
  public nicknamesUpdate$: Observable<IAnswerNicknamesUpdate> = this.store.pipe(
    select(nicknamesUpdateState),
  );

  public movementsFileResponse$: Observable<
    MovementsFileResponse
  > = this.store.pipe(select(movementsFileResponse));

  public movementsFileState$: Observable<MovementsFileState> = this.store.pipe(
    select(movementsFileState),
  );

  public fetchMovement(
    type: string,
    id: string,
    from: string = '',
    to: string = '',
  ): void {
    this.store.dispatch(new MovementLoadAction(type, id, from, to));
  }

  public fetchMovementsFile(data: any): void {
    this.store.dispatch(MovementsFileLoad(data));
  }

  public resetMovement(): void {
    this.store.dispatch(MovementsFileReset());
    this.store.dispatch(new MovementResetAction());
  }

  public clearMovement(): void {
    this.store.dispatch(MovementsFileReset());
    this.store.dispatch(new MovementResetAction());
    this.store.dispatch(new MovementResetDataAction());
    this.store.dispatch(new MovementResetFilterAction());
  }

  public resetMovements(): void {
    this.store.dispatch(new MovementResetAction());
  }

  public resetFilter(): void {
    this.store.dispatch(new MovementResetFilterAction());
  }

  public clearDetailProduct(): void {}

  public saveInfoMovement(
    typeAccount: string = '',
    idAccount: string = '',
  ): void {
    this.store.dispatch(new MovementSaveDataAction(typeAccount, idAccount));
  }
  public saveFilterMovement(
    typeFilter: string,
    from: string = '',
    to: string = '',
  ): void {
    this.store.dispatch(new MovementSaveFilterAction(typeFilter, from, to));
  }
  public setProduct(product: IProductActive): void {
    this.store.dispatch(SetSProductActive(product));
  }

  public nicknamesAll(): void {
    this.store.dispatch(NicknamesAllLoad());
  }
  public nicknamesAllFail(desc: string): void {
    this.store.dispatch(NicknamesAllFail(desc));
  }
  public nicknamesCreate(data: ISendNicknames): void {
    this.store.dispatch(NicknamesCreateLoad(data));
  }
  public nicknamesCreateFail(desc: string): void {
    this.store.dispatch(NicknamesCreateFail(desc));
  }
  public nicknamesDelete(data: ISendNicknames): void {
    this.store.dispatch(NicknamesDeleteLoad(data));
  }
  public nicknamesDeleteFail(desc: string): void {
    this.store.dispatch(NicknamesDeleteFail(desc));
  }
  public nicknamesUpdate(data: ISendNicknames): void {
    this.store.dispatch(NicknamesUpdateLoad(data));
  }
  public nicknamesUpdateFail(desc: string): void {
    this.store.dispatch(NicknamesUpdateFail(desc));
  }

  public resetNicknames(): void {
    this.store.dispatch(NicknamesAllReset());
    this.store.dispatch(NicknamesCreateReset());
    this.store.dispatch(NicknamesDeleteReset());
    this.store.dispatch(NicknamesUpdateReset());
  }
}
