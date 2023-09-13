import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { INavigate, Navigate } from '@app/core/constants/navigate';
import { ClassNotification } from '@app/core/constants/notification';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { INavigateTotp, NavigateTotp } from '../../constants/routes';
import { TotpModel } from '../../store/models/totp.model';
import { ITotpGenerate, ITotpRegister } from '../../store/state/totp.state';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements OnInit, OnDestroy {
  public formRegister: FormGroup;

  private _maxCodeLength: number = 6;
  private _patterCode: RegExp = /^[0-9]+$/;
  private _totpId: string = null;
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private model: TotpModel,
    private router: Router,
    private translate: TranslateService,
  ) {
    this._createFormRegister();
  }

  ngOnInit(): void {
    this._subsGenerate();
    this._subsRegister();
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  private _createFormRegister(): void {
    this.formRegister = new FormGroup({
      name: new FormControl('', [Validators.required]),
      totpId: new FormControl('', [Validators.required]),
      code: new FormControl('', [
        Validators.required,
        Validators.maxLength(this._maxCodeLength),
        Validators.minLength(this._maxCodeLength),
        Validators.pattern(this._patterCode),
      ]),
    });
  }

  private _subsGenerate(): void {
    this.generateTotp$
      .pipe(takeUntil(this._destroy$))
      .subscribe((data: ITotpGenerate) => this._responseGenerate(data));
  }

  private _subsRegister(): void {
    this.registerTotp$
      .pipe(takeUntil(this._destroy$))
      .subscribe((data: ITotpRegister) => this._responseRegister(data));
  }

  private _responseGenerate(data: ITotpGenerate): void {
    if (!!data && !!data.data && data.data.id) {
      this._totpId = data.data.id;
      this.aliasTotpId.setValue(this._totpId);
    }
  }

  private _responseRegister(data: ITotpRegister): void {
    if (!!data && !!data.data && data.data.success) {
      const message = this.translate.instant(
        `TOTP_AUTHENTICATION.REGISTER.NOTIFICATION`,
      );
      this.model.notificationOpen(message, true, ClassNotification.SUCCESS);
      this.model.totpRegisterReset();
      this.router.navigate([this.mainNavigate.security]);
    }
  }

  public next(): void {
    const name = this.aliasName.value;
    const totpId = this.aliasTotpId.value;
    const code = this.aliasCode.value;
    this.model.totpRegisterLoad(name, totpId, code);
  }

  get internalNavigate(): INavigateTotp {
    return NavigateTotp;
  }

  get mainNavigate(): INavigate {
    return Navigate;
  }

  get generateTotp$(): Observable<ITotpGenerate> {
    return this.model.generateTotp$;
  }

  get registerTotp$(): Observable<ITotpRegister> {
    return this.model.registerTotp$;
  }

  get aliasName(): AbstractControl {
    return this.formRegister.get('name');
  }

  get aliasCode(): AbstractControl {
    return this.formRegister.get('code');
  }

  get aliasTotpId(): AbstractControl {
    return this.formRegister.get('totpId');
  }
}
