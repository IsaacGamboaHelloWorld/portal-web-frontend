import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { INavigate, Navigate } from '@core/constants/navigate';
import { Subject } from 'rxjs';
import { A_SP, A_TC, IAlertFormOne } from '../../entities/alerts';
import { AlertsModel } from '../../store/model/alerts.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateAlertComponent implements OnInit, OnDestroy {
  @Input() step: number;
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  public formTypeAlert: FormGroup;
  public typeActive: any;
  public viewHome: boolean = true;
  constructor(private _facade: AlertsModel, private _router: Router) {}

  ngOnInit(): void {
    this.step = 1;
    this._facade.setStep({ step: 3 });
    this._initForm();
    this._facade.fetchInfoUser();
  }

  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  get navigate(): INavigate {
    return Navigate;
  }
  private _initForm(): void {
    this.formTypeAlert = new FormGroup({
      alert_type: new FormControl('', Validators.required),
    });
  }

  public setBorder(_id: string): void {
    this.typeActive = _id;
    this.formTypeAlert.controls.alert_type.setValue(_id);
  }

  public submitData(): void {
    const stepOneData: IAlertFormOne = {
      type_prod: this.formTypeAlert.value.alert_type,
    };
    // this.loadData(this.formTypeAlert.value.alert_type);
    // this._facade.fetchStepOne(stepOneData);
    this._router.navigate(['/alertas-y-notificaciones/crear-alerta/step-one']);
    this.viewHome = false;
  }

  public loadData(_data: string): void {
    switch (_data) {
      case A_TC:
        this._facade.fetchAllFinancialOps();
        break;
      case A_SP:
        this._facade.fetchAllBills();
        break;
    }
  }

  public setStep(_number: number): void {
    this.step = _number;
  }
}
