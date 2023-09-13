import { Component, ViewEncapsulation } from '@angular/core';
import { take } from 'rxjs/operators';

import { AuthService } from '@app/modules/auth/services/auth.service';
import { CoexistenceService } from 'app/modules/home/services/coexistence.service';

@Component({
  selector: 'app-coexistence',
  templateUrl: './coexistence.component.html',
  styleUrls: ['./coexistence.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class CoexistenceComponent {
  constructor(private service: CoexistenceService, private auth: AuthService) {}

  public doCallOldPortal(): void {
    this.service
      .doGoOldPortal()
      .pipe(take(1))
      .subscribe((data: UrlOtherPortal) => {
        this.auth.logOut();
        window.location.replace(data.url);
      });
  }
}

export interface UrlOtherPortal {
  url: string;
}
