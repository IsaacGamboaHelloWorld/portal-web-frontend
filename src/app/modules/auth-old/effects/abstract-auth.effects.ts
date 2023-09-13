import { Router } from '@angular/router';
import { ApplicationModel } from '@app/application.model';
import {
  NavigateEnrollment,
  TitlesEnrollment,
} from '@app/modules/auth-old/constants/navigate';
import { TealiumUtagService } from '@app/tealium/utag.service';
import { ONBOARDING, REMEMBER } from '@core/constants/auth';
import { Events } from '@core/constants/events';
import { Navigate } from '@core/constants/navigate';
import { EventsService } from '@core/services/tag_manager/events.service';

export class AbstractAuthEffects {
  constructor(
    protected router: Router,
    protected model: ApplicationModel,
    protected events: EventsService,
    public tealium: TealiumUtagService,
  ) {}

  protected saveRemember(): void {
    this.model.rememberUserInfo$
      .subscribe((userInfoOnStore) => {
        const userInfo: any = JSON.parse(atob(userInfoOnStore));
        if (userInfo['remember']) {
          const info = {
            type: userInfo['type'],
            number: userInfo['number'],
          };
          localStorage.setItem(REMEMBER, btoa(JSON.stringify(info)));
        } else {
          localStorage.removeItem(REMEMBER);
        }
      })
      .unsubscribe();
  }

  protected successRedirect(): void {
    if (!!localStorage.getItem(ONBOARDING)) {
      this.model.showAnimate();
      this.timerRedirect(Navigate.home);
    } else {
      this.timerRedirect(Navigate.induction);
    }
    this.events.event(
      {
        event: Events.page_view,
        pagePath: window.location.pathname + NavigateEnrollment.loginSuccess,
        pageTitle: TitlesEnrollment.loginSuccess,
      },
      Events.page_view,
    );
    this.tealium.view({
      tealium_event: 'view',
      pagePath: window.location.pathname + NavigateEnrollment.loginSuccess,
    });
  }

  protected timerRedirect(url: string): void {
    this.router.navigate([url]);
  }
}
