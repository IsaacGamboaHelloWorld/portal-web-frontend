import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import { UserInfoState } from '@app/store/reducers/global/user/user.reducer';
import { Observable } from 'rxjs';
import { ProfileModel } from '../../store/model/profile.model';
import { PROFILE_ROUTES } from '../../util/routes';

@Component({
  selector: 'app-home-profile',
  templateUrl: './home-profile.component.html',
  styleUrls: ['./home-profile.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeProfileComponent implements OnInit, OnDestroy {
  constructor(private dom: ManipulateDomService, private model: ProfileModel) {}

  ngOnInit(): void {
    this.dom.addClass('.headerTop', 'background-detail');
    this.dom.removeClass('.headerTop', 'background-home');
    this.dom.scrollTop();
  }

  ngOnDestroy(): void {
    this.dom.removeClass('.headerTop', 'background-detail');
    this.dom.addClass('.headerTop', 'background-home');
  }

  get userInfo$(): Observable<UserInfoState> {
    return this.model.userInfoCrm$;
  }

  get routes(): { [key: string]: string } {
    return PROFILE_ROUTES;
  }
}
