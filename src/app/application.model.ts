import { Injectable } from '@angular/core';
import { ProductsInterface } from '@core/interfaces/products.interface';
import { Product } from '@core/models/products/product';
import { productsSelector } from '@modules/main-container/selectors/dashboard.selector';
import { select, Store } from '@ngrx/store';
import {
  AnimateHiddenAction,
  AnimateShowAction,
} from '@store/actions/global/auth/animateInit.action';
import { IsLogged, LogOutAction } from '@store/actions/global/auth/auth.action';
import {
  NotificationClosedAction,
  NotificationResetAction,
  NotificationShowAction,
} from '@store/actions/global/notification/notification.action';
import { PocketsLoadAction } from '@store/actions/models/pockets/user-pockets.action';
import {
  ResetProductActive,
  SetSProductActive,
} from '@store/actions/models/product-active/product-active.action';
import {
  detailProductLoad,
  productLoad,
} from '@store/actions/models/product/product.action';
import { productsLoad } from '@store/actions/models/products/products.action';
import { ToPlusLoad } from '@store/actions/models/to-plus/to-plus.action';
import { INotificationState } from '@store/reducers/global/notification/notification.reducer';
import { IProductActive } from '@store/reducers/models/product-active/product-active.reducer';
import { ApplicationState } from '@store/state/application.state';
import { Observable } from 'rxjs';
import { FreeDestination } from './core/interfaces/free-destination.interface';
import { AdvertisingResponse } from './core/models/advertising/advertisingData';
import { UserSecureDataMdmResponse } from './core/models/user/get-user-secure-data-mdm';
import { UserData } from './core/models/user/userData';
import { IFinancialOp } from './modules/paymentsv2/financial-ob/entities/financial-op';
import {
  SelectPaymentLoad,
  SelectPaymentReset,
} from './modules/paymentsv2/financial-ob/store/actions/select-payment.action';
import { IUnusualOPApproveRequest } from './modules/unusual-operations/entities/unusual-approve-request.interface';
import {
  UnusualApproveLoadAction,
  UnusualApproveResetAction,
} from './modules/unusual-operations/store/actions/unusual-approve.actions';
import {
  UnusualQueryLoadAction,
  UnusualQueryResetAction,
} from './modules/unusual-operations/store/actions/unusual-query.actions';
import {
  IUnusualOpApprove,
  IUnusualOpQuery,
} from './modules/unusual-operations/store/state/unsual-operations.state';
import {
  NotificationMMClosedAction,
  NotificationMMResetAction,
  NotificationMMShowAction,
} from './store/actions/global/notification-multiple-message/notification-multiple-message.action';
import { OptionModuleLoadAction } from './store/actions/global/option-module/option-module.action';
import { ToAdvertisingLoad } from './store/actions/models/advertising/advertising.action';
import { freeDestinyDetailLoad } from './store/actions/models/free-destiny/free-destination-detail.actions';
import { freeDestinyAllLoad } from './store/actions/models/free-destiny/free-destinations.action';
import { INotificationMMState } from './store/reducers/global/notification-multiple-message/notification-multiple-message.reducer';
import { OptionModuleState } from './store/reducers/global/option-module/option-module.reducer';
import { UserSecureDataMdmState } from './store/reducers/global/user/user-get-secure-data-mdm.reducer';
import { UserInfoState } from './store/reducers/global/user/user.reducer';
import { FreeDestinyState } from './store/reducers/models/free-destiny/free-destinations.reducer';

@Injectable()
export class ApplicationModel {
  constructor(protected store: Store<ApplicationState>) {}

  public isLogged$: Observable<boolean> = this.store.pipe(
    select((store) => store.global.isLogged),
  );

  public productActive$: Observable<IProductActive> = this.store.pipe(
    select((store) => store.models.productActive),
  );

  public animateInit$: Observable<boolean> = this.store.pipe(
    select((store) => store.global.animateInit),
  );

  public products$: Observable<ProductsInterface> = this.store.pipe(
    select(productsSelector),
  );

  public freeDestiny$: Observable<FreeDestinyState> = this.store.pipe(
    select((store) => store.models.freeDestinations),
  );

  public freeDestinations$: Observable<any> = this.store.pipe(
    select((store) => store.models.freeDestinationsDetail),
  );

  public hourSession$: Observable<string> = this.store.pipe(
    select((store) => store.global.user.data.lastAuthDate),
  );

  public lastIpAddress$: Observable<string> = this.store.pipe(
    select((store) => store.global.user.data.lastIpAddress),
  );

  public ipAddress$: Observable<string> = this.store.pipe(
    select((store) => {
      if (
        !!store.global.user.data &&
        !!store.global.user.data.request &&
        !!store.global.user.data.request.ipAddress
      ) {
        return store.global.user.data.request.ipAddress;
      }
      return '';
    }),
  );

  public optionsModule$: Observable<string> = this.store.pipe(
    select((store) => store.global.user.data.optionsModules),
  );

