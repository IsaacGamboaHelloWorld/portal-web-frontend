import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { ApplicationModel } from '@app/application.model';
import { UserSecureDataMdmResponse } from '@app/core/models/user/get-user-secure-data-mdm';
import { Observable } from 'rxjs';
import {
  _fullNavigate,
  INavigateLimitManagement,
} from '../../constants/navigate-limit-management';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.sass'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OnboardingComponent implements OnInit {
  constructor(private _router: Router, private _appModel: ApplicationModel) {}

  ngOnInit(): void {}

  public emitClick(): void {
    this._router.navigate([this.fullNavigate.home]);
  }

  get fullNavigate(): INavigateLimitManagement {
    return _fullNavigate;
  }

  get userInfoData$(): Observable<UserSecureDataMdmResponse> {
    return this._appModel.userInfoData$;
  }
}
