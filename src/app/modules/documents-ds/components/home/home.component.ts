import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApplicationModel } from '@app/application.model';
import { Navigate } from '@app/core/constants/navigate';
import { ManipulateDomService } from '@app/core/services/manipulate-dom/manipulate-dom.service';
import {
  INavigateDocuments,
  NavigateDocuments,
} from '@app/modules/documents/entities/routes';
import { OptionModuleState } from '@app/store/reducers/global/option-module/option-module.reducer';
import { Observable } from 'rxjs';
import { INavigate } from '../../../../core/constants/navigate';
import {
  INavigateDocumentsDs,
  NavigateDocumentsDs,
} from '../../constants/navigate-documents-ds';
import { UtilsDocumentsService } from '../../services/utils-documents.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private _model: ApplicationModel,
    protected _dom: ManipulateDomService,
    private _utils: UtilsDocumentsService,
  ) {}

  ngOnInit(): void {
    this._utils.setupDomStyles(true);
  }

  ngOnDestroy(): void {
    this._utils.setupDomStyles(false);
  }

  get optionsModule$(): Observable<OptionModuleState> {
    return this._model.optionModule$;
  }

  get navigate(): INavigateDocuments {
    return NavigateDocuments;
  }

  get navigateDocuments(): INavigateDocumentsDs {
    return NavigateDocumentsDs;
  }

  get navigateMain(): INavigate {
    return Navigate;
  }
}