  public notification$: Observable<INotificationState> = this.store.pipe(
    select((store) => store.global.notification),
  );

  public notificationMM$: Observable<INotificationMMState> = this.store.pipe(
    select((store) => store.global.notificationMM),
  );

  public userInfo$: Observable<UserSecureDataMdmState> = this.store.pipe(
    select((store) => store.global.userSecureData),
  );

  public userInfoData$: Observable<UserSecureDataMdmResponse> = this.store.pipe(
    select((store) => store.global.userSecureData.data),
  );

  public userInfoCrm$: Observable<UserInfoState> = this.store.pipe(
    select((store) => store.global.userInfo),
  );

  public product$: Observable<Product[]> = this.store.pipe(
    select((store) => store.models.product),
  );

  public enrollmentData$: Observable<{ data: UserData }> = this.store.pipe(
    select((store) => store.global.user),
  );

  public rememberUserInfo$: Observable<string> = this.store.pipe(
    select((store) => store.global.rememberUserInfo),
  );

  public optionModule$: Observable<OptionModuleState> = this.store.pipe(
    select((store) => store.global.optionModule),
  );

  public advertisingData$: Observable<AdvertisingResponse> = this.store.pipe(
    select((store) => store.models.advertisingData),
  );

  public unusualOperationsQuery$: Observable<IUnusualOpQuery> = this.store.pipe(
    select((store) => store.models.unusualOperations.unusualQuery),
  );

  public unusualOperationsApprove$: Observable<
    IUnusualOpApprove
  > = this.store.pipe(
    select((store) => store.models.unusualOperations.unusualApprove),
  );

  public showAnimate(): void {
    this.store.dispatch(new AnimateShowAction());
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

  public notificationClosed(): void {
    this.store.dispatch(new NotificationClosedAction());
  }

  public notificationReset(): void {
    this.store.dispatch(new NotificationResetAction());
  }

  public notificationMMOpen(
    data: any = null,
    autoClosed: boolean = false,
    typeNotification: string = '',
    firstMessage: boolean = false,
    overwriteMessage: string = '',
  ): void {
    this.store.dispatch(new NotificationMMResetAction());
    this.store.dispatch(
      new NotificationMMShowAction(
        data,
        autoClosed,
        typeNotification,
        firstMessage,
        overwriteMessage,
      ),
    );
  }

  public notificationMMClosed(): void {
    this.store.dispatch(new NotificationMMClosedAction());
  }

  public notificationMMReset(): void {
    this.store.dispatch(new NotificationMMResetAction());
  }

  public fetchProducts(): void {
    this.store.dispatch(productsLoad());
  }

  public fetchFreeDestinationsAll(): void {
    this.store.dispatch(freeDestinyAllLoad());
  }

  public fetchToPlus(): void {
    this.store.dispatch(ToPlusLoad());
  }

  public fetchAdvertising(): void {
    this.store.dispatch(ToAdvertisingLoad());
  }

  public fetchPockets(): void {
    this.store.dispatch(new PocketsLoadAction());
  }

  public logout(): void {
    this.store.dispatch(new AnimateHiddenAction());
    this.store.dispatch(LogOutAction());
  }

  public fetchProduct(type: string, id: string, product: Product): void {
    this.store.dispatch(productLoad(id, type, product));
  }

  public fetchDetailProduct(type: string, id: string): void {
    this.store.dispatch(detailProductLoad(type, id));
  }

  public fetchFreeDestiny(id: string, freeDestiny: FreeDestination): void {
    this.store.dispatch(freeDestinyDetailLoad(id, freeDestiny));
  }

  public setIsLogged(isLogged: boolean): void {
    this.store.dispatch(IsLogged(isLogged));
  }

  public setProduct(product: IProductActive): void {
    this.store.dispatch(SetSProductActive(product));
  }

  public resetProduct(): void {
    this.store.dispatch(ResetProductActive());
  }

  public selectPayment(data: IFinancialOp): void {
    this.store.dispatch(SelectPaymentLoad(data));
  }

  public clearSelectPayment(): void {
    this.store.dispatch(SelectPaymentReset());
  }

  public optionModuleLoad(): void {
    this.store.dispatch(OptionModuleLoadAction());
  }

  //#region Unusual Operations
  public fetchUnusualOperationsQueryLoad(): void {
    this.store.dispatch(UnusualQueryLoadAction());
  }

  public fetchUnusualOperationsQueryReset(): void {
    this.store.dispatch(UnusualQueryResetAction());
  }

  public fetchUnusualOperationsApproveLoad(
    body: IUnusualOPApproveRequest,
  ): void {
    this.store.dispatch(UnusualApproveLoadAction({ body }));
  }

  public fetchUnusualOperationsApproveReset(): void {
    this.store.dispatch(UnusualApproveResetAction());
  }
  //#endregion Unusual Operations
}
