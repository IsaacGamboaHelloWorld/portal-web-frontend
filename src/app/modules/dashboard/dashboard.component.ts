import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApplicationModel } from '@app/application.model';
import { CURRENT_USER } from '@app/core/constants/auth';
import { OptionModuleState } from '@app/store/reducers/global/option-module/option-module.reducer';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';
import { SecurityService } from '../security/services/security.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class DashboardComponent {
  public eventBeforeunLoad: boolean = false;
  public eventVisibility: boolean = false;
  public eventOnload: boolean = false;
  public eventMouseY: boolean = false;
  public eventMouseX: boolean = false;
  public count: number = 0;

  constructor(
    private _model: ApplicationModel,
    private auth: AuthService,
    private securityService: SecurityService,
  ) {
    window.addEventListener('unload', () => {
      const hmacDelete: string = this.securityService.hmac('delete' + '');
      fetch(environment.api.base + environment.api.services.logout, {
        method: 'delete',
        headers: {
          'X-SESSION-ID': this.tracing_session(),
          // tslint:disable-next-line: prettier
          'Authorization': 'Bearer ' + this.securityService.getItem(CURRENT_USER),
          'X-SECURITY-SESSION': this.securityService.symmetric.id,
          'X-SECURITY-HMAC': hmacDelete,
        },
        body: '',
        keepalive: true, // this is important!
      });
    });
    this.beforeunLoad();
    this.visibilityChange();
    this.onLoad();
    this.mouseOver();
    this.eventOnload = this.getStateReload();
  }

  get optionsModule$(): Observable<OptionModuleState> {
    return this._model.optionModule$;
  }

  private tracing_session(): string {
    try {
      return document.cookie
        .split('_dd_s')[1]
        .split('id=')[1]
        .split('&')[0];
    } catch (e) {}
  }

  public getStateReload(): boolean {
    const entries = window.performance
      .getEntriesByType('navigation')
      .map((nav: any) => nav.type)
      .includes('reload');
    return entries;
  }

  public beforeunLoad(): void {
    window.addEventListener('beforeunload', () => {
      this.auth.singlelogOut();
      localStorage.removeItem('islogged');
    });
  }

  public visibilityChange(): void {
    window.addEventListener(
      'visibilitychange',
      () => {
        setTimeout(() => {
          if (document.visibilityState === 'hidden') {
            localStorage.removeItem('islogged');
          }
        }, 1000);
      },
      true,
    );
  }

  public onLoad(): void {
    window.addEventListener(
      'unload',
      () => {
        this.auth.singlelogOut();
      },
      true,
    );
  }

  public mouseOver(): void {
    window.addEventListener(
      'mouseover',
      (event: any) => {
        this.eventMouseX = false;
        this.eventMouseY = false;
        if (
          event.clientY <= 100 &&
          event.clientX >= 50 &&
          event.clientX <= 100
        ) {
          this.eventMouseY = true;
          this.eventMouseX = true;
        }
      },
      true,
    );
  }
}
