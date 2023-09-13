import { Component, OnDestroy, OnInit } from '@angular/core';
import { HomeModel } from '@app/modules/home/home.model';
import { formatDateToISO } from '@app/shared/helpers/formatDate.helper';
import { StartDateEndDateModel } from '@app/shared/table/table.interface';
import { IToPlusState } from '@app/store/reducers/models/to-plus/to-plus.reducer';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import {
  CONFIGURATION_TYPE,
  HISTORIC_MOVEMENT_IS_PAGINATION,
  HISTORIC_MOVEMENT_MAX_RANGE,
  HISTORIC_MOVEMENT_NUM_PAGE,
} from '../../constants/constants';
import { YourPlusModel } from '../../store/models/your-plus.model';
import { IConfiguration } from '../../store/reducers/configuration.reducer';
import { IHistoricMovements } from '../../store/reducers/historic-movements.reducer';

@Component({
  selector: 'app-step-one',
  templateUrl: './step-one.component.html',
  styleUrls: ['./step-one.component.sass'],
})
export class StepOneComponent implements OnInit, OnDestroy {
  public cdtData: any;
  private _destroy$: Subject<boolean> = new Subject<boolean>();
  public maxRange: number = HISTORIC_MOVEMENT_MAX_RANGE;
  public isFilter: boolean = false;
  constructor(private _model: YourPlusModel, private _home_model: HomeModel) {}

  ngOnInit(): void {
    this._setStep(1);
    this._home_model.fetchToPlus();
    this.loadConfiguration();
    const minDate = new Date();
    minDate.setDate(minDate.getDate() - this.maxRange);
    this.loadHistoricMovements({
      minDate: new Date(minDate),
      maxDate: new Date(),
    });
  }
  ngOnDestroy(): void {
    this._destroy$.next(true);
    this._destroy$.complete();
  }

  private _setStep(step: number): void {
    this._model.setStep({ step });
  }

  get toPlus$(): Observable<IToPlusState> {
    return this._home_model.toPlus$;
  }

  get historicMovement$(): Observable<IHistoricMovements> {
    return this._model.historicMovement$;
  }
  get configuration$(): Observable<IConfiguration> {
    return this._model.configuration$;
  }

  get hasToPlus$(): Observable<boolean> {
    return this.toPlus$.pipe(map((toPlus) => !isNullOrUndefined(toPlus.data)));
  }

  public loadHistoricMovements(
    dates: StartDateEndDateModel,
    isFilter?: boolean,
  ): void {
    const minDate = new Date(dates.minDate);
    const maxDate = new Date(dates.maxDate);
    const isPagination = HISTORIC_MOVEMENT_IS_PAGINATION;
    const numPage = HISTORIC_MOVEMENT_NUM_PAGE;
    this._model.historicMovementLoad(
      formatDateToISO(minDate),
      formatDateToISO(maxDate),
      isPagination,
      numPage,
    );
    if (isFilter) {
      this.isFilter = isFilter;
    }
  }
  public loadConfiguration(): void {
    const Type = CONFIGURATION_TYPE;
    this._model.configurationLoad(Type);
  }
}
