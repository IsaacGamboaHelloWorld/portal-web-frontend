import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ApplicationModel } from '@app/application.model';
import { environment } from '@environment';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-global-footer',
  templateUrl: './global-footer.component.html',
  styleUrls: ['./global-footer.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class GlobalFooterComponent {
  public showLogo: boolean = false;
  @Input() showDate: boolean = true;

  constructor(private model: ApplicationModel, private router: Router) {
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe((data) => {
        if (
          data.url.indexOf(`/login`) >= 0 ||
          data.url.indexOf(`/login/enrolamiento`) >= 0 ||
          data.url.indexOf(`/loginRF`) >= 0
        ) {
          this.showLogo = true;
        }
      });
  }

  get version(): string {
    return environment.version;
  }

  get hasHour$(): Observable<boolean> {
    return this.hour$.pipe(map((data) => !!data));
  }

  get ipAddress$(): Observable<string> {
    return this.model.ipAddress$;
  }

  get hour$(): Observable<Date> {
    return this.model.hourSession$.pipe(
      filter((data) => !!data),
      map((date) => new Date(date)),
    );
  }
}
