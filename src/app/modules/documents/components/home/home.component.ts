import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApplicationModel } from '@app/application.model';
import { ClassNotification } from '@app/core/constants/notification';
import { OptionModuleState } from '@app/store/reducers/global/option-module/option-module.reducer';
import { environment } from '@environment';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { INavigateDocuments, NavigateDocuments } from '../../entities/routes';
import { HomeModelDocuments } from '../../store/model/home.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  constructor(
    private _facade: HomeModelDocuments,
    private _translate: TranslateService,
    private _model: ApplicationModel,
  ) {}

  ngOnInit(): void {}

  get baseAssets(): string {
    return environment.resources.base_assets;
  }

  get navigate(): INavigateDocuments {
    return NavigateDocuments;
  }

  public clickRedirect(): void {
    this._facade.notificationOpen(
      this._translate.instant('PAYMENTSV2.SHARED_COPY.LBL_ALERT'),
      true,
      ClassNotification.INFO,
    );
  }

  get optionsModule$(): Observable<OptionModuleState> {
    return this._model.optionModule$;
  }
}
