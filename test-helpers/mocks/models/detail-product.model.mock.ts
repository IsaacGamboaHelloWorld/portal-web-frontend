import { Injectable } from '@angular/core';
import { MovementsFileResponse } from '@app/modules/detail-product/entities/movements-file';
import { UserPocketsState } from '@app/store/reducers/models/pockets/user-pockets.reducer';
import { ProductsInterface } from '@core/interfaces/products.interface';
import { Product } from '@core/models/products/product';
import { MovementsState } from '@store/reducers/models/movements/movement.reducer';
import { BehaviorSubject } from 'rxjs';
import { FreeDestinationDetailMock } from '../data/freeDestinations.mock';

@Injectable()
export class DetailProductModelMock {
  private innerProductData?: any;
  get getInnerProductData(): any {
    return this.innerProductData;
  }
  set setInnerPrpductData(data: any) {
    this.innerProductData = data;
    this.product$.next(data);
  }

  private innerMovementData?: MovementsState | null | undefined;
  get getInnerMovementData(): MovementsState {
    return this.innerMovementData;
  }
  set setInnerMovementtData(data: MovementsState) {
    this.innerMovementData = data;
    this.movement$.next(data);
  }

  private innerMovementFileResponseData?: MovementsFileResponse;
  get getInnerMovementFileResponseData(): MovementsFileResponse {
    return this.innerMovementFileResponseData;
  }
  set setInnerMovementFileResponseData(data: MovementsFileResponse) {
    this.innerMovementFileResponseData = data;
    this.movementsFileResponse$.next(data);
  }

  public movement$: BehaviorSubject<MovementsState> = new BehaviorSubject(
    this.innerMovementData,
  );
  public movementsFileResponse$: BehaviorSubject<
    MovementsFileResponse
  > = new BehaviorSubject(this.innerMovementFileResponseData);

  public product$: BehaviorSubject<Product[]> = new BehaviorSubject(
    this.innerProductData,
  );
  public products$: BehaviorSubject<ProductsInterface> = new BehaviorSubject(
    null,
  );
  public movementInfo$: BehaviorSubject<object> = new BehaviorSubject(null);
  public movementFilter$: BehaviorSubject<object> = new BehaviorSubject(null);
  public pockets$: BehaviorSubject<UserPocketsState> = new BehaviorSubject(
    null,
  );

  private innerNicknameUpdate: any = {
    success: true,
  };
  get getInnerNicknameUpdate(): any {
    return this.innerNicknameUpdate;
  }
  set setInnerNicknameUpdate(data: any) {
    this.innerNicknameUpdate = data;
    this.nicknamesUpdate$.next(data);
  }
  public nicknamesUpdate$: BehaviorSubject<object> = new BehaviorSubject(
    this.innerNicknameUpdate,
  );

  private innerNicknameCreate: any = {
    success: true,
  };
  get getInnerNicknameCreate(): any {
    return this.innerNicknameCreate;
  }
  set setInnerNicknameCreate(data: any) {
    this.innerNicknameCreate = data;
    this.nicknamesCreate$.next(data);
  }
  public nicknamesCreate$: BehaviorSubject<object> = new BehaviorSubject(
    this.innerNicknameCreate,
  );

  private innerNicknameDelete: any = {
    success: true,
  };
  get getInnerNicknameDelete(): any {
    return this.innerNicknameDelete;
  }
  set setInnerNicknameDelete(data: any) {
    this.innerNicknameDelete = data;
    this.nicknamesDelete$.next(data);
  }
  public nicknamesDelete$: BehaviorSubject<object> = new BehaviorSubject(
    this.innerNicknameDelete,
  );

  private innerFreeDestinations: any = [
    FreeDestinationDetailMock.freeDestinationCredit,
  ];
  get getInnerFreeDestinations(): any {
    return this.innerFreeDestinations;
  }
  set setInnerFreeDestinations(data: any) {
    this.innerFreeDestinations = data;
    this.freeDestinations$.next(data);
  }
  public freeDestinations$: BehaviorSubject<any> = new BehaviorSubject(
    this.innerFreeDestinations,
  );

  public fetchMovement(type: string, id: string): void {}
  public fetchDetailProduct(type: string, id: string): void {}

  public clearMovement(): void {}
  public resetMovement(): void {}
  public resetMovements(): void {}
  public clearDetailProduct(): void {}
  public resetFilter(): void {}
  public saveInfoMovement(): void {}
  public saveFilterMovement(): void {}
  public setProduct(): void {}

  public fetchPockets(): void {}
  public nicknamesAll(): void {}

  public nicknamesCreate(): void {}
  public nicknamesUpdate(): void {}
  public nicknamesDelete(): void {}
}
