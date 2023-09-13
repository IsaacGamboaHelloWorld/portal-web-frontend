import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Navigate, Titles } from '@app/core/constants/navigate';
import { EventsService } from '@app/core/services/tag_manager/events.service';
import {
  LoadRegisterAffiliationApiOperation,
  RegisterAffiliationError,
  RegisterAffiliationSuccess,
} from '@app/store/actions/models/transfer/products-destination/register-affiliation.action';
import { Events } from '@core/constants/events';
import { ClassNotification } from '@core/constants/notification';
import { GlobalDataService } from '@core/services/global-data/global-data.service';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { IRespDeleteAffiliation } from '@modules/registered-accounts/entities/delete-affition';
import { RegisteredAccountsFacade } from '@modules/registered-accounts/registered-accounts.facade';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { RegisterAffiliationService } from '../../services/register-affiliation.service';

@Injectable()
export class RegisterAffiliationEffects {
  constructor(
    private actions$: Actions,
    private globalData: GlobalDataService,
    private registerAffiliationService: RegisterAffiliationService,
    private facade: RegisteredAccountsFacade,
    private translate: TranslateService,
    private dom: ManipulateDomService,
    private events: EventsService,
    private router: Router,
  ) {}

  RegisterAffiliationApiOperation: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadRegisterAffiliationApiOperation),
      switchMap((action) => {
        return this.registerAffiliationService
          .registerAffiliation(action.affiliationProduct, action.products)
          .pipe(
            takeUntil(this.globalData.cancel),
            map((res: IRespDeleteAffiliation) => {
              if (!isNullOrUndefined(res.success) && res.success) {
                this.events.event({
                  event: Events.page_view,
                  pagePath:
                    window.location.pathname + Navigate.transfer_success,
                  pageTitle: Titles.transfer_success,
                });
                this.dom.scrollTop();
                this.router.navigate([
                  Navigate.registered_product_affiliations,
                ]);
                this.loadNotification(
                  this.translate.instant(
                    'REGISTER_PRODUCT_AFFILIATION.OPERATION_SUCCESS_MESSAGE',
                  ),
                  ClassNotification.SUCCESS,
                );
                return RegisterAffiliationSuccess();
              } else {
                this.loadNotification(
                  this.translate.instant(
                    'REGISTER_PRODUCT_AFFILIATION.OPERATION_ERROR_MESSAGE',
                  ),
                  ClassNotification.ERROR,
                );
                return RegisterAffiliationError(res.errorMessage);
              }
            }),
            catchError((err) => {
              this.loadNotification(
                this.translate.instant(
                  'REGISTER_PRODUCT_AFFILIATION.OPERATION_ERROR_MESSAGE',
                ),
                ClassNotification.ERROR,
              );
              return of(RegisterAffiliationError(''));
            }),
          );
      }),
    ),
  );

  loadNotification(content: string, type: ClassNotification): void {
    setTimeout(() => this.facade.notificationOpen(content, true, type), 1000);
  }
}
