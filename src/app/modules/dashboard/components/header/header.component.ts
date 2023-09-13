import { Component, ViewEncapsulation } from '@angular/core';
import { ApplicationModel } from '@app/application.model';
import { UserSecureDataMdmState } from '@app/store/reducers/global/user/user-get-secure-data-mdm.reducer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from './../../../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  constructor(private model: ApplicationModel) {}

  get name$(): Observable<string> {
    return this.model.userInfo$.pipe(
      map((userState) =>
        this.hasName(userState)
          ? userState.data.PartyAssociation[0].PersonInfo.PersonName[0]
              .FirstName +
            ' ' +
            userState.data.PartyAssociation[0].PersonInfo.PersonName[0].LastName
          : '',
      ),
    );
  }

  get getDisabeOptions(): { profile: boolean } {
    return environment.menuTopDisables;
  }

  get hasName$(): Observable<boolean> {
    return this.model.userInfo$.pipe(
      map((userState) => this.hasName(userState)),
    );
  }

  hasName(userState: UserSecureDataMdmState): boolean {
    return (
      !!userState &&
      !!userState.data &&
      userState.data.success &&
      !!userState.data.PartyAssociation &&
      !!userState.data.PartyAssociation[0] &&
      !!userState.data.PartyAssociation[0].PersonInfo &&
      !!userState.data.PartyAssociation[0].PersonInfo.PersonName &&
      !!userState.data.PartyAssociation[0].PersonInfo.PersonName[0] &&
      !!userState.data.PartyAssociation[0].PersonInfo.PersonName[0].FirstName &&
      !!userState.data.PartyAssociation[0].PersonInfo.PersonName[0].LastName
    );
  }
}
