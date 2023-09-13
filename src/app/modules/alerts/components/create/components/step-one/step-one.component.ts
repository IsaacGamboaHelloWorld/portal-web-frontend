import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { A_SP, A_TC, IAlertFormOne } from '@app/modules/alerts/entities/alerts';
import { AlertsModel } from '@app/modules/alerts/store/model/alerts.model';
import { INavigate, Navigate } from '@core/constants/navigate';
import { ManipulateDomService } from '@core/services/manipulate-dom/manipulate-dom.service';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class StepOneComponent implements OnInit {
  public accounts: object[] = [];
  public formNewAlert: FormGroup;
  public typeActive: any;
  @Output() setStep: EventEmitter<number> = new EventEmitter<number>();

  constructor(
    private _dom: ManipulateDomService,
    private _facade: AlertsModel,
    private _router: Router,
  ) {}

  ngOnInit(): void {
    this._initForm();
    this._facade.fetchInfoUser();
  }

  private _initForm(): void {
    this.formNewAlert = new FormGroup({
      alert_type: new FormControl(''),
      check: new FormControl([]),
    });
  }

  public setBorder(_id: string): void {
    this.typeActive = _id;
  }

  public submitData(): void {
    const stepOneData: IAlertFormOne = {
      type_prod: this.formNewAlert.value.alert_type,
    };
    this._router.navigate(['/alertas-y-notificaciones/crear-alerta/step-two']);
    /*
      this.loadData(this.formNewAlert.value.alert_type);
      this._facade.fetchStepOne(stepOneData);
      this.setStep.emit(2);
    */
  }

  public eventCheck(event: string): void {}

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

  get navigate(): INavigate {
    return Navigate;
  }
}
