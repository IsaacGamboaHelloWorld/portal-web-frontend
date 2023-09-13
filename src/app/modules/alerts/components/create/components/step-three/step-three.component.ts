import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  IAlertFormThree,
  ICreateUserAlertRequest,
  IinfoUser,
} from '@app/modules/alerts/entities/alerts';
import { AlertsModel } from '@app/modules/alerts/store/model/alerts.model';
import { ICreateAlert } from '@app/modules/alerts/store/reducers/create-alert.reducer';
import { UserInfoState } from '@app/store/reducers/global/user/user.reducer';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';
import { combineLatest, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-step-three',
  templateUrl: './step-three.component.html',
  styleUrls: ['./step-three.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class StepThreeComponent implements OnInit {
  public formTypeAlert: FormGroup;
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  public description: string = '';
  @Output() setStep: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private _dom: ManipulateDomService,
    private _facade: AlertsModel,
  ) {}

  ngOnInit(): void {
    this._initForm();
  }

  private _initForm(): void {
    this.formTypeAlert = new FormGroup({
      type_alert: new FormControl('', Validators.required),
      target: new FormControl('', Validators.required),
      select: new FormControl(''),
    });
  }

  public setClass(_id: string): void {
    this._dom.removeMultipleClass('.form-radiobutton-contanier', 'active');
    this._dom.addClass('.type-alert-' + _id, 'active');
  }

  public setClassTarget(_id: string): void {
    this.getInfoUser$.subscribe((data: IinfoUser) => {
      if (data && _id === '0' && data.email) {
        this.formTypeAlert.controls.select.setValue(data.email);
        this.description = `Tu correo registrado es: ${data.email.toLocaleLowerCase()}`;
      } else {
        this.formTypeAlert.controls.select.setValue(data.phoneNumber);
        this.description = `Tu número registrado es: ${data.phoneNumber.toLocaleLowerCase()}`;
      }
    });

    this._dom.removeMultipleClass('.radio-image', 'active');
    this._dom.addClass('.type-target-' + _id, 'active');
  }

  public submitData(): void {
    const stepThreeData: IAlertFormThree = {
      type_alert: this.formTypeAlert.value.product_type,
      target_user: this.formTypeAlert.value.target,
    };
    this._facade.fetchStepThree(stepThreeData);
    combineLatest([
      this._facade.stepOne$,
      this._facade.stepTwo$,
      this._facade.stepThree$,
      this.getInfoUser$,
    ])
      .pipe(takeUntil(this._destroy$))
      .subscribe((info) => {
        const send: ICreateUserAlertRequest = {
          alert: {
            daysBefore: '5',
            key: String(this.formTypeAlert.value.type_alert),
            groupKey: String(info[0].type_prod),
            type: 'Enroll',
            detail: [
              {
                product: {
                  accountId: info[1].select_product['originAccountId'],
                  accountType: info[1].select_product['billerId'],
                  bank: info[1].select_product['billerId'],
                  name: info[1].select_product['billerNickname'],
                },
                targets: [this.formTypeAlert.value.select],
              },
            ],
          },
        };
        this._facade.fetchCreateAlert(send);
      });
  }

  get createAlert$(): Observable<ICreateAlert> {
    return this._facade.createAlert$;
  }

  get basicData$(): Observable<UserInfoState> {
    return this._facade.basicData$;
  }

  get getInfoUser$(): Observable<IinfoUser> {
    return this._facade.infoUser$;
  }
}
