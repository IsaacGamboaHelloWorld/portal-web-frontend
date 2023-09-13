import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { IToPlusState } from '@app/store/reducers/models/to-plus/to-plus.reducer';
import { BANK_ICONS, BANK_NAME } from '../../constants/constants';
import { INavigateYourPlus, NavigateYourPlus } from '../../constants/routes';
import { IBankIcons } from '../../entities/your-plus.interface';
import { YourPlusModel } from '../../store/models/your-plus.model';
import { IConfiguration } from '../../store/reducers/configuration.reducer';

@Component({
  selector: 'app-home-points',
  templateUrl: './home-points.component.html',
  styleUrls: ['./home-points.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class HomePointsComponent implements OnInit {
  @Input() dataTuPlus: IToPlusState;
  @Input() dataConfiguration: IConfiguration;
  @Input() loading: boolean = false;
  public bank_name: IBankIcons = BANK_NAME;
  public bank_icon: IBankIcons = BANK_ICONS;

  constructor(private _router: Router, private _model: YourPlusModel) {}

  ngOnInit(): void {}
  private _setStep(step: number): void {
    this._model.setStep({ step });
  }
  get navigate(): INavigateYourPlus {
    return NavigateYourPlus;
  }
  public goToHow(): void {
    this._setStep(2);
    this._router.navigate([this.navigate.step2]);
  }
}
