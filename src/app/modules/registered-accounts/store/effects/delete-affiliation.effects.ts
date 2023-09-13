import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { catchError, map, retry, switchMap, takeUntil } from 'rxjs/operators';

import { eventDataLayer } from '@app/shared/helpers/eventDataLayer';
import { ModalService } from '@app/shared/modal/services/modal.service';
import { Events } from '@core/constants/events';
import { ClassNotification } from '@core/constants/notification';
import { GlobalDataService } from '@core/services/global-data/global-data.service';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { TitleDelete } from '@modules/registered-accounts/constants/events';
import { IRespDeleteAffiliation } from '@modules/registered-accounts/entities/delete-affition';
import { RegisteredAccountsFacade } from '@modules/registered-accounts/registered-accounts.facade';
import { DeleteAffiliationService } from '@modules/registered-accounts/services/delete-affiliation.service';
import {
  DeleteAffiliationError,
  DeleteAffiliationLoad,
} from '@modules/registered-accounts/store/actions/delete-affiliation.action';
import { NotificationShowAction } from '@store/actions/global/notification/notification.action';
import { ProductDestinationLoad } from '@store/actions/models/transfer/products-destination/product-destination.action';

@Injectable()
export class DeleteAffiliationEffects {
  constructor(
    private actions$: Actions,
    private globalData: GlobalDataService,
    private deleteAffiliationService: DeleteAffiliationService,
    private facade: RegisteredAccountsFacade,
    private translate: TranslateService,
    private modalService: ModalService,
    private dom: ManipulateDomService,
  ) {}

  DeleteAffiliation: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteAffiliationLoad),
      switchMap((action) => {
        return this.deleteAffiliationService
          .deleteAffiliation(action.affiliationProduct, action.product)
          .pipe(
            retry(1),
            takeUntil(this.globalData.cancel),
            map((data: IRespDeleteAffiliation) => {
              this.modalService.close();
              if (!!data.success && data.success) {
                eventDataLayer({
                  event: Events.loaded_custom,
                  pageTitle:
                    this.translate.instant(
                      `PRODUCT_TYPES.${action.affiliationProduct.destinationAccountType}`,
                    ) + TitleDelete,
                });
                this.dom.scrollTop();
                this.facade.resetDestination();
                return ProductDestinationLoad(
                  action.product.id,
                  action.product.typeAccount,
                );
              }
              return new NotificationShowAction(
                data.errorMessage,
                true,
                ClassNotification.ERROR,
              );
            }),
            catchError((_) => {
              this.modalService.close();
              return of(DeleteAffiliationError);
            }),
          );
      }),
    ),
  );
}
