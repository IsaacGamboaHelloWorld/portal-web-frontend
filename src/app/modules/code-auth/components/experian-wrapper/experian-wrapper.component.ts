import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { Router } from '@angular/router';
import { combineLatest, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import {
  IAnswerUpdateSecureData,
  IUpdateSecureData,
} from '../../entities/code-auth';
import { INavigateCodeAuth, NavigateCodeAuth } from '../../entities/routes';
import { CodeAuthModel } from '../../store/model/code-auth.model';

@Component({
  selector: 'app-experian-wrapper',
  templateUrl: './experian-wrapper.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperianWrapperComponent implements OnInit {
  data: any;
  private _destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private model: CodeAuthModel, private router: Router) {}

  get navigate(): INavigateCodeAuth {
    return NavigateCodeAuth;
  }

  ngOnInit(): void {
    combineLatest([
      this.model.userInfoResponse$,
      this.model.userSecureData$,
    ]).subscribe(([currentSecureDataResponse, userSecureData]) => {
      if (!!currentSecureDataResponse && isNullOrUndefined(this.data)) {
        this.model.resetExperianData();
        this.data = {
          documentExpeditionDate:
            currentSecureDataResponse.documentExpeditionDate,
          names: currentSecureDataResponse.firstName,
          lastName: currentSecureDataResponse.lastName,
          otpPhoneNumber: '' + userSecureData['securePhone'],
        };
        this.model.executeExperianFlow(this.data);
        return null;
      }
    });
  }

  get experianState$(): Observable<any> {
    return this.model.stateExperian$;
  }

  get secureDataMdmState$(): Observable<IAnswerUpdateSecureData> {
    return this.model.stateUpdateSecureDataCodeAuth$;
  }

  public submitActionFlowHandler(data: any): void {
    this.data = {
      ...this.data,
      ...data,
    };
    this.model.executeExperianFlow(this.data);
    return;
  }

  public submitCompletedExperianFlowHandler(event: any): void {
    this.model.userSecureData$
      .pipe(takeUntil(this._destroy$))
      .subscribe((data) => {
        const obj: IUpdateSecureData = {};
        obj.secureEmail = data.secureEmail;
        obj.secureTelephone = data.securePhone;
        obj.contactPreference = data.contactPreference;
        this.model.authUpdateSecuerDataSucces(obj);
        this.router.navigate([this.navigate.homeCodeAuth]);
      })
      .unsubscribe();
  }
  public submitErrorExperianFlowHandler(_event: any): void {
    this.router.navigate([this.navigate.home]);
  }
}
