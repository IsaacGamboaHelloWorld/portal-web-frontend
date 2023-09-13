import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { INavigate, Navigate } from '@app/core/constants/navigate';
import { Observable } from 'rxjs';
import {
  _fullNavigate,
  INavigateLimitManagement,
} from './constants/navigate-limit-management';
import { ILimitManagementGet, LimitManagementModel } from './store';

@Component({
  selector: 'app-limit-management',
  templateUrl: './limit-management.component.html',
  styleUrls: ['./limit-management.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LimitManagementComponent implements OnInit {
  constructor(private _router: Router, private _model: LimitManagementModel) {}

  ngOnInit(): void {
    this._subLimitManagementGet();
  }

  private _subLimitManagementGet(): void {
    this._model.limitManagementGet$
      .subscribe((state: ILimitManagementGet) => {
        if (!!state && !!state.data && state.data.firstTime) {
          this._router.navigate([this.fullNavigate.onboarding]);
        } else {
          this._router.navigate([this.fullNavigate.home]);
        }
      })
      .unsubscribe();
  }

  get fullNavigate(): INavigateLimitManagement {
    return _fullNavigate;
  }

  get mainNavigation(): INavigate {
    return Navigate;
  }

  get limitManagementGet$(): Observable<ILimitManagementGet> {
    return this._model.limitManagementGet$;
  }
}
